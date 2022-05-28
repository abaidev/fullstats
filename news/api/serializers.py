from rest_framework import serializers
from news.models import Article


class ArticleSerializer(serializers.ModelSerializer):
    author_name = serializers.SerializerMethodField()
    rating = serializers.SerializerMethodField()
    article_url = serializers.HyperlinkedIdentityField(lookup_field='slug', view_name='article-detail')

    class Meta:
        model = Article
        fields = '__all__'
        extra_kwargs = {
            'author': {'write_only': True},
            'slug': {'read_only': True},
        }

    def get_author_name(self, obj):
        return obj.author.username

    def get_rating(self, obj):
        return obj.total_rating
