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
from django.shortcuts import render
from .forms import SearchForm



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
    return redirect("cart_view")


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def view_cart(request):
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


def search_view(request):
    form = SearchForm(request.GET or None)
    results = None

    if form.is_valid():
        query = form.cleaned_data['query']
        results = Product.objects.filter(name__icontains=query)  # find products using product's name 

    return render(request, 'search_results.html', {'form': form, 'results': results})