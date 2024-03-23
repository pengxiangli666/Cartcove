from django.db.models import Q
from rest_framework import viewsets, status
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
import json
from django.http import JsonResponse
from .models import Product, CartItem, Review, Order, Address, Payment
from rest_framework import status
from .serializers import (
    ProductSerializer,
    CartItemSerializer,
    AddToCartSerializer,
    ReviewSerializer,
    RemoveFromCartSerializer,
    OrderSerializer,
    AddressSerializer,
    PaymentSerializer
)
from rest_framework.decorators import action



# @csrf_exempt
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
    data = {"product_id": request.data.get(
        "product_id"), "quantity": request.data.get("quantity", 1)}
    serializer = RemoveFromCartSerializer(
        data=data, context={"request": request})
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
        product = Product.objects.create(
            name=data["name"], price=data["price"], description=data.get("description", ""))
        return JsonResponse(
            {"id": product.id, "name": product.name, "price": product.price, "description": product.description}, status=201
        )
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)


# @authentication_classes([])
# @permission_classes([AllowAny])
# class ProductViewSet(viewsets.ModelViewSet):
#     queryset = Product.objects.all()
#     serializer_class = ProductSerializer


class CartItemViewSet(viewsets.ModelViewSet):
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)
    
    @action(detail=False, methods=['delete'])
    def delete_all(self, request, *args, **kwargs):
        self.get_queryset().delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


@authentication_classes([])
@permission_classes([AllowAny])
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def get_queryset(self):
        query = self.request.query_params.get('query', None)
        if query is not None:
            return Product.objects.filter(Q(name__icontains=query))
        return super().get_queryset()


# create OrderViewSet
class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if self.request.query_params.get('pay') == 'true':
            queryset = self.queryset.filter(ordered=False,user=self.request.user).order_by('-ordered_on')
            return queryset
        
        queryset = self.queryset.filter(user=self.request.user)
        return queryset


    def create(self, request, *args, **kwargs):
        # calculate total price
        total_price = 0
        data = request.data.copy()
        for product in data['products']:
            total_price += Product.objects.get(
                id=product['product_id']).price * product['quantity']
        request.data['price'] = total_price
        return super().create(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)

# create AddressViewSet
class AddressViewSet(viewsets.ModelViewSet):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)

# create PaymentViewSet


class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)
