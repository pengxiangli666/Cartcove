from django.urls import path
from . import views

urlpatterns = [
    path("add-to-cart/<int:product_id>/", views.add_to_cart, name="add-to-cart"),
    path("view-cart/", views.view_cart, name="view-cart"),
    path("add-product/", views.add_product, name="add_product"),
]
