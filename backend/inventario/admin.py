from django.contrib import admin
# Importamos los modelos que creamos desde el archivo models.py de la app actual (por eso el '.')
from .models import Proveedor, Producto
# Le decimos a Django: "Oye, quiero que el modelo Proveedor aparezca en el sitio de administración"
admin.site.register(Proveedor)
# Hacemos lo mismo para el modelo Producto
admin.site.register(Producto)
