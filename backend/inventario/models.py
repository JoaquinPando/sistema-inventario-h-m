from django.db import models

class Proveedor(models.Model): 
    nombre = models.CharField(max_length=100)
    ruc = models.CharField(max_length=11, unique=True)
    email = models.EmailField(max_length=254) 
    telefono = models.CharField(max_length=20) 
    activo = models.BooleanField(default=True)

class Producto(models.Model): 
    nombre = models.CharField(max_length=100)
    sku = models.CharField(max_length=16, unique=True)    
    # Para textos largos como una descripción, usamos TextField en lugar de CharField
    descripcion = models.TextField(blank=True, null=True) 
    # Para números enteros como el stock, usamos PositiveIntegerField
    # para asegurar que no sea negativo.
    stock = models.PositiveIntegerField(default=0)
    # Para dinero, usamos DecimalField, especificando el número máximo
    # de dígitos y cuántos de ellos son decimales.
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    # Este también es un número entero positivo.
    umbral_stock_bajo = models.PositiveIntegerField(default=10)
    # --- Así se define correctamente un ForeignKey ---
    # 1. El primer argumento es la clase a la que nos conectamos (Proveedor).
    # 2. 'on_delete' le dice a Django qué hacer si se borra un proveedor. 
    #    'models.CASCADE' significa que si se borra el proveedor, sus productos también se borran.
    # 3. 'proveedor' es el nombre del campo, en minúscula por convención.
    proveedor = models.ForeignKey(Proveedor, on_delete=models.CASCADE)

