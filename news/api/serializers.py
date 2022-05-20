from rest_framework import serializers
from news.models import Article


class ArticleSerializer(serializers.ModelSerializer):
    author = serializers.SerializerMethodField()
    rating = serializers.SerializerMethodField()

    class Meta:
        model = Article
        fields = '__all__'

    def get_author(self, obj):
        return obj.author.username

    def get_rating(self, obj):
        return obj.total_rating
