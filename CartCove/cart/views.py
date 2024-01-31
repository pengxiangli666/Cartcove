from django.shortcuts import get_object_or_404
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_POST
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import api_view, permission_classes,authentication_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Product, CartItem, Review
from django.views.decorators.http import require_http_methods
from rest_framework.views import APIView
from rest_framework import status


from .serializers import (
    ProductSerializer,
    CartItemSerializer,
    AddToCartSerializer,
    ReviewSerializer,
    RemoveFromCartSerializer,
)


#@csrf_exempt
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def add_to_cart(request, product_id):
    # make data copy
    data = request.data.copy()
    data["product_id"] = product_id  # add product_id to copy

    # use copy to create serializer
    serializer = AddToCartSerializer(data=data, context={"request": request})

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def remove_from_cart(request):
    data = {"product_id": request.data.get("product_id"), "quantity": request.data.get("quantity", 1)}
    serializer = RemoveFromCartSerializer(data=data, context={"request": request})
    if serializer.is_valid():
        serializer.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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

@authentication_classes([])
@permission_classes([AllowAny])
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class CartItemViewSet(viewsets.ModelViewSet):
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)


class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

@authentication_classes([])
@permission_classes([AllowAny])
class ProductSearchView(APIView):
    def get(self, request):
        query = request.query_params.get('query', '')
        if query:
            products = Product.objects.filter(name__icontains=query)
            serializer = ProductSerializer(products, many=True)
        else:
            products = Product.objects.all()
            serializer = ProductSerializer(products, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


