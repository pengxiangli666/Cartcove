from os import path as os_path
from django.urls import path

from django.views.generic import TemplateView

from rest_framework_swagger.views import get_swagger_view
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
    openapi.Info(
        title="Episyche Technologies",
        default_version="v1",
    ),
    public=True,
)

urlpatterns = [
    # ...
    # Route TemplateView to serve Swagger UI template.
    #   * Provide `extra_context` with view name of `SchemaView`.
    path("", schema_view.with_ui("swagger", cache_timeout=0), name="schema-swagger-ui"),
]
