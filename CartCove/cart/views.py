from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_POST
from .models import Product, CartItem
from .models import Product
from django.views.decorators.http import require_http_methods
import json


# @login_required
# @require_POST
def add_to_cart(request, product_id):
    product = get_object_or_404(Product, id=product_id)
    cart_item, created = CartItem.objects.get_or_create(
        user=request.user, product=product
    )
    if not created:
        cart_item.quantity += 1
    else:
        cart_item.quantity = 1
    cart_item.save()
    return JsonResponse({"status": "success", "message": "Product added to cart"})


# @login_required
def view_cart(request):
    items = CartItem.objects.filter(user=request.user).values(
        "product__name", "quantity", "product__price"
    )
    return JsonResponse(list(items), safe=False)


# @require_http_methods(["POST"])  # only allow POST request
def add_product(request):
    try:
        data = json.loads(request.body)
        product = Product.objects.create(
            name=data["name"],
            price=data["price"],
        )
        return JsonResponse({"id": product.id, "name": product.name}, status=201)
    except (KeyError, TypeError, ValueError) as e:
        return JsonResponse({"error": str(e)}, status=400)
