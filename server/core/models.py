from django.db import models

class Produit(models.Model):
    nom = models.CharField(max_length=300)
    prix = models.DecimalField(max_digits=7, decimal_places=2)
    qte = models.IntegerField(default=1)

    created_at= models.DateTimeField(auto_now_add=True)
    updated_at= models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nom