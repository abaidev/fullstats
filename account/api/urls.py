from django.urls import path
from rest_framework_jwt.views import obtain_jwt_token
from . import views

app_name = 'account-api'

urlpatterns = [
    path('signup/', views.signup_view, name='signup'),
    path('activate/<uidb64>/<token>/', views.activate_user, name='activate'),
    path('auth-token/', obtain_jwt_token, name='auth-token'),
]
