from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework.routers import DefaultRouter
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView
from rest_framework.routers import DefaultRouter
from frontend.views import index

from cart.views import (
    ProductViewSet,
    CartItemViewSet,
    OrderViewSet,
    PaymentViewSet,
    AddressViewSet,
)

# ViewSet
router = DefaultRouter()
router.register(r"products", ProductViewSet)
router.register(r"cart-items", CartItemViewSet)
router.register(r"orders", OrderViewSet)
router.register(r"payments", PaymentViewSet)
router.register(r"addresses", AddressViewSet)

# URL patterns
urlpatterns = [
    path("admin/", admin.site.urls),
    path("auth/", include("dj_rest_auth.urls")),  # authentication-related URL
    path("auth/registration/", include("dj_rest_auth.registration.urls")),
    # registration-related URL
    path("cart/", include("cart.urls")),
    path("api/", include(router.urls)),

    # Makes it so that the frontend handles unknown URLs
    re_path(r'^.*', index)
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
