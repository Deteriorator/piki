import smtplib

from email.mime.text import MIMEText
from setting import settings

def send(to,subject,content):
    msg = MIMEText(content,'html','utf-8')
    msg['Subject'] = subject
    msg['From'] = settings['mail_from']
    msg['To'] = ",".join(to)


    server = smtplib.SMTP()
    server.connect(settings['mail_smtp'])
    server.login(settings['mail_user'],settings['mail_pass'])

    server.sendmail(settings['mail_send'],
            to,
            msg.as_string())
