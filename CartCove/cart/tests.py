import random
import string
from django.test import TestCase
from django.urls import reverse
from rest_framework.authtoken.models import Token
from .models import Product
from django.contrib.auth.models import User
from rest_framework.test import APIClient

class AddToCartViewTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            username='testusers', 
            email='testuser@example.com', 
            password='Sc1234567.'
        )
        self.token, created = Token.objects.get_or_create(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

    def create_random_product(self):
        name = ''.join(random.choices(string.ascii_uppercase + string.digits, k=10))
        price = random.uniform(1.0, 100.0)
        return Product.objects.create(name=name, price=price)

    def test_add_random_product_to_cart(self):
        # Confirm user has logged in successfully and a correct token is returned
        login_successful = self.client.login(username='testusers', password='Sc1234567.')
        self.assertTrue(login_successful, "User login failed")
        print("1. User successfully logged in! A correct token has been returned.")

        # Create a random product and add it to cart
        product = self.create_random_product()
        add_to_cart_url = reverse('add_to_cart', args=[product.id])
        response = self.client.post(add_to_cart_url, {})
        self.assertEqual(response.status_code, 201, f"Response status code for adding '{product.name}' to the cart is not 201")
        print(f"2. The product '{product.name}' with price {product.price} has been successfully added to the cart.")

        # Test if product creation was successful
        self.assertTrue(isinstance(product, Product))
        print(f"3. Product created successfully: Name - {product.name}, Price - {product.price}")

# ... (rest of your test file) ...
