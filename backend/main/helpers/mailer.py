import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

from django.conf import settings


def send_email(to_email, first_name):
	message = Mail(
	    from_email='ashish@betterlegal.com',
	    to_emails=to_email,
	    subject='You have been Registered !!',
	    html_content=f'<strong>Congratulations {first_name} ! You have been registered in Fit-Connect. </strong>'
	)

	try:
	    sg = SendGridAPIClient(settings.SENDGRID_KEY)
	    response = sg.send(message)
	    print(response.status_code)
	except Exception as e:
	    print(e)

