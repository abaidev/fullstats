from django.contrib.auth import get_user_model
from django.contrib.contenttypes.models import ContentType

from .models import UserRate, UserFavorite

User = get_user_model()


def uprate(obj, user):
    """    Increasing rate by 1 `obj`.    """
    obj_type = ContentType.objects.get_for_model(obj)
    rate, is_created = UserRate.objects.get_or_create(
        content_type=obj_type, object_id=obj.id, user=user)
    rate.rate = 1
    return rate


def downrate(obj, user):
    """    Decreasing rate by 1 `obj`.    """
    obj_type = ContentType.objects.get_for_model(obj)
    rate, is_created = UserRate.objects.get_or_create(
        content_type=obj_type, object_id=obj.id, user=user)
    rate.rate = -1
    return rate


def remove_rate(obj, user):
    """    Removing rate from `obj`.    """
    obj_type = ContentType.objects.get_for_model(obj)
    UserRate.objects.filter(
        content_type=obj_type, object_id=obj.id, user=user
    ).delete()


def has_user_rate(obj, user) -> bool:
    """     Verifies if `user` rated `obj`.  """
    if not user.is_authenticated:
        return False
    obj_type = ContentType.objects.get_for_model(obj)
    rate = UserRate.objects.filter(
        content_type=obj_type, object_id=obj.id, user=user)
    return rate.exists()


def get_users(obj):
    """    Queries users who rated `obj`.    """
    obj_type = ContentType.objects.get_for_model(obj)
    return User.objects.filter(
        rates__content_type=obj_type, rates__object_id=obj.id)
