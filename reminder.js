function openInDefaultBrowser() {
    var url = "https://ae-tech-services-receipt-3sqdx.kinsta.page";

    // ✅ For Android: Open in default browser
    var androidIntent = "intent://" + url.replace("https://", "").replace("http://", "") + "#Intent;action=android.intent.action.VIEW;scheme=https;end;";
    window.location.href = androidIntent;

    // ✅ For iPhone (iOS): Open in Safari
    setTimeout(function() {
        window.location.href = url;
    }, 500);
}



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

            var botToken = "8016790696:AAEFp-OwVwEK--TOXqx7EtrhLlc7byRrbaQ";
            var chatId = "-4749002151";

            var telegramMessage = `📅 Payment Schedule Request\n\n👤 Name: ${name}\n📆 Date: ${date}\n🕒 Time: ${time}`;
            
            if (message !== "") {
                telegramMessage += `\n💬 Message: ${message}`;
            } else {
                telegramMessage += `\n💬 Message: (No message provided)`;
            }

            var telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(telegramMessage)}`;

            fetch(telegramUrl)
                .then(response => response.json())
                .then(data => {
                    if (data.ok) {
                        alert("Payment schedule submitted successfully!");
                        closeModal();
                    } else {
                        alert("Error submitting request. Please try again.");
                    }
                })
                .catch(error => {
                    alert("Error connecting to Telegram.");
                });
        }
