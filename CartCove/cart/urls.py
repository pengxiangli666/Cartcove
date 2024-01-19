from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ProductViewSet,
    CartItemViewSet,
    add_to_cart,
    remove_from_cart,
    view_cart_items,
    ReviewViewSet,
    create_product,
    delete_product
)

router = DefaultRouter()
router.register(r"products", ProductViewSet)
router.register(r"cart-items", CartItemViewSet, basename="cartitem")
router.register(r"reviews", ReviewViewSet, basename="review")

urlpatterns = [
    path("api/add-to-cart/<int:product_id>/", add_to_cart, name="add_to_cart"),
    path("api/cart-items/", view_cart_items, name="view_cart_items"),
    # path('api/create-product/', create_product, name='create_product'),
    path('api/products/delete/<int:product_id>/', delete_product, name='delete_product'),
    path(
        "api/remove-from-cart/<int:product_id>/",
        remove_from_cart,
        name="remove_from_cart",
    ),
    path("api/", include(router.urls)),
]
