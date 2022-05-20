from django.contrib.auth import get_user_model
from django.db.models import Q
from rest_framework import serializers
from rest_framework.exceptions import ValidationError

User = get_user_model()


class UserSignupSerializer(serializers.ModelSerializer):
    password1 = serializers.CharField(write_only=True, style={'input_type': 'password'}, )
    password2 = serializers.CharField(write_only=True, style={'input_type': 'password'})

    class Meta:
        model = User
        fields = ('username', 'email', 'password1', 'password2')

    def create(self, validated_data):
        user = User.objects.create(username=validated_data.get('username'), email=validated_data.get('email'))
        user.set_password(validated_data.get("password1"))
        user.save()
        return user

    def validate(self, data):
        username = data['username']
        email = data['email']
        password1 = data['password1']
        password2 = data['password2']
        user_qs = User.objects.filter(Q(email=email) | Q(username=username)).distinct()
        if password1 != password2:
            raise ValidationError("Passwords don't match")
        elif user_qs.count() > 0:
            raise ValidationError("Such user already exists")
        return data
