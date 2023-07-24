from django.contrib import admin
from .models import Produit

class AdminProduit(admin.ModelAdmin):
    list_display = ('nom', 'created_at', 'updated_at')

admin.site.register(Produit, AdminProduit)
