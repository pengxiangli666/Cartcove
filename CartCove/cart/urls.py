from django.urls import path, include
from rest_framework.routers import DefaultRouter
<<<<<<< HEAD
=======
from .views import search_products
>>>>>>> e2a45cfc5baa7bc091c4e748374f1d2e2f1506c5
from .views import (
    ProductViewSet,
    CartItemViewSet,
    add_to_cart,
    remove_from_cart,
    view_cart_items,
    create_product,
)

router = DefaultRouter()
router.register(r"products", ProductViewSet)
router.register(r"cart-items", CartItemViewSet, basename="cartitem")

urlpatterns = [
    path("api/add-to-cart/<int:product_id>/", add_to_cart, name="add_to_cart"),
    path("api/cart-items/", view_cart_items, name="view_cart_items"),
    # path('api/create-product/', create_product, name='create_product'),
    path(
        "api/remove-from-cart/<int:product_id>/",
        remove_from_cart,
        name="remove_from_cart",
    ),
<<<<<<< HEAD
=======
    path("api/search/", search_products, name="search_products"),
>>>>>>> e2a45cfc5baa7bc091c4e748374f1d2e2f1506c5
    path("api/", include(router.urls)),
]
