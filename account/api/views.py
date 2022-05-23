from django.shortcuts import redirect, HttpResponse
from django.contrib.auth import get_user_model
from django.contrib.sites.shortcuts import get_current_site
from django.utils import timezone
from django.utils.encoding import force_str
from django.utils.http import urlsafe_base64_decode
from django.contrib.auth.tokens import default_token_generator
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from news.models import Article
from news.api.serializers import ArticleSerializer
from account.tasks import celery_send_conf_mail
from account.services import get_favorite_articles
from .serializers import UserSignupSerializer

User = get_user_model()


@api_view(http_method_names=['POST'])
def signup_view(request):
    rdata = request.data
    serialized = UserSignupSerializer(data=rdata)
    if serialized.is_valid(raise_exception=True):
        user = serialized.save()
        domain = str(get_current_site(request).domain)
        celery_send_conf_mail.delay("Fullstats регистрация", user.id, domain)
        return Response({"success": "confirmation email is sent"})
    else:
        return Response({"failure": serialized.error_messages})


def activate_user(request, uidb64, token):
    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except(TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None
    if user is not None and default_token_generator.check_token(user, token):
        user.is_active = True
        user.last_login = timezone.now()  # resetting token
        user.save()
        return HttpResponse("<h2>Activated</h2>")
    return HttpResponse("<h2>NOT Activated</h2>")


@api_view(http_method_names=['GET'])
@permission_classes(permission_classes=[IsAuthenticated])
def get_user_fav_articles(request):
    favs = get_favorite_articles(obj=Article, user=request.user)
    serializer = ArticleSerializer(instance=favs, many=True, context={"request": request})
    return Response(serializer.data)
