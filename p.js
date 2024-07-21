function getFormattedDate() {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    const currentDate = new Date();
    const dayOfWeek = daysOfWeek[currentDate.getDay()];
    const day = currentDate.getDate();
    const month = months[currentDate.getMonth()];
    const year = currentDate.getFullYear();
    const suffix = getNumberSuffix(day); // Function to get the correct suffix for the day (e.g., "st", "nd", "rd", "th")
    const formattedDate = `${dayOfWeek}, ${month} ${day}${suffix} ${year}`;

    return formattedDate;
}
// Function to get the correct suffix for the day (e.g., "st", "nd", "rd", "th")
function getNumberSuffix(day) {
    if (day >= 11 && day <= 13) {
        return 'th';
    }
    switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
    }
}

const formattedDate = getFormattedDate();
console.log(formattedDate);
