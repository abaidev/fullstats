from django.contrib import admin
from .models import Article


@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ['title', 'author', 'views_num', 'total_rating', 'id']
    exclude = ['slug']
    readonly_fields = ['views_num']
