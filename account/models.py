from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.core.validators import MinValueValidator, MaxValueValidator

User = get_user_model()


class UserRate(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='rates')
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey('content_type', 'object_id')
    rate = models.IntegerField(default=0, validators=[MinValueValidator(-1), MaxValueValidator(1)])


class UserFavorite(models.Model):   # Пользователь возможно будет добавлять в избранное и другое, н-р: изобр., коллекц..
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='favorites')
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey('content_type', 'object_id')
