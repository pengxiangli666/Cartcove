from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ProductViewSet,
    CartItemViewSet,
    ReviewViewSet,
    add_to_cart,
    remove_from_cart,
    view_cart_items,
)

urlpatterns = [
    path("api/add-to-cart/<int:product_id>/", add_to_cart, name="add_to_cart"),
    path("api/cart-items/", view_cart_items, name="view_cart_items"),
    path(
        "api/remove-from-cart",
        remove_from_cart,
        name="remove_from_cart",
    ),
    #path("api/products/search", ProductSearchView.as_view(), name='product_search'),
]
