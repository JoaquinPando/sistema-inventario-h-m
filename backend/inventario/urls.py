
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views  # Importamos nuestro archivo views.py
# 1. Creamos un enrutador
# DefaultRouter también crea una página principal de API para nosotros
router = DefaultRouter()
# 2. Registramos nuestro ViewSet en el enrutador
# Esto le dice al router: "Quiero que manejes el UserViewSet
# bajo la ruta 'users'"
router.register(r'users', views.UserViewSet)
# 3. Definimos las urlpatterns de nuestra app
# Le decimos a Django: "Incluye todas las URLs que el router generó"
urlpatterns = [
    path('', include(router.urls)),
]