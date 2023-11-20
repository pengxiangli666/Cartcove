from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from django.conf import settings
from django.conf.urls.static import static
from cart.views import ProductViewSet, CartItemViewSet  # 确保导入了 CartItemViewSet

# 创建路由器并注册你的视图集
router = DefaultRouter()
router.register(r"products", ProductViewSet)  # 用于处理与产品相关的 API 请求
router.register(
    r"cart-items", CartItemViewSet, basename="cartitem"
)  # 用于处理与购物车项相关的 API 请求

urlpatterns = [
    path("admin/", admin.site.urls),  # 管理界面
    path("auth/", include("dj_rest_auth.urls")),  # 认证相关的 URL
    path("auth/registration/", include("dj_rest_auth.registration.urls")),  # 注册相关的 URL
    path("cart/", include("cart.urls")),  # 购物车应用的 URL
    path("api/", include(router.urls)),  # 将 API 路径设置为 /api/
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
