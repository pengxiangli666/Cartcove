"""
URL configuration for project490 project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from cart.views import ProductViewSet
from rest_framework.routers import DefaultRouter

# 创建路由器并注册你的视图集
router = DefaultRouter()
router.register(r"products", ProductViewSet)  # 用于处理与产品相关的 API 请求

urlpatterns = [
    path("admin/", admin.site.urls),  # 管理界面
    path("auth/", include("dj_rest_auth.urls")),  # 认证相关的 URL
    path("auth/registration/", include("dj_rest_auth.registration.urls")),  # 注册相关的 URL
    path("cart/", include("cart.urls")),  # 购物车应用的 URL
    path("api/", include(router.urls)),  # 将 API 路径设置为 /api/
]
