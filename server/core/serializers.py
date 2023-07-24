from rest_framework import serializers
from .models import Produit

class SeializerProduit(serializers.ModelSerializer):
    class Meta:
        model = Produit
        fields = '__all__'