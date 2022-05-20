from django.contrib import admin
from django.contrib.auth.models import Group
from .models import *

admin.site.unregister(Group)


@admin.register(UserRate)
class UserRateAdmin(admin.ModelAdmin):
    list_display = ['content_object', 'user', 'rate']


@admin.register(UserFavorite)
class UserFavoriteAdmin(admin.ModelAdmin):
    list_display = ['content_object', 'user']

