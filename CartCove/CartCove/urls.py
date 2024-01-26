from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework.routers import DefaultRouter
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView
from rest_framework.routers import DefaultRouter
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi


from cart.views import (
    ProductViewSet,
    CartItemViewSet,
)  # Make sure to import CartItemViewSet
from frontend.views import index

# Create a router and register your view set
router = DefaultRouter()
router.register(
    r"products", ProductViewSet
)  # Used for processing product-related API request
router.register(
    r"cart-items", CartItemViewSet, basename="cartitem"
)  # Used to process items related to shopping carts API request
urlpatterns = [
    path("", index),  # Used to handle front-end applications URL
    path("SignIn", index),
    path("Register", index),
    path("PersonalSettings", index),
    path("Detail", index),
    path("MyBag", index), 
    path("admin/", admin.site.urls),
    path("auth/", include("dj_rest_auth.urls")),  # authentication-related URL
    path(
        "auth/registration/", include("dj_rest_auth.registration.urls")
    ),  # registration-related URL
    path("cart/", include("cart.urls")),  # Shopping cart application URL
    path("api/", include(router.urls)),  # API Path set to /api/

    re_path(r'^.*', TemplateView.as_view(template_name='frontend/index.html')) # Makes it so that the frontend handles unknown URLs
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
