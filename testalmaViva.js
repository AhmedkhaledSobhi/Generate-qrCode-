// Get the button element
const button = document.getElementById('myButton');

// Function to auto click the button
function autoClickButton(times, interval) {
    let count = 0;
    const clickInterval = setInterval(() => {
        if (count >= times) {
            clearInterval(clickInterval);
        } else {
            button.click();
            count++;
        }
    }, interval);
}

// Function to start auto click at a specific time
function startAutoClickAtSpecificTime(targetTime, times, interval) {
    const currentTime = new Date();
    const timeDifference = targetTime - currentTime;

    if (timeDifference <= 0) {
        console.log("Target time is in the past. Please set a future time.");
        return;
    }

    setTimeout(() => {
        autoClickButton(times, interval);
    }, timeDifference);
}

// Function to create a target time from hours, minutes, and seconds
function createTargetTime(hours, minutes, seconds) {
    const now = new Date();
    const targetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, seconds);
    if (targetTime <= now) {
        targetTime.setDate(targetTime.getDate() + 1); // Move to the next day if the time is earlier than current time
    }
    return targetTime;
}

// Example usage:
// Set the target time (e.g., 14:30:00, which is 2:30 PM)
const targetTime = createTargetTime(14, 30, 0); // 14:30:00
const timesToClick = 5; // Number of times to click
const intervalBetweenClicks = 1000; // Interval between clicks in milliseconds (1 second)

// Start the auto clicker at the specified time
startAutoClickAtSpecificTime(targetTime, timesToClick, intervalBetweenClicks);
