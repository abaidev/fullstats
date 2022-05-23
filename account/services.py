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
    rate.save()
    return rate


def downrate(obj, user):
    """    Decreasing rate by 1 `obj`.    """
    obj_type = ContentType.objects.get_for_model(obj)
    rate, is_created = UserRate.objects.get_or_create(
        content_type=obj_type, object_id=obj.id, user=user)
    rate.rate = -1
    rate.save()
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
    return rate.first().rate if rate.exists() else 0


def get_users(obj):
    """    Queries users who rated `obj`.    """
    obj_type = ContentType.objects.get_for_model(obj)
    return User.objects.filter(
        rates__content_type=obj_type, rates__object_id=obj.id)


'''   Favorites   '''


def get_favorite_articles(obj, user):
    """     Queuing user's favorite articles     """
    obj_type = ContentType.objects.get_for_model(obj)
    uf_qs = UserFavorite.objects.filter(
        content_type=obj_type, user=user)
    return [article.content_object for article in uf_qs]


def add_to_favorite(obj, user):
    """    Add `obj` to favorite    """
    obj_type = ContentType.objects.get_for_model(obj)
    fav, is_created = UserFavorite.objects.get_or_create(
        content_type=obj_type, object_id=obj.id, user=user)
    return fav


def remove_from_favorite(obj, user):
    """    Removing `obj` from user`s favorites.    """
    obj_type = ContentType.objects.get_for_model(obj)
    UserFavorite.objects.filter(
        content_type=obj_type, object_id=obj.id, user=user
    ).delete()
