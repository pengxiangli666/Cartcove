from django.contrib import admin
from django.urls import path, include, re_path
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
    add_to_cart,
    remove_from_cart,
    search_products,
    view_cart_items,
)

# Setting up Swagger and Redoc documentation
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

# Creating a router and registering your view set
router = DefaultRouter()
router.register(r"products", ProductViewSet)
router.register(r"cart-items", CartItemViewSet, basename="cartitem")

urlpatterns = [
    # Set the root URL to point to the Swagger UI
    path("schema", schema_view.with_ui("swagger", cache_timeout=0), name="schema-swagger-ui"),
    path("admin/", admin.site.urls),  # management interface
    path("auth/", include("dj_rest_auth.urls")),  # Authentication-related URLs
    path(
        "auth/registration/", include("dj_rest_auth.registration.urls")
    ),  # Register the relevant URL
    path("cart/", include("cart.urls")),  # URL of the shopping cart application
    # Your existing API path
    path("api/search/", search_products, name="search_products"),
    path("api/add-to-cart/<int:product_id>/", add_to_cart, name="add_to_cart"),
    path("api/cart-items/", view_cart_items, name="view_cart_items"),
    path(
        "api/remove-from-cart/<int:product_id>/",
        remove_from_cart,
        name="remove_from_cart",
    ),
    # DRF URL
    path("api/", include(router.urls)),  # Set the API path to /api/
    # Other Swagger and Redoc related URLs
    re_path(
        r"^swagger(?P<format>\.json|\.yaml)$",
        schema_view.without_ui(cache_timeout=0),
        name="schema-json",
    ),
    path("redoc/", schema_view.with_ui("redoc", cache_timeout=0), name="schema-redoc"),
    re_path(r'^.*', TemplateView.as_view(template_name='frontend/index.html'))
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
