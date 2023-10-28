const months = [31,28,31,30,31,30,31,31,30,31,30,31];

function ageCalculate(){
    let inputDateValue = document.getElementById("date-input").value;

        if (inputDateValue === "") {
            alert("Please enter a valid date.");
            return;
        }

    let today = new Date();
    let inputDate = new Date(inputDateValue);
    let birthMonth,birthDate,birthYear;

    let birthDetails = {
        date:inputDate.getDate(),
        month:inputDate.getMonth()+1,
        year:inputDate.getFullYear()
    }

    let currentYear = today.getFullYear();
    let currentMonth = today.getMonth()+1;
    let currentDate = today.getDate();

    leapChecker(currentYear);

    if(
        birthDetails.year > currentYear ||
        ( birthDetails.month > currentMonth && birthDetails.year == currentYear) || 
        (birthDetails.date > currentDate && birthDetails.month == currentMonth && birthDetails.year == currentYear)
    ){
        alert("Not Born Yet");
        displayResult("O","M","G");
        return;
    }

    birthYear = currentYear - birthDetails.year;

    if(currentMonth >= birthDetails.month){
        birthMonth = currentMonth - birthDetails.month;
    }
    else{
        birthYear--;
        birthMonth = 12 + currentMonth - birthDetails.month;
    }

    if(currentDate >= birthDetails.date){
        birthDate = currentDate - birthDetails.date;
    }
    else{
        birthMonth--;
        let days = months[currentMonth - 2];
        birthDate = days + currentDate - birthDetails.date;
        if(birthMonth < 0){
            birthMonth = 11;
            birthYear--;
        }
    }
    displayResult(birthDate,birthMonth,birthYear);
}

function displayResult(bDate, bMonth, bYear) {
    let years = bYear;
    let months = bMonth;
    let days = bDate;

    const interval = setInterval(function() {
        if (years === 0 && months === 0 && days === 0) {
            clearInterval(interval);
        } else {
            document.getElementById("years").textContent = years;
            document.getElementById("months").textContent = months;
            document.getElementById("days").textContent = days;

            if (days === 0) {
                if (months === 0) {
                    years--;
                    months = 11;
                    days = 30; // Assuming all months have 30 days for simplicity
                } else {
                    months--;
                    days = months[months - 1];
                }
            } else {
                days--;
            }
        }
    }, 1000); // Update every second
}

function leapChecker(year){
    if(year % 4 == 0 || (year % 100 == 0 && year % 400 == 0)){
        months[1] = 29;
    }
    else{
        months[1] = 28;
    }
}

function startCountAnimation(targetId, targetValue) {
    let currentCount = 0;
    const increment = targetValue / 100; // Divide target value by 100 for a smoother animation
    const targetElement = document.getElementById(targetId);
    
    const interval = setInterval(function() {
        if (currentCount >= targetValue) {
            clearInterval(interval);
        } else {
            currentCount += increment;
            targetElement.textContent = Math.floor(currentCount);
        }
    }, 10); // Update every 10 milliseconds for a smoother animation
}

function displayResult(bDate, bMonth, bYear) {
    startCountAnimation("years", bYear);
    startCountAnimation("months", bMonth);
    startCountAnimation("days", bDate);
}