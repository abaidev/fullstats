from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from news.models import Article
from .serializers import ArticleSerializer
from .mixin import RatesMixin, FavoriteMixin


class ArticleViewSet(RatesMixin, FavoriteMixin, viewsets.ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = (IsAuthenticatedOrReadOnly, )
    lookup_field = 'slug'
