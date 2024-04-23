from django.test import TestCase
from decimal import Decimal
from .models import Product, Category, CartItem
from django.contrib.auth.models import User
from django.urls import reverse
from django.db import IntegrityError

class CategoryTestCase(TestCase):
    def setUp(self):

        Category.objects.create(name="Electronics", description="All electronic items")

    def test_category_creation(self):
        """
        Test the category creation functionality to ensure it is created correctly and stored in the database.
        """
        electronics = Category.objects.get(name="Electronics")
        self.assertEqual(electronics.description, "All electronic items")

    def test_category_str(self):
        """
        Tests whether the string representation of a category model is correct
        """
        electronics = Category.objects.get(name="Electronics")
        self.assertEqual(str(electronics), "Electronics")

    def test_category_name_uniqueness(self):
        """
        Tests the uniqueness constraint on category names to ensure that categories with duplicate names cannot be created.
        """
        with self.assertRaises(IntegrityError):
            Category.objects.create(name="Electronics")

class ProductTestCase(TestCase):
    """
    Test the functionality of the product model.
    """
    def setUp(self):
        """
        Create category and product instances for testing.
        """
        self.category = Category.objects.create(name="Books")
        Product.objects.create(name="Python Programming", category=self.category, price=Decimal("29.99"))

    def test_product_creation(self):
        """
        Test the product creation function to check if the product can be added to the database correctly.
        """
        book = Product.objects.get(name="Python Programming")
        self.assertEqual(book.price, Decimal("29.99"))

    def test_product_category(self):
        """
        Test that the product is associated with the correct category.
        """
        book = Product.objects.get(name="Python Programming")
        self.assertEqual(book.category.name, "Books")

    def test_product_str(self):
        """
        Tests whether the product's string representation is correct.
        """
        book = Product.objects.get(name="Python Programming")
        self.assertEqual(str(book), "Python Programming")

class CartItemTestCase(TestCase):
    """
    Test the functionality of the shopping cart item model.
    """
    def setUp(self):
        """
        Create user, product, and cart item instances for testing.
        """
        self.user = User.objects.create_user('john', 'john@example.com', 'johnpassword')
        self.product = Product.objects.create(name="Laptop", price=Decimal("1000.00"))
        CartItem.objects.create(user=self.user, product=self.product, quantity=0)

    def test_cartitem_quantity_reset(self):
       
        cart_item = CartItem.objects.first()
        self.assertEqual(cart_item.quantity, 1)

    def test_cartitem_str(self):
        """
        Tests whether the string representation of the shopping cart items is correct, usually displayed as a combination of user and product names.
        """
        cart_item = CartItem.objects.first()
        self.assertEqual(str(cart_item), f"{cart_item.user.username} - {cart_item.product.name}")
