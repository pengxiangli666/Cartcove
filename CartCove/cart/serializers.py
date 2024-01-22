from rest_framework import serializers
from django.shortcuts import get_object_or_404
from .models import Product, CartItem
from .models import Review, Product


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ["id", "name", "price", "image"]


class CartItemSerializer(serializers.ModelSerializer):
    product_name = serializers.ReadOnlyField(source="product.name")
    product_price = serializers.ReadOnlyField(source="product.price")
    product_image = serializers.ImageField(source="product.image", read_only=True)

    class Meta:
        model = CartItem
        fields = ["id", "product_name", "product_price", "product_image", "quantity"]


class AddToCartSerializer(serializers.Serializer):
    product_id = serializers.IntegerField()
    quantity = serializers.IntegerField(min_value=1, default=1)

    def validate_product_id(self, value):
        if not Product.objects.filter(id=value).exists():
            raise serializers.ValidationError("Invalid product ID")
        return value

    def create(self, validated_data):
        user = self.context["request"].user
        product_id = validated_data.get("product_id")
        quantity = validated_data.get("quantity")

        product = get_object_or_404(Product, id=product_id)

        cart_item, created = CartItem.objects.get_or_create(
            user=user, product=product, defaults={"quantity": quantity}
        )

        if not created:
            cart_item.quantity += quantity
            cart_item.save()

        return cart_item


class RemoveFromCartSerializer(serializers.Serializer):
    product_id = serializers.IntegerField()
    quantity = serializers.IntegerField(min_value=1, default=1)

    def validate_product_id(self, value):
        user = self.context["request"].user
        if not CartItem.objects.filter(user=user, product_id=value).exists():
            raise serializers.ValidationError(
                "The product does not exist in the shopping cart"
            )
        return value

    def delete(self):
        user = self.context["request"].user
        product_id = self.validated_data.get("product_id")
        quantity = self.validated_data.get("quantity")

        cart_item = CartItem.objects.filter(user=user, product_id=product_id).first()
        if cart_item:
            cart_item.quantity -= quantity
            if cart_item.quantity <= 0:
                cart_item.delete()
            else:
                cart_item.save()


class ReviewSerializer(serializers.ModelSerializer):
    product = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all())
    user = serializers.ReadOnlyField(source="user.id")  # user just can read

    class Meta:
        model = Review
        fields = ["id", "user", "product", "rating", "comment", "created_at"]

from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'price']  
