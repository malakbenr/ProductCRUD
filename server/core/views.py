from rest_framework import viewsets
from .models import Produit
from .serializers import SeializerProduit
from rest_framework import filters


class Produits(viewsets.ModelViewSet):
    serializer_class = SeializerProduit
    queryset = Produit.objects.all()

    filter_backends = [filters.SearchFilter]
    search_fields = ['nom',]

