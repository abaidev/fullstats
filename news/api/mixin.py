from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly, AllowAny

from account import services
from account.api.serializers import UserBaseSerializer


class RatesMixin:
    @action(methods=['POST'], detail=True, permission_classes=[IsAuthenticated])
    def uprate(self, request, slug, pk=None):
        obj = self.get_object()
        services.uprate(obj, request.user)
        return Response({"status": "uprated"})

    @action(methods=['POST'], detail=True, permission_classes=[IsAuthenticated])
    def downrate(self, request, slug, pk=None):
        obj = self.get_object()
        services.downrate(obj, request.user)
        return Response({"status": "downrated"})

    @action(methods=['POST'], detail=True, permission_classes=[IsAuthenticated])
    def remove_rate(self, request, slug, pk=None):
        obj = self.get_object()
        services.remove_rate(obj, request.user)
        return Response({"status": "rate removed"})

    @action(methods=['GET'], detail=True, permission_classes=[IsAuthenticatedOrReadOnly])
    def has_user_rate(self, request, slug, pk=None):
        obj = self.get_object()
        res = services.has_user_rate(obj, request.user)
        return Response(res)

    @action(methods=['GET'], detail=True, permission_classes=[IsAuthenticatedOrReadOnly])
    def get_users(self, request, slug, pk=None):
        obj = self.get_object()
        fans = services.get_users(obj)
        serializer = UserBaseSerializer(instance=fans, many=True)
        return Response(serializer.data)


class FavoriteMixin:
    @action(methods=['POST'], detail=True, permission_classes=[IsAuthenticated])
    def add_to_favorite(self, request, slug, pk=None):
        obj = self.get_object()
        services.add_to_favorite(obj, request.user)
        return Response({'status': 'Article added to favorites'})

    @action(methods=['POST', 'DELETE'], detail=True, permission_classes=[IsAuthenticated])
    def remove_from_favorite(self, request, slug, pk=None):
        obj = self.get_object()
        services.remove_from_favorite(obj, request.user)
        return Response({'status': 'Article removed from favorites'})


class ArticleMixin:
    @action(methods=['POST', 'PATCH'], detail=True, permission_classes=[AllowAny])
    def increase_view_num(self, request, slug, pk=None):
        obj = self.get_object()
        services.increase_view_num(obj)
        return Response({'status': 'Article view increased by 1'})
