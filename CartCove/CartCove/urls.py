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
    search_products,
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
    # 设置根 URL 指向 Swagger UI
    path("", schema_view.with_ui("swagger", cache_timeout=0), name="schema-swagger-ui"),
    path("admin/", admin.site.urls),  # 管理界面
    path("auth/", include("dj_rest_auth.urls")),  # 认证相关的 URL
    path("auth/registration/", include("dj_rest_auth.registration.urls")),  # 注册相关的 URL
    path("cart/", include("cart.urls")),  # 购物车应用的 URL
    # 你现有的API路径
    path("api/search/", search_products, name="search_products"),
    path("api/add-to-cart/<int:product_id>/", add_to_cart, name="add_to_cart"),
    path("api/cart-items/", view_cart_items, name="view_cart_items"),
    path(
        "api/remove-from-cart/<int:product_id>/",
        remove_from_cart,
        name="remove_from_cart",
    ),
    # DRF URL
    path("api/", include(router.urls)),  # 将 API 路径设置为 /api/
    # 其他 Swagger 和 Redoc 相关的 URL
    re_path(
        r"^swagger(?P<format>\.json|\.yaml)$",
        schema_view.without_ui(cache_timeout=0),
        name="schema-json",
    ),
    path("redoc/", schema_view.with_ui("redoc", cache_timeout=0), name="schema-redoc"),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
