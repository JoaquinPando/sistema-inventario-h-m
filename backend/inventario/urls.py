from django.urls import path, include
from rest_framework.routers import DefaultRouter
# Importamos la VISTA de token, no un archivo .py
from rest_framework.authtoken.views import obtain_auth_token
from . import views

# Creamos el enrutador solo para los ViewSets
router = DefaultRouter()
router.register(r'users', views.UserViewSet)

# Definimos las urlpatterns
urlpatterns = [
    # Incluimos las URLs que el router generó para 'users'
    path('', include(router.urls)),
    
    # Añadimos la URL para el login (obtener token)
    # Esta es una URL separada que apunta a la vista que importamos.
    # Le damos un nombre 'login' para identificarla.
    path('login/', obtain_auth_token, name='login'),
]