from typing import Any
from django.db import models
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from functools import wraps
from django.core.validators import int_list_validator

# Create your models here.

def length_validator(min_length: int, max_length: int, error_message: str):
	@wraps(length_validator)
	def validator(value: str):
		if len(value) < min_length or len(value) > max_length:
			raise ValidationError(error_message)
	return validator

def username_validator(value: str):
	# should be numbers and letters only
	if not value.isalnum():
		raise ValueError("Username should be numbers and letters only.")
	# could not start with a number
	if value[0].isdigit():
		raise ValidationError("Username could not start with a number.")


# User model
class BasicUser(models.Model):
	username = models.CharField(max_length=20, unique=True, validators=[
		length_validator(4, 20, "Username must be between 4 and 20 characters long."),
		username_validator
	])
	password = models.CharField(max_length=60, validators=[
		# check if the password is enought to be encrypted
		length_validator(8, 25, "Password must be between 8 and 25 characters long.")
	])
	email = models.EmailField(max_length=50, unique=True)
	hint = models.CharField(max_length=50)
	hint_answer = models.CharField(max_length=50)

	def __init__(self, user_type: str, *args: Any, **kwargs: Any) -> None:
		super().__init__(*args, **kwargs)
		self._valid_password = False
		self._user_type = user_type

	def get_user_type(self) -> str:
		return self._user_type

	class Meta: 
		abstract = True

	def __str__(self):
		return self.username

	def save(self, *args, **kwargs):
		self.username = self.username.lower()
		self.email = self.email.lower()
		# hash the password
		super().save(*args, **kwargs)

	def check_password(self, password: str):
		return self.password == password

	def get_uid(self):
		return self.id


class Customer(BasicUser):
	objects = models.Manager()

	def __init__(self, *args: Any, **kwargs: Any) -> None:
		super().__init__("customer", *args, **kwargs)


class Address(models.Model):
	addressID = models.AutoField(primary_key=True, default=None)
	street = models.CharField(max_length=50)
	city = models.CharField(max_length=50)
	state = models.CharField(max_length=50)
	zipcode = models.IntegerField()
	userID = models.ForeignKey(Customer, on_delete=models.CASCADE, default=None)

	# unique together
	class Meta:
		constraints = [
			models.UniqueConstraint(fields=['userID', 'street', 'city', 'state', 'zipcode'], name='unique_address')
		]

	def __str__(self):
		return f"uid: {self.userID}, {self.street}, {self.city}, {self.state}, {self.zipcode}"

	def set_user(self, user: Customer):
		self.userID = user.get_uid()


class Seller(BasicUser):
	objects = models.Manager()

	def __init__(self, *args: Any, **kwargs: Any) -> None:
		super().__init__("seller", *args, **kwargs)

class Product(models.Model):
	ID = models.AutoField(primary_key=True, default=None)
	sellerID = models.ForeignKey(Seller, on_delete=models.CASCADE, default=None)
	name = models.CharField(max_length=50)
	price = models.DecimalField(max_digits=12, decimal_places=2)
	# real price is the price after discount
	realPrice = models.DecimalField(max_digits=12, decimal_places=2)
	description = models.CharField(max_length=200)
	quantity = models.IntegerField()

	@property
	def images(self):
		return ProductImage.objects.filter(productID=self.ID)
	
	@property
	def videos(self):
		return ProductVideo.objects.filter(productID=self.ID)
	
class ProductImage(models.Model):
	ID = models.AutoField(primary_key=True, default=None)
	productID = models.ForeignKey(Product, on_delete=models.CASCADE, default=None)
	image = models.ImageField(upload_to='images')

class ProductVideo(models.Model):
	productID = models.ForeignKey(Product, on_delete=models.CASCADE, default=None)
	video = models.FileField(upload_to='videos')


# Cart
class Cart(models.Model):
	objects = models.Manager()

	ID = models.AutoField(primary_key=True, default=None)
	userID = models.ForeignKey(Customer, on_delete=models.CASCADE, default=None)
	productID = models.ForeignKey(Product, on_delete=models.CASCADE, default=None)
	quantity = models.IntegerField()


class Order(Address):
	objects = models.Manager()

	ID = models.AutoField(primary_key=True, default=None)
	customerID = models.ForeignKey(Customer, on_delete=models.CASCADE, default=None)
	productID = models.ForeignKey(Product, on_delete=models.CASCADE, default=None)
	quantity = models.IntegerField()
	orderDate = models.DateTimeField(auto_now_add=True)
	status = models.CharField(max_length=50, default="pending", choices=[
		("pending", "pending"),
		("shipped", "shipped"),
		("delivered", "delivered"),
		("cancelled", "cancelled")
	])
	shippingDate = models.DateTimeField(default=None, null=True)

class ShareCart(models.Model):
	objects = models.Manager()

	userID = models.ForeignKey(Customer, on_delete=models.CASCADE, default=None)
	productIDs = models.CharField(max_length=200, validators=[
		int_list_validator
	])
	sharedDate = models.DateTimeField(auto_now_add=True)
