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
		fields = '__all__'


class CustomerSerializerWithoutUsername(serializers.ModelSerializer):
	class Meta:
		model = Customer
		exclude = ['username']


class CustomerPublicInfoSerializer(serializers.ModelSerializer):
	class Meta:
		model = Customer
		fields = ['username', 'email']


class AddressSerializer(serializers.ModelSerializer):
	class Meta:
		model = Address
		fields = '__all__'

class SellerSerializer(serializers.ModelSerializer):
	class Meta:
		model = Seller
		fields = '__all__'

class SellerSerializerWithoutUsername(serializers.ModelSerializer):
	class Meta:
		model = Seller
		exclude = ['username']

class ProductSerializer(serializers.ModelSerializer):
	class Meta:
		model = Product
		# fields should exclude the sellerID
		# fields = '__all__'
		exclude = ['sellerID']


class ProductShowSerializer(serializers.ModelSerializer):
	# all the fields in Product
	# plus the product images and videos
	images = serializers.ReadOnlyField()
	videos = serializers.ReadOnlyField()

	class Meta:
		model = Product
		fields = '__all__'
		extra_fields = ['images', 'videos']

class ProductImageSerializer(serializers.ModelSerializer):
	class Meta:
		model = ProductImage
		fields = '__all__'

class ProductVideoSerializer(serializers.ModelSerializer):
	class Meta:
		model = ProductVideo
		fields = '__all__'

class ImageSerializer(serializers.Serializer):
	image = serializers.ImageField()

class CartSerializer(serializers.ModelSerializer):
	class Meta:
		model = Cart
		fields = '__all__'

class CartJsonSerializer(serializers.Serializer):
	productID = serializers.IntegerField()
	quantity = serializers.IntegerField()

class CartShowSerializer(serializers.ModelSerializer):
	# all the fields in Cart
	# plus the product info
	product = ProductSerializer()

	class Meta:
		model = Cart
		fields = '__all__'
		extra_fields = ['product']

class ShareCartSerializer(serializers.ModelSerializer):
	class Meta:
		model = ShareCart
		fields = '__all__'

class ShareCartResponseSerializer(serializers.Serializer):
	ID = serializers.IntegerField()


class ShareCartShowSerializer(serializers.Serializer):
	products = ProductSerializer(many=True)
	shared_by = CustomerPublicInfoSerializer()


class SearchProducts(serializers.Serializer):
	# optional fields
	keyword = serializers.CharField(max_length=100)
	higherPrice = serializers.DecimalField(max_digits=12, decimal_places=2)
	lowerPrice = serializers.DecimalField(max_digits=12, decimal_places=2)
	# sort by price
	sortByPrice = serializers.BooleanField(default=False)

	# pagination
	page = serializers.IntegerField(default=1, initial=1)

	# make sure that at least one field is not None
	def validate(self, attrs):
		fields = ['keyword', 'higherPrice', 'lowerPrice']
		flag = False
		for field in fields:
			if attrs[field] is not None:
				flag = True
				break
		if not flag:
			raise serializers.ValidationError(f"At least one field in {fields} should not be None")
		return attrs

class SearchProductsResponse(serializers.Serializer):
	products = ProductSerializer(many=True)
	totalPages = serializers.IntegerField()
	page = serializers.IntegerField()


class OrderSerializer(serializers.ModelSerializer):
	class Meta:
		model = Order
		fields = '__all__'

class OrderQuerySerializer(serializers.Serializer):
	# optional fields
	# default is all
	status = serializers.CharField(max_length=20, default=None)

	productID = serializers.IntegerField(default=None)

	customerID = serializers.IntegerField(default=None)

	# pagination
	page = serializers.IntegerField(default=1, initial=1)

	def validate(self, attrs):
		# fields = ['status', 'productID', 'customerID', 'page']
		# flag = False
		# for field in fields:
		# 	if attrs[field] is not None:
		# 		flag = True
		# 		break
		# if not flag:
		# 	raise serializers.ValidationError(f"At least one field in {fields} should not be None")
		return attrs

class OrderQueryResponse(serializers.Serializer):
	orders = OrderSerializer(many=True)
	totalPages = serializers.IntegerField()
	page = serializers.IntegerField()
