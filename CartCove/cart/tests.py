import random
import string
from django.test import TestCase
from django.urls import reverse
from rest_framework.authtoken.models import Token
from rest_framework import status
from .models import Product, CartItem
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

    def test_add_remove_product_to_cart(self):
        # Confirm user has logged in successfully
        login_successful = self.client.login(username='testusers', password='Sc1234567.')
        self.assertTrue(login_successful)
        print("1. User has successfully logged in.")

        # Create a random product
        product = self.create_random_product()
        self.assertTrue(isinstance(product, Product))
        print("4. Product successfully created: Name - {}, Price - {}".format(product.name, product.price))

        # Add product to cart
        add_to_cart_url = reverse('add_to_cart', args=[product.id])
        response = self.client.post(add_to_cart_url, {})
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        print("2. Product '{}' has been successfully added to the cart.".format(product.name))

        # Remove product from cart
        cart_item = CartItem.objects.create(user=self.user, product=product)
        remove_from_cart_url = reverse('remove_from_cart', args=[product.id])
        remove_response = self.client.post(remove_from_cart_url, {})
        self.assertEqual(remove_response.status_code, status.HTTP_204_NO_CONTENT)
        print("3. Product '{}' successfully removed from the cart.".format(product.name))

        # Delete product via API
        delete_url = reverse('product-detail', kwargs={'pk': product.id})
        delete_response = self.client.delete(delete_url)
        self.assertEqual(delete_response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Product.objects.filter(id=product.id).exists())
        print("5. Product '{}' successfully deleted by API.".format(product.name))
