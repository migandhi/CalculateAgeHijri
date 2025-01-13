document.getElementById('birthDateForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const pickerValue = document.getElementById('birthDatePicker').value;
    const textValue = document.getElementById('birthDateText').value;
    const futureDateValue = document.getElementById('futureDatePicker').value;

    const birthDateValue = pickerValue || textValue;
    if (!birthDateValue) {
        alert('Please enter a valid Gregorian birth date.');
        return;
    }

    const birthDate = new Date(birthDateValue);
    const today = new Date();
    const calculationDate = futureDateValue ? new Date(futureDateValue) : today;

    if (isNaN(birthDate) || isNaN(calculationDate)) {
        alert('Invalid date format. Use YYYY-MM-DD.');
        return;
    }

    // Clear previous birthday wish
    document.getElementById('birthdayWish').innerText = '';

    // Correct Gregorian Age Calculation
    let gregorianYears = calculationDate.getFullYear() - birthDate.getFullYear();
    let gregorianMonths = calculationDate.getMonth() - birthDate.getMonth();
    let gregorianDays = calculationDate.getDate() - birthDate.getDate();

    if (gregorianDays < 0) {
        gregorianMonths--;
        const daysInPreviousMonth = new Date(calculationDate.getFullYear(), calculationDate.getMonth(), 0).getDate();
        gregorianDays += daysInPreviousMonth;
    }

    if (gregorianMonths < 0) {
        gregorianYears--;
        gregorianMonths += 12;
    }

    document.getElementById('gregorianAge').innerText = `${gregorianYears} years, ${gregorianMonths} months, and ${gregorianDays} days`;

    // Hijri Age Calculation
    const hijriBirthDate = HijriDate.fromGregorian(birthDate);
    const hijriCalculationDate = HijriDate.fromGregorian(calculationDate);

    let hijriYears = hijriCalculationDate.getYear() - hijriBirthDate.getYear();
    let hijriMonths = hijriCalculationDate.getMonth() - hijriBirthDate.getMonth();
    let hijriDays = hijriCalculationDate.getDate() - hijriBirthDate.getDate();

    if (hijriDays < 0) {
        hijriMonths--;
        hijriDays += HijriDate.daysInMonth(hijriCalculationDate.getYear(), (hijriCalculationDate.getMonth() - 1 + 12) % 12);
    }

    if (hijriMonths < 0) {
        hijriYears--;
        hijriMonths += 12;
    }

    document.getElementById('hijriAge').innerText = `${hijriYears} years, ${hijriMonths} months, and ${hijriDays} days`;

    // Today's Dates
    document.getElementById('todaysHijri').innerText = `${hijriCalculationDate.getDate()} ${HijriDate.getMonthName(hijriCalculationDate.getMonth())} ${hijriCalculationDate.getYear()}`;
    document.getElementById('todaysGregorian').innerText = `${calculationDate.getDate()}-${calculationDate.getMonth() + 1}-${calculationDate.getFullYear()}`;

    // Age on Future Date
    document.getElementById('futureAge').innerText = futureDateValue
        ? `${gregorianYears} years, ${gregorianMonths} months, and ${gregorianDays} days`
        : '---';

    // Birthday Wishes
    const isGregorianBirthday = calculationDate.getDate() === birthDate.getDate() && calculationDate.getMonth() === birthDate.getMonth();
    const isHijriBirthday = hijriCalculationDate.getDate() === hijriBirthDate.getDate() && hijriCalculationDate.getMonth() === hijriBirthDate.getMonth();

    if (isGregorianBirthday) {
        document.getElementById('birthdayWish').innerText = "🎉 Happy Gregorian Birthday! 🎂";
    }

    if (isHijriBirthday) {
        document.getElementById('birthdayWish').innerText += (document.getElementById('birthdayWish').innerText ? " " : "") + "🎉 Happy Hijri Birthday! 🎂";
    }

    // Upcoming Birthdays
    const upcomingHijriBirthday = new HijriDate(hijriCalculationDate.getYear(), hijriBirthDate.getMonth(), hijriBirthDate.getDate());
    if (upcomingHijriBirthday.toAJD() < hijriCalculationDate.toAJD()) {
        upcomingHijriBirthday.year += 1;
    }
    const hijriDayOfWeek = new Date(upcomingHijriBirthday.toGregorian()).toLocaleDateString('en-US', { weekday: 'long' });
    document.getElementById('hijriBirthday').innerText = `${hijriDayOfWeek}, ${upcomingHijriBirthday.getDate()} ${HijriDate.getMonthName(upcomingHijriBirthday.getMonth())} ${upcomingHijriBirthday.getYear()}`;

    const upcomingGregorianBirthday = new Date(calculationDate.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    if (upcomingGregorianBirthday < calculationDate) {
        upcomingGregorianBirthday.setFullYear(upcomingGregorianBirthday.getFullYear() + 1);
    }
    const gregorianDayOfWeek = upcomingGregorianBirthday.toLocaleDateString('en-US', { weekday: 'long' });
    document.getElementById('gregorianBirthday').innerText = `${gregorianDayOfWeek}, ${upcomingGregorianBirthday.getDate()}-${upcomingGregorianBirthday.getMonth() + 1}-${upcomingGregorianBirthday.getFullYear()}`;
});
