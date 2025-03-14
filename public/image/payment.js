document.addEventListener("DOMContentLoaded", function () {
    let paymentsClient = null;

    function getGooglePaymentsClient() {
        if (!paymentsClient) {
            paymentsClient = new google.payments.api.PaymentsClient({ environment: "PRODUCTION" }); // Change to "TEST" for testing
        }
        return paymentsClient;
    }

    function getGoogleIsReadyToPayRequest() {
        return {
            apiVersion: 2,
            apiVersionMinor: 0,
            allowedPaymentMethods: [{
                type: "CARD",
                parameters: {
                    allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                    allowedCardNetworks: ["VISA", "MASTERCARD"]
                }
            }]
        };
    }

    function getGoogleTransactionInfo(price) {
        return {
            countryCode: "SE",
            currencyCode: "SEK",
            totalPriceStatus: "FINAL",
            totalPrice: price
        };
    }

    function getGooglePaymentDataRequest(price) {
        return {
            apiVersion: 2,
            apiVersionMinor: 0,
            allowedPaymentMethods: [{
                type: "CARD",
                parameters: {
                    allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                    allowedCardNetworks: ["VISA", "MASTERCARD"]
                },
                tokenizationSpecification: {
                    type: "PAYMENT_GATEWAY",
                    parameters: {
                        gateway: "stripe",
                        "stripe:publishableKey": "DIN_STRIPE_PUBLIC_KEY"
                    }
                }
            }],
            merchantInfo: {
                merchantId: "DIN_GOOGLE_PAY_MERCHANT_ID",
                merchantName: "Ditt Företagsnamn"
            },
            transactionInfo: getGoogleTransactionInfo(price)
        };
    }

    function startGooglePay(price) {
        const paymentsClient = getGooglePaymentsClient();

        paymentsClient.isReadyToPay(getGoogleIsReadyToPayRequest())
            .then(response => {
                if (response.result) {
                    onGooglePaymentButtonClicked(price);
                } else {
                    alert("Google Pay är inte tillgängligt. Vänligen välj en annan betalningsmetod.");
                }
            })
            .catch(error => console.error("Fel vid Google Pay-kontroll:", error));
    }

    function onGooglePaymentButtonClicked(price) {
        const paymentDataRequest = getGooglePaymentDataRequest(price);
        const paymentsClient = getGooglePaymentsClient();

        paymentsClient.loadPaymentData(paymentDataRequest)
            .then(paymentData => {
                const paymentToken = paymentData.paymentMethodData.tokenizationData.token;
                sendPaymentToBackend(paymentToken, price);
            })
            .catch(error => console.error("Betalning misslyckades:", error));
    }

    function sendPaymentToBackend(paymentToken, price) {
        fetch("/process-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token: paymentToken, amount: price, currency: "SEK" })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Betalning lyckades! Kontot är registrerat.");
            } else {
                alert("Betalning misslyckades! Försök igen.");
            }
        })
        .catch(error => console.error("Fel vid kommunikation med servern:", error));
    }

    function addGooglePayButton() {
        const paymentsClient = getGooglePaymentsClient();
        const button = paymentsClient.createButton({ onClick: () => processRegistration() });
        document.getElementById("google-pay-container").appendChild(button);
    }

    function processRegistration() {
        const name = document.getElementById("signup-name").value;
        const email = document.getElementById("signup-email").value;
        const password = document.getElementById("signup-password").value;
        const plan = document.querySelector('input[name="plan"]:checked');

        if (!name || !email || !password || !plan) {
            alert("Vänligen fyll i alla fält och välj en betalningsplan.");
            return;
        }

        const selectedPlanPrice = plan.value;
        startGooglePay(selectedPlanPrice);
    }

    document.getElementById("choose-register").addEventListener("click", function () {
        document.getElementById("form-container").style.display = "block";
        document.getElementById("signup-section").style.display = "block";
    });

    document.getElementById("pay-button").addEventListener("click", function () {
        processRegistration();
    });

    document.addEventListener("DOMContentLoaded", addGooglePayButton);
});
