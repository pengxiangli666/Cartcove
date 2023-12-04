from .models import *
from .serializers import *
from functools import wraps
from django.http import HttpRequest, HttpResponse
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .auth import JWTAuthentication
from django.conf import settings
from django.core.paginator import Paginator

from django.contrib.auth.models import User
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi


# Create API endpoints for the Customer model

# Customer

AuthorizationHeader = openapi.Parameter(
	"Cookies",
	openapi.IN_HEADER,
	description="JWT Token in Cookies (token=...)",
	type=openapi.IN_HEADER
)

jwt_authentication = JWTAuthentication()

def user_passes_test(user_type=None):
	def decorator(view_func):
		@wraps(view_func)
		def _wrapped_view(request: HttpRequest, *args, **kwargs):
			# set the user type to the request context
			print("call")
			user = jwt_authentication.authenticate(request=request, user_type=user_type)
			print(user)
			request.user = user
			if request.user:
				return view_func(request, *args, **kwargs)
			return HttpResponse('Unauthorized', status=401)
		return _wrapped_view
	return decorator


def login_required(function=None, user_type=None):
	actual_decorator = user_passes_test(
		user_type=user_type
	)
	if function:
		return actual_decorator(function)
	return actual_decorator


def login(request: HttpRequest, user: User):
	if user is None or not user.check_password(request.data.get('password')):
		return Response(status=status.HTTP_400_BAD_REQUEST)
	jwt_token = JWTAuthentication.create_jwt(user)
	token = TokenResponseSerializer({'token': jwt_token})
	resp = Response(token.data, status=status.HTTP_200_OK)
	exp = settings.JWT_CONF['TOKEN_LIFETIME_HOURS'] * 60 * 60
	resp.set_cookie('Token', jwt_token, max_age=exp)
	return resp	


