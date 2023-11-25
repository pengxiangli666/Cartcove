from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

from cart.views import (
    ProductViewSet,
    CartItemViewSet,
    add_to_cart,
    remove_from_cart,
    view_cart_items,
)

# 设置Swagger和Redoc文档
schema_view = get_schema_view(
    openapi.Info(
        title="Cartcove apis",
        default_version="v1",
        description="some Apis",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="pl7@email.sc.edu"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

# 创建路由器并注册你的视图集
router = DefaultRouter()
router.register(r"products", ProductViewSet)
router.register(r"cart-items", CartItemViewSet, basename="cartitem")

urlpatterns = [
    path("auth/", include("dj_rest_auth.urls")),
    path("auth/registration/", include("dj_rest_auth.registration.urls")),
    path("admin/", admin.site.urls),
    path("cart/", include("cart.urls")),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
