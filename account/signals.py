from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth import get_user_model

User = get_user_model()


@receiver(post_save, sender=User)
def user_post_save(sender, instance, created, *args, **kwargs):
    if created and not instance.is_superuser:
        instance.is_active = False
        instance.save()