class CustomerAPI:
	# register a new customer
	@staticmethod
	@swagger_auto_schema(
		method='post',
		request_body=CustomerSerializer,
		operation_description="Register a new customer",
		operation_summary="Register a new customer",
		responses={
			201: CustomerSerializer,
			400: "Bad Request"
		}
	)
	@api_view(['POST'])
	def register(request: HttpRequest):
		# get the data from the request
		customer = CustomerSerializer(data=request.data)
		# check if the data is valid
		if not customer.is_valid():
			return Response(customer.errors, status=status.HTTP_400_BAD_REQUEST)
		# save the data
		customer.save()
		# return a response
		return Response(customer.data, status=status.HTTP_201_CREATED)

	@staticmethod
	@swagger_auto_schema(
		method='post',
		request_body=LoginSerializer,
		operation_description="Login a customer",
		operation_summary="Login a customer",
		responses={
			200: TokenResponseSerializer,
			400: "Bad Request"
		}
	)
	@api_view(['POST'])
	def login(request: HttpRequest):
		# get the data from the request
		username = request.data.get('username')
		user = Customer.objects.filter(username=username).first()
		return login(request, user)

	# get user info
	@staticmethod
	@api_view(['POST'])
	@login_required
	def add_address(request: HttpRequest):
		# get the data from the request
		address = AddressSerializer(data=request.data)
		# call Address.set_user
		address.set_user(request.user)
		# check if the data is valid
		if not address.is_valid():
			return Response(address.errors, status=status.HTTP_400_BAD_REQUEST)
		# save the data
		address.save()
		# return a response
		return Response(address.data, status=status.HTTP_201_CREATED)


	# get user info
	@staticmethod
	@swagger_auto_schema(
		method='get',
		operation_description="Get customer info",
		operation_summary="Get customer info",
		manual_parameters=[AuthorizationHeader],
		responses={
			200: CustomerSerializer,
			400: "Bad Request"
		}
	)
	@api_view(['GET'])
	@login_required(user_type='customer')
	def get_info(request: HttpRequest):
		# get the user
		user = request.user
		# get the customer
		customer = Customer.objects.get(username=user.username)
		# serialize the data
		serializer = CustomerSerializer(customer)
		# return a response
		return Response(serializer.data, status=status.HTTP_200_OK)

	# update user info
	@staticmethod
	@swagger_auto_schema(
		method='patch',
		request_body=CustomerSerializerWithoutUsername,
		manual_parameters=[AuthorizationHeader],
		operation_description="Update customer info",
		operation_summary="Update customer info",
		responses={
			200: CustomerSerializerWithoutUsername,
			400: "Bad Request"
		}
	)
	@api_view(['PATCH'])
	@login_required(user_type='customer')
	def update_info(request: HttpRequest):
		# get the user
		user = request.user
		# get the customer
		customer = Customer.objects.get(username=user.username)
		# serialize the data
		serializer = CustomerSerializerWithoutUsername(customer, data=request.data, partial=True)
		# check if the data is valid
		if serializer.is_valid():
			# save the data
			serializer.save()
			# return a response
			return Response(serializer.data, status=status.HTTP_200_OK)
		# return a response
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

	# add to cart
	@staticmethod
	@swagger_auto_schema(
		method='post',
		request_body=CartJsonSerializer,
		manual_parameters=[AuthorizationHeader],
		operation_description="Add product to cart with quantity",
		operation_summary="Add product to cart with quantity",
		responses={
			200: CartSerializer,
			400: "Bad Request"
		}
	)
	@swagger_auto_schema(
		method='patch',
		request_body=CartJsonSerializer,
		manual_parameters=[AuthorizationHeader],
		operation_description="Update product quantity in cart",
		operation_summary="Update product quantity in cart",
		responses={
			200: CartSerializer,
			400: "Bad Request"
		}
	)
	@api_view(['PATCH', 'POST'])
	@login_required(user_type='customer')
	def add_to_cart(request: HttpRequest, product_id: int = None):
		if product_id is None:
			# get the data from the request
			serializer = CartJsonSerializer(data=request.data)
			# check if the data is valid
			if not serializer.is_valid():
				return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

			# store
			cart = serializer.validated_data
			# get the user
			user = request.user
			# get the customer
			customer = Customer.objects.get(username=user.username)
			# get the product
			product = Product.objects.get(ID=cart['productID'])
			# check if the product is in the cart
		else:
			# get the user
			user = request.user
			# get the customer
			customer = Customer.objects.get(username=user.username)

			# count the cart size of the customer
			cart_size = Cart.objects.filter(userID=customer).count()
			if settings.CART_SIZE_LIMIT != 0 and cart_size >= settings.CART_SIZE_LIMIT:
				# return an error
				return Response(data={'error': 'Cart size limit reached'}, status=status.HTTP_400_BAD_REQUEST)

			# get the product
			product = Product.objects.get(ID=product_id)
			# check if the product is in the cart

		cart = Cart.objects.filter(customerID=customer, productID=product).first()
		if cart is None:
			if product_id is None:
				# return an error
				return Response(status=status.HTTP_400_BAD_REQUEST)
			# create a new cart
			cart = Cart(customerID=customer, productID=product, quantity=cart['quantity'])
		else:
			# update the quantity
			cart.quantity = cart['quantity']
		# save the data
		cart.save()

		# return a response
		return Response(CartSerializer(cart).data, status=status.HTTP_200_OK)

	# remove from cart
	@staticmethod
	@swagger_auto_schema(
		method='delete',
		manual_parameters=[AuthorizationHeader],
		operation_description="Remove product from cart",
		operation_summary="Remove product from cart",
		responses={
			204: "No Content",
			400: "Bad Request"
		}
	)
	@api_view(['DELETE'])
	@login_required(user_type='customer')
	def remove_from_cart(request: HttpRequest, product_id: int):
		# get the user
		user = request.user
		# get the customer
		customer = Customer.objects.get(username=user.username)
		# get the product
		product = Product.objects.get(ID=product_id)
		# get the cart
		cart = Cart.objects.filter(customerID=customer, productID=product).first()
		# check if the cart exists
		if cart is None:
			return Response(status=status.HTTP_400_BAD_REQUEST)
		# delete the cart
		cart.delete()
		# return a response
		return Response(status=status.HTTP_204_NO_CONTENT)

	# get carts
	@staticmethod
	@swagger_auto_schema(
		method='get',
		manual_parameters=[AuthorizationHeader],
		operation_description="Get carts",
		operation_summary="Get carts",
		responses={
			200: CartShowSerializer(many=True),
			400: "Bad Request"
		}
	)
	@api_view(['GET'])
	@login_required(user_type='customer')
	def get_cart(request: HttpRequest):
		# get the user
		user = request.user
		# get the customer
		customer = Customer.objects.get(username=user.username)
		# get the carts
		carts = Cart.objects.filter(userID=customer)
		# serialize the data
		serializer = CartShowSerializer(carts, many=True)
		# return a response
		return Response(serializer.data, status=status.HTTP_200_OK)

	# share cart
	@staticmethod
	@swagger_auto_schema(
		method='post',
		request_body=openapi.Schema(
			type=openapi.TYPE_ARRAY,
			items=openapi.Schema(type=openapi.TYPE_INTEGER)
		),
		manual_parameters=[AuthorizationHeader],
		operation_description="Share cart",
		operation_summary="Share cart",
		responses={
			200: ShareCartResponseSerializer,
			400: "Bad Request"
		}
	)
	@api_view(['POST'])
	@login_required(user_type='customer')
	def share_cart(request: HttpRequest):
		# data is a array of product ids
		# with no any key/value pairs
		# get the data from the request
		productIds = request.data
		if not isinstance(productIds, list):
			return Response(status=status.HTTP_400_BAD_REQUEST)
		# get the user
		user = request.user
		# get the customer
		customer = Customer.objects.get(username=user.username)
		# check productIds
		for productId in productIds:
			if Product.objects.filter(ID=productId).count() == 0:
				return Response(status=status.HTTP_400_BAD_REQUEST)
		# create a new cart
		productIDs = ",".join(productIds)
		shareCart = ShareCartSerializer({
			"userID": customer,
			"productIDs": productIDs
		})
		if not shareCart.is_valid():
			return Response(status=status.HTTP_400_BAD_REQUEST)
		# save the data
		shareCart.save()
		# return a response with the share cart id
		response = ShareCartResponseSerializer({
			"ID": shareCart.data['ID'],
		})
		return Response(response.data, status=status.HTTP_200_OK)

	# place order
	@staticmethod
	@swagger_auto_schema(
		method='post',
		request_body=OrderSerializer,
		manual_parameters=[AuthorizationHeader],
		operation_description="Place order",
		operation_summary="Place order",
		responses={
			201: OrderSerializer,
			400: "Bad Request"
		}
	)
	@api_view(['POST'])
	@login_required(user_type='customer')
	def place_order(request: HttpRequest):
		# get the user
		user = request.user
		# get the customer
		customer = Customer.objects.get(username=user.username)
		# get order info
		order = OrderSerializer({
			"customerID": customer,
		}, data=request.data, partial=True)
		# check if the data is valid
		if not order.is_valid():
			return Response(order.errors, status=status.HTTP_400_BAD_REQUEST)
		# save the data
		order.save()

		# remove the products from the cart
		Cart.objects.filter(userID=customer, productID=order.data['productID']).delete()

		# response
		return Response(order.data, status=status.HTTP_201_CREATED)

