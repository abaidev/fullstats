from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response

from news.models import Article
from .serializers import ArticleSerializer
from .mixin import RatesMixin, FavoriteMixin, ArticleMixin


class ArticleViewSet(RatesMixin, FavoriteMixin, ArticleMixin, viewsets.ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = (IsAuthenticatedOrReadOnly, )
    lookup_field = 'slug'

    def create(self, request, *args, **kwargs):
        rdata = request.data
        rdata.update({"author": request.user.id})
        sr = ArticleSerializer(data=rdata, context={"request": request})
        if sr.is_valid(raise_exception=True):
            sr.save()
        return Response({"slug": sr.data.get("slug")})
