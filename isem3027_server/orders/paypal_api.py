import sys

from urllib.parse import urlparse, parse_qs

import paypalrestsdk
from paypalrestsdk import Payment


paypalrestsdk.configure({
    'mode': 'sandbox',  # sandbox or live
    'client_id': 'AQr2bpjhl1KuF3UaqMBpQCMA-HIbmC4-eIuZEWqkPL1M4Gs3QWwrKWvbnvcY_hEWS1VUmEZw72fS0jjf',
    'client_secret': 'EKur8RfC_-yJ-BNn7O1BSzf7040WliS2NBx1_-j5uSfZRJ36TZBKiVsCZ6wGtRx2St4gCQvPangRK5bE'
})


def create_payment(total_amount):
    server_address = "127.0.0.1:8000"
    if sys.argv[-1] != "runserver":
        server_address = sys.argv[-1]

    # Create payment object
    payment = Payment({
        "intent": "sale",

        # Set payment method
        "payer": {
            "payment_method": "paypal"
        },

        # Set redirect URLs
        "redirect_urls": {
            "return_url": "http://%s/api/process" % server_address,
            "cancel_url": "http://%s/api/cancel" % server_address,
        },

        # Set transaction object
        "transactions": [{
            "amount": {
                "total": total_amount,
                "currency": "HKD"
            },
            "description": "payment description",
            "payment_options": {
                "allowed_payment_method": "IMMEDIATE_PAY"
            },
        }]
    })

    # Create payment
    if payment.create():
        print(payment)
        # Extract redirect url
        for link in payment.links:
            if link.rel == "approval_url":
                # Capture approval_url
                approval_url = link.href

                payment_token = parse_qs(urlparse(approval_url).query).get('token')[0]
                return {
                    "approval_url": approval_url,
                    "payment_id": payment.id,
                    "payment_token": payment_token,
                }
                # Redirect the customer to approval_url
    else:
        print("Error while creating payment:")
        print(payment.error)

    return {"error": payment.error}


def execute_payment_process(payment_id, payer_id):
    # Payment ID obtained when creating the payment (following redirect)
    payment = Payment.find(payment_id)

    # Execute payment with the payer ID from the create payment call (following redirect)
    if payment.execute({"payer_id": payer_id}):
        print("Payment[%s] execute successfully" % (payment.id))
        return {"payment": payment.id}
    else:
        print(payment.error)
        return {"error": payment.error}


