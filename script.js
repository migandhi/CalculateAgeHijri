document.getElementById('birthDateForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get input values from both fields
    const pickerValue = document.getElementById('birthDatePicker').value;
    const textValue = document.getElementById('birthDateText').value;
    const birthDateValue = pickerValue || textValue;

    if (!birthDateValue) {
        alert('Please enter a valid Gregorian birth date.');
        return;
    }

    const birthDate = new Date(birthDateValue);
    const today = new Date();

    if (isNaN(birthDate)) {
        alert('Invalid date format. Use YYYY-MM-DD.');
        return;
    }

    // Gregorian Age Calculation
    let gregorianYears = today.getFullYear() - birthDate.getFullYear();
    let gregorianMonths = today.getMonth() - birthDate.getMonth();
    let gregorianDays = today.getDate() - birthDate.getDate();

    if (gregorianMonths < 0 || (gregorianMonths === 0 && gregorianDays < 0)) {
        gregorianYears--;
        gregorianMonths += 12;
    }
    if (gregorianDays < 0) {
        const previousMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        gregorianDays += previousMonth.getDate();
        gregorianMonths--;
    }

    document.getElementById('gregorianAge').innerText = `${gregorianYears} years, ${gregorianMonths} months, and ${gregorianDays} days`;

    // Hijri Calculations
    const hijriBirthDate = HijriDate.fromGregorian(birthDate);
    const hijriToday = HijriDate.fromGregorian(today);

    let hijriYears = hijriToday.getYear() - hijriBirthDate.getYear();
    let hijriMonths = hijriToday.getMonth() - hijriBirthDate.getMonth();
    let hijriDays = hijriToday.getDate() - hijriBirthDate.getDate();

    if (hijriMonths < 0) {
        hijriYears--;
        hijriMonths += 12;
    }
    if (hijriDays < 0) {
        hijriMonths--;
        hijriDays += HijriDate.daysInMonth(hijriToday.getYear(), hijriToday.getMonth() - 1);
    }

    document.getElementById('hijriAge').innerText = `${hijriYears} years, ${hijriMonths} months, and ${hijriDays} days`;

    document.getElementById('todaysHijri').innerText = `${hijriToday.getDate()} ${HijriDate.getMonthName(hijriToday.getMonth())} ${hijriToday.getYear()}`;
    document.getElementById('todaysGregorian').innerText = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;

    // Upcoming Birthdays
    const upcomingHijriBirthday = new HijriDate(hijriToday.getYear(), hijriBirthDate.getMonth(), hijriBirthDate.getDate());
    if (upcomingHijriBirthday.toAJD() < hijriToday.toAJD()) {
        upcomingHijriBirthday.year += 1;
    }
    document.getElementById('hijriBirthday').innerText = `${upcomingHijriBirthday.getDate()} ${HijriDate.getMonthName(upcomingHijriBirthday.getMonth())} ${upcomingHijriBirthday.getYear()}`;

    const upcomingGregorianBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    if (upcomingGregorianBirthday < today) {
        upcomingGregorianBirthday.setFullYear(upcomingGregorianBirthday.getFullYear() + 1);
    }
    document.getElementById('gregorianBirthday').innerText = `${upcomingGregorianBirthday.getDate()}-${upcomingGregorianBirthday.getMonth() + 1}-${upcomingGregorianBirthday.getFullYear()}`;
});
