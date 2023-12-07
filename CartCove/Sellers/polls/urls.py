from django.urls import include, path

from .apis import *

urlpatterns = [
    path("customer", CustomerAPI.register),
    path("customer/login", CustomerAPI.login),
    path("customer/info", CustomerAPI.get_info),
    path("customer/info/update", CustomerAPI.update_info),
    path("seller", SellerAPI.register),
    path("seller/login", SellerAPI.login),
    path("seller/info", SellerAPI.get_info),
    path("seller/info/update", SellerAPI.update_info),
    path("product", SellerAPI.add_product),
    path("product/<int:product_id>/update", SellerAPI.edit_product),
    path("image/<int:product_id>", SellerAPI.upload_product_image),
    path("image/<int:product_id>/<int:image_id>", SellerAPI.delete_image),
    # get all images of a product
    path("video/<int:product_id>", SellerAPI.upload_video),
    path("video/<int:product_id>/<int:video_id>", SellerAPI.delete_video),
    # get all videos of a product
    # common
    path("product/<int:product_id>", CommonAPI.get_product),
    path("swagger-ui/", include("polls.swagger.urls")),
]
