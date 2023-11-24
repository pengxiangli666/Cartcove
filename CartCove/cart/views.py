from django.conf import settings
from django.http import JsonResponse
from django.shortcuts import get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_POST, require_http_methods
from rest_framework import viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
import json
from .models import Product
from .models import Product, CartItem
from .serializers import ProductSerializer, CartItemSerializer


@login_required
@require_POST
def add_to_cart(request, product_id):
    product = get_object_or_404(Product, id=product_id)
    quantity = int(request.POST.get("quantity", 1))

    if quantity <= 0:
        quantity = 1

    cart_item, created = CartItem.objects.get_or_create(
        user=request.user, product=product, defaults={"quantity": quantity}
    )

    if not created:
        cart_item.quantity += quantity
        cart_item.save()

    return redirect("view_cart_items")


@login_required
def remove_from_cart(request, product_id):
    product = get_object_or_404(Product, id=product_id)

    try:
        cart_item = CartItem.objects.get(user=request.user, product=product)
        cart_item.delete()
    except CartItem.DoesNotExist:
        pass

    return redirect("view_cart_items")


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def view_cart_items(request):
    cart_items = CartItem.objects.filter(user=request.user)
    serializer = CartItemSerializer(cart_items, many=True)
    return Response(serializer.data)


def create_product(request):
    try:
        data = json.loads(request.body)
        product = Product.objects.create(name=data["name"], price=data["price"])
        return JsonResponse(
            {"id": product.id, "name": product.name, "price": product.price}, status=201
        )
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class CartItemViewSet(viewsets.ModelViewSet):
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if self.request.user.is_authenticated:
            return CartItem.objects.filter(user=self.request.user)
        else:
            return CartItem.objects.none()


@api_view(["GET"])
def search_products(request):
    query = request.GET.get("q", "")
    if query:
        products = Product.objects.filter(name__icontains=query)
    else:
        products = Product.objects.all()

    # Using the DRF Serializer
    serializer = ProductSerializer(products, many=True, context={"request": request})
    return Response(serializer.data)
