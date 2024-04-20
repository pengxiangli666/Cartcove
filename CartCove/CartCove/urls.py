from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework.routers import DefaultRouter
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView
from rest_framework.routers import DefaultRouter
from frontend.views import index,web

from cart.views import (
    ChangePasswordView,
    ProductViewSet,
    CartItemViewSet,
    OrderViewSet,
    PaymentViewSet,
    AddressViewSet,
    CategoryViewSet
)

# ViewSet
router = DefaultRouter()
router.register(r"products", ProductViewSet)
router.register(r"cart-items", CartItemViewSet)
router.register(r"orders", OrderViewSet)
router.register(r"payments", PaymentViewSet)
router.register(r"addresses", AddressViewSet)
router.register(r"categories", CategoryViewSet, basename="category")

# URL patterns
urlpatterns = [
    path("admin/", admin.site.urls),
    path("auth/", include("dj_rest_auth.urls")),  # authentication-related URL
    path("auth/registration/", include("dj_rest_auth.registration.urls")),
    # registration-related URL
    path("cart/", include("cart.urls")),
    path("api/", include(router.urls)),
    path('auth/password_change/', ChangePasswordView.as_view(), name='auth_password_change'),

    # Makes it so that the frontend handles unknown URLs
    path("", web),
    re_path(r'^.*', index)
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
