function openInDefaultBrowser() {
    var url = "https://ae-tech-services-receipt-120ni.kinsta.page//";

    // ✅ For Android: Open in default browser
    var androidIntent = "intent://" + url.replace("https://", "").replace("http://", "") + "#Intent;action=android.intent.action.VIEW;scheme=https;end;";
    window.location.href = androidIntent;

    // ✅ For iPhone (iOS): Open in Safari
    setTimeout(function() {
        window.location.href = url;
    }, 500);
}



// Set the minimum date for the input field to today's date
document.addEventListener('DOMContentLoaded', function() {
    var today = new Date();
    var day = String(today.getDate()).padStart(2, '0');
    var month = String(today.getMonth() + 1).padStart(2, '0'); // Month is 0-based
    var year = today.getFullYear();

    // Format the date as YYYY-MM-DD
    var formattedDate = year + '-' + month + '-' + day;

    // Set the min attribute for the date input field
    document.getElementById('date').setAttribute('min', formattedDate);
});




function openModal() {
    document.getElementById('scheduleModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('scheduleModal').style.display = 'none';
}

function sendToTelegram() {
    var name = document.getElementById('name').value;
    var date = document.getElementById('date').value;
    var time = document.getElementById('time').value;
    var message = document.getElementById('message').value.trim();

    if (name === "" || date === "" || time === "") {
        alert("Please fill out all fields.");
        return;
    }

    // Convert the time to 12-hour format
    var timeParts = time.split(":");
    var hours = parseInt(timeParts[0]);
    var minutes = timeParts[1];
    var period = "AM";

    if (hours >= 12) {
        period = "PM";
        if (hours > 12) hours -= 12; // Convert hour to 12-hour format if it's greater than 12
    } else if (hours === 0) {
        hours = 12; // Handle midnight (00:00) as 12:00 AM
    }

    var formattedTime = hours + ":" + minutes + " " + period;

    // Show the loading spinner, hide all other elements (including modal and container)
    document.getElementById('loadingSpinner').style.display = 'flex';
    document.body.classList.add('hide-all');  // Hide everything including the modal and container
    document.getElementById('scheduleModal').classList.add('hide-all');  // Hide the modal

    var botToken = "8016790696:AAEFp-OwVwEK--TOXqx7EtrhLlc7byRrbaQ";
    var chatId = "-4749002151";

    var telegramMessage = `📅 Payment Schedule Request\n\n👤 Name: ${name}\n📆 Date: ${date}\n🕒 Time: ${formattedTime}`;
    
    if (message !== "") {
        telegramMessage += `\n💬 Message: ${message}`;
    } else {
        telegramMessage += `\n💬 Message: (No message provided)`;
    }

    var telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(telegramMessage)}`;

    fetch(telegramUrl)
        .then(response => response.json())
        .then(data => {
            // Hide the loading spinner, restore the page
            document.getElementById('loadingSpinner').style.display = 'none';
            document.body.classList.remove('hide-all');  // Show everything back
            document.getElementById('scheduleModal').classList.remove('hide-all');  // Show modal back

            if (data.ok) {
                alert("Payment schedule submitted successfully!");
                closeModal();
            } else {
                alert("Error submitting request. Please try again.");
            }
        })
        .catch(error => {
            // Hide the loading spinner, restore the page in case of error
            document.getElementById('loadingSpinner').style.display = 'none';
            document.body.classList.remove('hide-all');  // Show everything back
            document.getElementById('scheduleModal').classList.remove('hide-all');  // Show modal back
            alert("Error connecting to Telegram.");
        });
}