# Seller
class SellerAPI:
	# register a new seller
	@staticmethod
	@swagger_auto_schema(
		method='post',
		request_body=SellerSerializer,
		operation_description="Register a new seller",
		operation_summary="Register a new seller",
		responses={
			201: SellerSerializer,
			400: "Bad Request"
		}
	)
	@api_view(['POST'])
	def register(request: HttpRequest):
		# get the data from the request
		seller = SellerSerializer(data=request.data)
		# check if the data is valid
		if seller.is_valid():
			# save the data
			seller.save()
			# return a response
			return Response(seller.data, status=status.HTTP_201_CREATED)
		# return a response
		return Response(seller.errors, status=status.HTTP_400_BAD_REQUEST)

	# login a seller
	@staticmethod
	@swagger_auto_schema(
		method='post',
		request_body=LoginSerializer,
		operation_description="Login a seller",
		operation_summary="Login a seller",
		responses={
			200: TokenResponseSerializer,
			400: "Bad Request"
		}
	)
	@api_view(['POST'])
	def login(request: HttpRequest):
		# get the data from the request
		username = request.data.get('username')
		user = Seller.objects.filter(username=username).first()
		return login(request, user)

	# get user info
	@staticmethod
	@swagger_auto_schema(
		method='get',
		manual_parameters=[AuthorizationHeader],
		operation_description="Get seller info",
		operation_summary="Get seller info",
		responses={
			200: SellerSerializer,
			400: "Bad Request"
		}
	)
	@api_view(['GET'])
	@login_required(user_type='seller')
	def get_info(request: HttpRequest):
		# get the user
		user = request.user
		# get the seller
		seller = Seller.objects.get(username=user.username)
		# serialize the data
		serializer = SellerSerializer(seller)
		# return a response
		return Response(serializer.data, status=status.HTTP_200_OK)

	# update user info
	@staticmethod
	@swagger_auto_schema(
		method='patch',
		request_body=SellerSerializerWithoutUsername,
		manual_parameters=[AuthorizationHeader],
		operation_description="Update seller info",
		operation_summary="Update seller info",
		responses={
			200: SellerSerializerWithoutUsername,
			400: "Bad Request"
		}
	)
	@api_view(['PATCH'])
	@login_required(user_type='seller')
	def update_info(request: HttpRequest):
		# get the user
		user = request.user
		# get the seller
		seller = Seller.objects.get(username=user.username)
		# serialize the data
		serializer = SellerSerializerWithoutUsername(seller, data=request.data, partial=True)
		# check if the data is valid
		if serializer.is_valid():
			# save the data
			serializer.save()
			# return a response
			return Response(serializer.data, status=status.HTTP_200_OK)
		# return a response
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

	# add a new product
	@staticmethod
	@swagger_auto_schema(
		method='post',
		request_body=ProductSerializer,
		manual_parameters=[AuthorizationHeader],
		operation_description="Add a new product",
		operation_summary="Add a new product",
		responses={
			201: ProductSerializer,
			400: "Bad Request"
		}
	)
	@api_view(['POST'])
	@login_required(user_type='seller')
	def add_product(request: HttpRequest):
		# get the data from the request
		product = ProductSerializer(data=request.data)
		# check if the data is valid
		if not product.is_valid():
			return Response(product.errors, status=status.HTTP_400_BAD_REQUEST)
		# set the seller
		product.validated_data['sellerID'] = request.user
		# save the data
		product.save()
		# return a response
		return Response(product.data, status=status.HTTP_201_CREATED)

	# edit a product
	@staticmethod
	@swagger_auto_schema(
		method='patch',
		request_body=ProductSerializer,
		manual_parameters=[AuthorizationHeader],
		operation_description="Edit a product",
		operation_summary="Edit a product",
		responses={
			200: ProductSerializer,
			400: "Bad Request"
		}
	)
	@api_view(['PATCH'])
	@login_required(user_type='seller')
	def edit_product(request: HttpRequest, product_id: int):
		product = Product.objects.get(ID=product_id)
		# check if the seller is the owner of the product
		if product.sellerID != request.user:
			return Response(status=status.HTTP_400_BAD_REQUEST)
		# patch the data to the product
		product = ProductSerializer(product, data=request.data, partial=True)
		# check if the data is valid
		if not product.is_valid():
			return Response(product.errors, status=status.HTTP_400_BAD_REQUEST)
		# save the data
		product.save()
		# return a response
		return Response(product.data, status=status.HTTP_200_OK)

	# upload a product image
	@staticmethod
	@swagger_auto_schema(
		method='post',
		request_body=openapi.Schema(
			type=openapi.TYPE_FILE,
			description="Image file",
		),
		# content type: octet-stream
		consume=['application/octet-stream'],
		manual_parameters=[AuthorizationHeader],
		operation_description="Upload a product image",
		operation_summary="Upload a product image",
		responses={
			201: ProductImageSerializer,
			400: "Bad Request"
		}
	)
	@api_view(['POST'])
	@login_required(user_type='seller')
	def upload_product_image(request: HttpRequest, product_id: int):
		# the image is the raw body
		image = request.body
		# get the product
		product = Product.objects.get(ID=product_id)
		# check if the seller is the owner of the product
		if product.sellerID != request.user:
			return Response(status=status.HTTP_400_BAD_REQUEST)
		# create a new product image
		product_image = ProductImage(productID=product, image=image)
		# save the data
		product_image.save()
		# return a response
		return Response(ProductImageSerializer(product_image).data, status=status.HTTP_201_CREATED)

	# delete a product image
	@staticmethod
	@swagger_auto_schema(
		method='delete',
		manual_parameters=[AuthorizationHeader],
		operation_description="Delete a product image",
		operation_summary="Delete a product image",
		responses={
			204: "No Content",
			400: "Bad Request"
		}
	)
	@api_view(['DELETE'])
	@login_required(user_type='seller')
	def delete_image(request: HttpRequest, product_id: int, image_id: int):
		# get the product
		product = Product.objects.get(ID=product_id)
		# check if the seller is the owner of the product
		if product.sellerID != request.user:
			return Response(status=status.HTTP_400_BAD_REQUEST)
		# get the product image
		product_image = ProductImage.objects.get(ID=image_id, productID=product)
		# delete the product image
		product_image.delete()
		# return a response
		return Response(status=status.HTTP_204_NO_CONTENT)

	# upload a product video
	@staticmethod
	@swagger_auto_schema(
		method='post',
		# request body is the raw video data
		request_body=openapi.Schema(
			type=openapi.TYPE_FILE,
			description="Video file",
		),
		# content type: octet-stream
		consume=['application/octet-stream'],
		manual_parameters=[AuthorizationHeader],
		operation_description="Upload a product video",
		operation_summary="Upload a product video",
		responses={
			201: ProductVideoSerializer,
			400: "Bad Request"
		}
	)
	@api_view(['POST'])
	@login_required(user_type='seller')
	def upload_video(request: HttpRequest, product_id: int):
		# the video is the raw body
		video = request.body
		# get the product
		product = Product.objects.get(ID=product_id)
		# check if the seller is the owner of the product
		if product.sellerID != request.user:
			return Response(status=status.HTTP_400_BAD_REQUEST)
		# create a new product video
		product_video = ProductVideo(productID=product, video=video)
		# save the data
		product_video.save()
		# return a response
		return Response(ProductVideoSerializer(product_video).data, status=status.HTTP_201_CREATED)

	# delete a product video
	@staticmethod
	@swagger_auto_schema(
		method='delete',
		manual_parameters=[AuthorizationHeader],
		operation_description="Delete a product video",
		operation_summary="Delete a product video",
		responses={
			204: "No Content",
			400: "Bad Request"
		}
	)
	@api_view(['DELETE'])
	@login_required(user_type='seller')
	def delete_video(request: HttpRequest, product_id: int, video_id: int):
		# get the product
		product = Product.objects.get(ID=product_id)
		# check if the seller is the owner of the product
		if product.sellerID != request.user:
			return Response(status=status.HTTP_400_BAD_REQUEST)
		# get the product video
		product_video = ProductVideo.objects.get(ID=video_id, productID=product)
		# delete the product video
		product_video.delete()
		# return a response
		return Response(status=status.HTTP_204_NO_CONTENT)

	# get products
	@staticmethod
	@swagger_auto_schema(
		method='get',
		manual_parameters=[
			AuthorizationHeader,
			openapi.Parameter(
				"productID",
				openapi.IN_QUERY,
				description="Product ID",
				type=openapi.TYPE_INTEGER
			),
			openapi.Parameter(
				"customerID",
				openapi.IN_QUERY,
				description="Customer ID",
				type=openapi.TYPE_INTEGER
			),
			openapi.Parameter(
				"status",
				openapi.IN_QUERY,
				description="Status",
				type=openapi.TYPE_STRING,
				enum=['pending', 'shipped', 'delivered']
			),
			openapi.Parameter(
				"page",
				openapi.IN_QUERY,
				description="Page",
				type=openapi.TYPE_INTEGER
			)	
		],
		operation_description="Get products",
		operation_summary="Get products",
		responses={
			200: ProductSerializer(many=True),
			400: "Bad Request"
		}
	)
	@api_view(['GET'])
	@login_required(user_type='seller')
	def get_products(request: HttpRequest):
		# get the user
		user = request.user
		# get the seller
		seller = Seller.objects.get(username=user.username)
		# get the products
		products = Product.objects.filter(sellerID=seller)
		# serialize the data
		serializer = ProductSerializer(products, many=True)
		# return a response
		return Response(serializer.data, status=status.HTTP_200_OK)

	# get orders
	@staticmethod
	@swagger_auto_schema(
		method='get',
		manual_parameters=[
			AuthorizationHeader,
			openapi.Parameter(
				"productID",
				openapi.IN_QUERY,
				description="Product ID",
				type=openapi.TYPE_INTEGER
			),
			openapi.Parameter(
				"customerID",
				openapi.IN_QUERY,
				description="Customer ID",
				type=openapi.TYPE_INTEGER
			),
			openapi.Parameter(
				"status",
				openapi.IN_QUERY,
				description="Status",
				type=openapi.TYPE_STRING,
				enum=['pending', 'shipped', 'delivered']
			),
			openapi.Parameter(
				"page",
				openapi.IN_QUERY,
				description="Page",
				type=openapi.TYPE_INTEGER
			)
		],
		operation_description="Get orders",
		operation_summary="Get orders",
		responses={
			200: OrderSerializer(many=True),
			400: "Bad Request"
		}
	)
	@api_view(['GET'])
	@login_required(user_type='seller')
	def get_orders(request: HttpRequest):
		query = OrderQuerySerializer(data=request.query_params)
		# check if the data is valid
		if not query.is_valid():
			return Response(query.errors, status=status.HTTP_400_BAD_REQUEST)
		# get the user
		user = request.user
		# get the seller
		seller = Seller.objects.get(username=user.username)
		products = Product.objects.filter(sellerID=seller)
		# get the orders
		if query.data['productID']:
			# check if the product is owned by the seller
			if products.filter(ID=query.data['productID']).count() == 0:
				return Response(status=status.HTTP_404_NOT_FOUND)

		args = {}
		if query.data['productID']:
			args['productID'] = query.data['productID']
		if query.data['customer_id']:
			args['customerID'] = query.data['customerID']
		if query.data['status']:
			args['status'] = query.data['status']
		args['productID__in'] = products
		orders = Order.objects.filter(**args)
		
		# paginate the orders
		page: int = query.data['page']
		paginator = Paginator(orders, settings.ORDER_QUERY_PAGE_SIZE, allow_empty_first_page=True)

		# serialize the data
		serializer = OrderQueryResponse({
			"orders": paginator.page(page).object_list,
			"totalPages": paginator.num_pages,
			"page": page
		})
		# return a response
		return Response(serializer.data, status=status.HTTP_200_OK)

	# update order status
	@staticmethod
	@swagger_auto_schema(
		method='patch',
		request_body=openapi.Schema(
			type=openapi.TYPE_OBJECT,
			properties={
				'status': openapi.Schema(type=openapi.TYPE_STRING, enum=['pending', 'shipped', 'delivered'])
			}
		),
		manual_parameters=[AuthorizationHeader],
		operation_description="Update order status",
		operation_summary="Update order status",
		responses={
			200: "OK",
			400: "Bad Request"
		}
	)
	@api_view(['PATCH'])
	@login_required(user_type='seller')
	def update_status(request: HttpRequest, order_id: int):
		# get the user
		user = request.user
		seller = Seller.objects.get(username=user.username)
		# get the order
		order = Order.objects.get(ID=order_id)
		if order is None:
			return Response(status=status.HTTP_404_NOT_FOUND)
		# check if the seller is the owner of the product
		if order.productID.sellerID != seller:
			return Response(status=status.HTTP_400_BAD_REQUEST)
		# update the status
		order.status = request.data.get('status')
		# save the data
		try:
			order.save()
		except:
			return Response(status=status.HTTP_400_BAD_REQUEST)
		# return a response
		return Response(status=status.HTTP_200_OK)

