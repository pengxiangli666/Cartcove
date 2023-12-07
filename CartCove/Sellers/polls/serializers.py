from .models import *

# Create your serializers here.
from rest_framework import serializers


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=20)
    password = serializers.CharField(max_length=60)


class TokenResponseSerializer(serializers.Serializer):
    token = serializers.CharField(max_length=500)


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = "__all__"


class CustomerSerializerWithoutUsername(serializers.ModelSerializer):
    class Meta:
        model = Customer
        exclude = ["username"]


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = "__all__"


class SellerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seller
        fields = "__all__"


class SellerSerializerWithoutUsername(serializers.ModelSerializer):
    class Meta:
        model = Seller
        exclude = ["username"]


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        # fields should exclude the sellerID
        # fields = '__all__'
        exclude = ["sellerID"]


class ProductShowSerializer(serializers.ModelSerializer):
    # all the fields in Product
    # plus the product images and videos
    images = serializers.ReadOnlyField()
    videos = serializers.ReadOnlyField()

    class Meta:
        model = Product
        fields = "__all__"
        extra_fields = ["images", "videos"]


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = "__all__"


class ProductVideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductVideo
        fields = "__all__"


class ImageSerializer(serializers.Serializer):
    image = serializers.ImageField()
