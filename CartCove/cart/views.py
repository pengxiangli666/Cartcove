from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_POST
from .models import Product, CartItem
from .models import Product
from django.views.decorators.http import require_http_methods
import json
from rest_framework import viewsets
from .models import Product
from .serializers import ProductSerializer
from django.shortcuts import redirect
from .models import CartItem
from .serializers import CartItemSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from django.shortcuts import redirect, get_object_or_404


@login_required
# @require_POST
def add_to_cart(request, product_id):
    product = get_object_or_404(Product, id=product_id)
    quantity = int(request.POST.get("quantity", 1))

    # 确保数量有效
    if quantity <= 0:
        quantity = 1

    cart_item, created = CartItem.objects.get_or_create(
        user=request.user, product=product, defaults={"quantity": quantity}
    )

    if not created:
        # 如果购物车中已存在此商品，更新数量
        cart_item.quantity += quantity
        cart_item.save()

    # 重定向到购物车页面或其他合适的页面
    return redirect("view_cart_items")


@login_required
def remove_from_cart(request, product_id):
    # 先检查这个产品是否存在
    product = get_object_or_404(Product, id=product_id)

    # 然后检查用户的购物车中是否有这个产品
    try:
        cart_item = CartItem.objects.get(user=request.user, product=product)
        cart_item.delete()
        # 可以添加一些消息来通知用户商品已被删除
    except CartItem.DoesNotExist:
        # 如果没有找到，可以重定向到错误页面或显示一个错误消息
        # 例如： return render(request, 'cart/error.html', {'message': '商品不存在于购物车中。'})
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