class CommonAPI:
	# get product
	@staticmethod
	@swagger_auto_schema(
		method='get',
		operation_description="Get product",
		operation_summary="Get product",
		responses={
			200: ProductShowSerializer,
			400: "Bad Request"
		}
	)
	@api_view(['GET'])
	def get_product(request: HttpRequest, product_id: int):
		# get the product
		product = Product.objects.get(ID=product_id)
		# serialize the data
		serializer = ProductShowSerializer(product)
		# return a response
		return Response(serializer.data, status=status.HTTP_200_OK)

	# search products
	@staticmethod
	@swagger_auto_schema(
		method='get',
		# query string fields
		manual_parameters=[
			openapi.Parameter(
				"keyword",
				openapi.IN_QUERY,
				description="Keyword",
				type=openapi.TYPE_STRING
			),
			openapi.Parameter(
				"lowerPrice",
				openapi.IN_QUERY,
				description="Lower price",
				type=openapi.TYPE_NUMBER
			),
			openapi.Parameter(
				"higherPrice",
				openapi.IN_QUERY,
				description="Higher price",
				type=openapi.TYPE_NUMBER
			),
			openapi.Parameter(
				"sortByPrice",
				openapi.IN_QUERY,
				description="Sort by price",
				type=openapi.TYPE_BOOLEAN
			),
			openapi.Parameter(
				"page",
				openapi.IN_QUERY,
				description="Page number",
				type=openapi.TYPE_INTEGER
			)
		],
		operation_description="Search products",
		operation_summary="Search products",
		responses={
			200: SearchProductsResponse,
			400: "Bad Request"
		}
	)
	@api_view(['GET'])
	def search_products(request: HttpRequest):
		# get the search query from the url's query string
		query = SearchProducts(data=request.query_params)
		# check if the data is valid
		if not query.is_valid():
			return Response(query.errors, status=status.HTTP_400_BAD_REQUEST)
		# get the products
		args = {}
		if query.data['higher_price']:
			args['price__lte'] = query.data['higherPrice']
		if query.data['keyword']:
			args['name__icontains'] = query.data['keyword']
		if query.data['lower_price']:
			args['price__gte'] = query.data['lowerPrice']
		products = Product.objects.filter(**args)

		# if sort by price
		if query.data['sortByPrice']:
			products = products.order_by('price')
		# paginate the products
		page: int = query.data['page']
		paginator = Paginator(products, settings.PRODUCT_QUERY_PAGE_SIZE, allow_empty_first_page=True)

		# serialize the data
		serializer = SearchProductsResponse({
			"products": paginator.page(page).object_list,
			"totalPages": paginator.num_pages,
			"page": page
		})
		# return a response
		return Response(serializer.data, status=status.HTTP_200_OK)

	# get shared carts
	@staticmethod
	@swagger_auto_schema(
		method='get',
		operation_description="Get shared carts",
		operation_summary="Get shared carts",
		responses={
			200: ShareCartShowSerializer,
			400: "Bad Request"
		}
	)
	@api_view(['GET'])
	def get_shared_cart(request: HttpRequest, cart_id: int):
		# get the cart
		cart = ShareCart.objects.get(ID=cart_id)
		if cart is None:
			return Response(status=status.HTTP_404_NOT_FOUND)

		productIDs = cart.productIDs.split(',')
		products = Product.objects.filter(ID__in=productIDs)
		# serialize the data
		serializer = ShareCartShowSerializer({
			"products": products,
			"shared_by": cart.userID
		})
		# return a response
		return Response(serializer.data, status=status.HTTP_200_OK)
