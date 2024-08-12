console.log('Script loaded');

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');

    fetch('./people.json')
        .then(response => {
            console.log('Fetching JSON file');
            return response.json();
        })
        .then(data => {
            console.log('Data fetched successfully:', data);
            const rankedData = rankBySalary(data);
            displayNames(rankedData);
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });

    function displayNames(data) {
        const container = document.getElementById('dataContainer');
        container.innerHTML = "";

        data.forEach((person, index) => {
            const personDiv = document.createElement('div');
            personDiv.className = 'person';

            const fullName = getFullName(person);
            const initials = getInitials(person);
            const age = calculateAge(person.birthday);
            const ageCategory = getAgeCategory(age);
            const taxBracket = getTaxBracket(person.salary);
            const zodiacSign = getZodiacSign(person.birthday);
            const greeting = getRandomGreeting();

            console.log(`Random greeting for ${fullName}: ${greeting}`);
            console.log(`Displaying person: ${fullName}, Age: ${age}, Salary Rank: ${index + 1}`);

            personDiv.innerHTML = `
                <h2>${fullName} (${initials})</h2>
                <p>Greeting: ${greeting}</p>
                <p>Age: ${age} (${ageCategory})</p>
                <p>Salary Rank: ${index + 1}</p>
                <p>Tax Bracket: ${taxBracket}</p>
                <p>Zodiac Sign: ${zodiacSign}</p>
            `;
            container.appendChild(personDiv);
        });
    }

    // Function to get full name
    function getFullName(person) {
        const fullName = `${person.fname} ${person.lname}`;
        console.log(`Full Name: ${fullName}`);
        return fullName;
    }

    // Function to get initials
    function getInitials(person) {
        const initials = `${person.fname.charAt(0)}${person.lname.charAt(0)}`;
        console.log(`Initials: ${initials}`);
        return initials;
    }

    // Function to rank people by salary
    function rankBySalary(data) {
        const sortedData = data.sort((a, b) => b.salary - a.salary);
        console.log('Data ranked by salary:', sortedData);
        return sortedData;
    }

    // Function to calculate age
    function calculateAge(birthday) {
        const birthDate = new Date(birthday);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        console.log(`Calculated age: ${age}`);
        return age;
    }

    // Function to determine age category
    function getAgeCategory(age) {
        let category;
        if (age < 18) {
            category = 'Youth';
        } else if (age < 65) {
            category = 'Adult';
        } else {
            category = 'Senior';
        }
        console.log(`Age Category: ${category}`);
        return category;
    }

    // Function to determine tax bracket
    function getTaxBracket(salary) {
        let bracket;
        if (salary < 50000) {
            bracket = 'Low Income';
        } else if (salary < 100000) {
            bracket = 'Middle Income';
        } else {
            bracket = 'High Income';
        }
        console.log(`Tax Bracket: ${bracket}`);
        return bracket;
    }

    // Function to determine zodiac sign
    function getZodiacSign(birthday) {
        const birthDate = new Date(birthday);
        const day = birthDate.getDate();
        const month = birthDate.getMonth() + 1;

        let sign;
        if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) sign = "Aquarius";
        if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) sign = "Pisces";
        if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) sign = "Aries";
        if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) sign = "Taurus";
        if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) sign = "Gemini";
        if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) sign = "Cancer";
        if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) sign = "Leo";
        if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) sign = "Virgo";
        if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) sign = "Libra";
        if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) sign = "Scorpio";
        if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) sign = "Sagittarius";
        if ((month == 12 && day >= 22) || (month == 1 && day <= 19)) sign = "Capricorn";

        console.log(`Zodiac Sign: ${sign}`);
        return sign;
    }

    // Function to get a random greeting
    function getRandomGreeting() {
        const greetings = ["Hello!", "Hi there!", "Greetings!", "Salutations!", "Howdy!", "Hey!"];
        const randomIndex = Math.floor(Math.random() * greetings.length);
        console.log(`Selected greeting index: ${randomIndex}`);
        const selectedGreeting = greetings[randomIndex];
        console.log(`Random Greeting: ${selectedGreeting}`);
        return selectedGreeting;
    }
});

