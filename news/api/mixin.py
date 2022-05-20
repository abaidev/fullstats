from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly

from account import services
from account.api.serializers import UserBaseSerializer


class RatesMixin:
    @action(methods=['POST'], detail=True, permission_classes=[IsAuthenticated])
    def uprate(self, request, slug, pk=None):
        obj = self.get_object()
        services.uprate(obj, request.user)
        return Response({"yess": "good"})

    @action(methods=['POST'], detail=True, permission_classes=[IsAuthenticated])
    def downrate(self, request, slug, pk=None):
        obj = self.get_object()
        services.downrate(obj, request.user)
        return Response()

    @action(methods=['POST'], detail=True, permission_classes=[IsAuthenticated])
    def remove_rate(self, request, slug, pk=None):
        obj = self.get_object()
        services.remove_rate(obj, request.user)
        return Response()

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

