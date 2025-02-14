function sendReceiptToTelegram() {
            var name = document.getElementById('receiptName').value;
            var receiptFile = document.getElementById('paymentReceipt').files[0];

            if (!name || !receiptFile) {
                alert("Please enter your name and upload the payment receipt.");
                return;
            }

            // Get current date (MM/DD/YYYY format)
            var today = new Date();
            var formattedDate = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear();

            // Hide form and show loading spinner
            document.getElementById('formContainer').style.display = 'none';
            document.getElementById('loadingScreen').style.display = 'flex';

            var formData = new FormData();
            formData.append('photo', receiptFile);

            var botToken = "8016790696:AAEFp-OwVwEK--TOXqx7EtrhLlc7byRrbaQ";
            var chatId = "-4749002151";
            var telegramMessage = `🖼 PICTURE NG RECIBO\n👤 Name: ${name}\n💳 Payment Receipt Sent\n📅 DATE: ${formattedDate}`;

            var uploadUrl = `https://api.telegram.org/bot${botToken}/sendPhoto?chat_id=${chatId}&caption=${encodeURIComponent(telegramMessage)}`;

            fetch(uploadUrl, {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.ok) {
                    alert("Payment receipt sent successfully!");
                    window.location.href = "https://ae-tech-services-5qmst.kinsta.page/"; // Redirect after success
                } else {
                    alert("Error sending payment receipt.");
                    document.getElementById('formContainer').style.display = 'block';
                    document.getElementById('loadingScreen').style.display = 'none';
                }
            })
            .catch(error => {
                alert("Error connecting to Telegram.");
                document.getElementById('formContainer').style.display = 'block';
                document.getElementById('loadingScreen').style.display = 'none';
            });
        }
