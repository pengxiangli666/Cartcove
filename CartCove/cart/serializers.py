from rest_framework import serializers
from django.shortcuts import get_object_or_404
from .models import Product, CartItem
<<<<<<< HEAD
=======
from .models import Product
from django.conf import settings
>>>>>>> e2a45cfc5baa7bc091c4e748374f1d2e2f1506c5


class ProductSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Product
<<<<<<< HEAD
        fields = ["id", "name", "price", "image"]
=======
        fields = ["id", "name", "price", "image", "image_url"]

    def get_image_url(self, product):
        request = self.context.get("request")
        if product.image and hasattr(product.image, "url"):
            return request.build_absolute_uri(
                settings.MEDIA_URL + str(product.image.url)
            )
        return None
>>>>>>> e2a45cfc5baa7bc091c4e748374f1d2e2f1506c5


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
<<<<<<< HEAD
            raise serializers.ValidationError("Invalid product ID")
=======
            raise serializers.ValidationError("Ineffective productsID")
>>>>>>> e2a45cfc5baa7bc091c4e748374f1d2e2f1506c5
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

    def validate_product_id(self, value):
        user = self.context["request"].user
        if not Product.objects.filter(id=value).exists():
<<<<<<< HEAD
            raise serializers.ValidationError("Invalid product ID")
        if not CartItem.objects.filter(user=user, product_id=value).exists():
            raise serializers.ValidationError("The product does not exist in the shopping cart")
=======
            raise serializers.ValidationError("Ineffective productsID")
        if not CartItem.objects.filter(user=user, product_id=value).exists():
            raise serializers.ValidationError(
                "This product does not exist in the shopping cart"
            )
>>>>>>> e2a45cfc5baa7bc091c4e748374f1d2e2f1506c5
        return value
