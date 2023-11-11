from django.urls import path
from . import views
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet
from .views import create_product
from .views import add_to_cart
from .views import view_cart_items

router = DefaultRouter()
router.register(r"products", ProductViewSet)


urlpatterns = [
    path("cart/add-to-cart/<int:product_id>/", add_to_cart, name="add_to_cart"),
    path("api/cart-items/", view_cart_items, name="view_cart_items"),
    path("api/products/", create_product, name="create_product")
    # path("add-product/", views.add_product, name="add_product"),
] + router.urls
