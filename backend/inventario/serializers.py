# Primero, importamos las herramientas que necesitamos
from rest_framework import serializers
from django.contrib.auth.models import User # <-- Este es el modelo User de Django

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User  # 1. Le decimos qué modelo traducir
        fields = ['id', 'username', 'email', 'first_name', 'last_name'] # 2. Le decimos qué campos incluir en la traducción