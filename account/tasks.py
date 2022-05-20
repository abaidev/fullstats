from django.conf import settings
from django.contrib.auth import get_user_model
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes, force_text
from django.template.loader import render_to_string
from django.core.mail import send_mail
from celery import shared_task

User = get_user_model()


@shared_task(name='celery_send_conf_mail')
def celery_send_conf_mail(subj, user_id, domain):
    user = User.objects.get(id=user_id)

    send_mail(
        subj,
        "",
        settings.EMAIL_HOST_USER,
        [user.email],
        html_message=render_to_string('account/confirm_email.html', {
            "user": user,
            "domain": domain,
            "uidb64": force_text(urlsafe_base64_encode(force_bytes(user.pk))),
            "token": default_token_generator.make_token(user)
        })
    )
    return f"Email has been sent to {user.email}"


# todo:   check if user activated his account during certain time. if not, delete account
