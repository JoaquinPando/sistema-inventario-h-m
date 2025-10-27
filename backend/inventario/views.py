from rest_framework import viewsets
from django.contrib.auth.models import User
from .serializers import UserSerializer

class UserViewSet(viewsets.ModelViewSet):
    """
    Un ViewSet para ver y editar la información de los usuarios.
    Maneja automáticamente las acciones de Listar, Crear, Obtener, Actualizar y Borrar.
    """
    # 1. El conjunto de datos que manejará (todos los objetos User)
    queryset = User.objects.all()
    # 2. El traductor que usará
    serializer_class = UserSerializer