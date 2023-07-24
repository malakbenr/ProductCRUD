from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from core import views

router = routers.DefaultRouter()
router.register(r'produits', views.Produits, basename='produits') 

urlpatterns = [
    path('admin/', admin.site.urls),
    path('rest_api/', include(router.urls))
]
