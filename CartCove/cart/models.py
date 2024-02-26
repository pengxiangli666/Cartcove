from django.db import models
from django.conf import settings
from django.contrib.auth.models import User


class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True, null=True)
    parent = models.ForeignKey(
        'self', on_delete=models.CASCADE, null=True, blank=True, related_name='children')

    class Meta:
        verbose_name_plural = "categories"

    def __str__(self):
        return self.name


class Product(models.Model):
    name = models.CharField(max_length=100, db_index=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(
        upload_to="products/", blank=True, null=True
    )
    category = models.ForeignKey(
        Category, on_delete=models.CASCADE, related_name='products', null=True, blank=True)
    # description = models.TextField(blank=True)

    def __str__(self):
        return self.name


class CartItem(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        related_name="cart_items",
    )
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name="cart_items"
    )
    quantity = models.IntegerField(default=1)
    added_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.product.name}"

    def save(self, *args, **kwargs):
        if self.quantity < 1:
            self.quantity = 1
        super().save(*args, **kwargs)


class Review(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE)  # connect to product
    rating = models.IntegerField()
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user} on {self.product}"


class Address(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    address = models.TextField()
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    zip_code = models.CharField(max_length=100)
    country = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.user.username} - {self.address}"


class Payment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    cvc = models.CharField(max_length=100)
    card_number = models.CharField(max_length=100)
    expiry_date = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.user.username} - {self.payment_id}"


class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    # list of products id and quantity like [{"product_id": 1, "quantity": 2}, {"product_id": 2, "quantity": 3}]
    products = models.JSONField()
    product_count = models.IntegerField()  # total number of products
    price = models.DecimalField(max_digits=10, decimal_places=2)  # total price
    ordered_on = models.DateTimeField(auto_now_add=True)
    ordered = models.BooleanField(default=False)
    address = models.ForeignKey(
        Address, on_delete=models.CASCADE, null=True, blank=True)
    payment = models.ForeignKey(
        Payment, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return f"{self.user.username} - {self.ordered_on}"

    def save(self, *args, **kwargs):
        self.product_count = sum([item['quantity'] for item in self.products])
        super().save(*args, **kwargs)

    def get_products(self):
        return [Product.objects.get(pk=item['product_id']) for item in self.products]

    def get_products_and_quantity(self):
        return [(Product.objects.get(pk=item['product_id']), item['quantity']) for item in self.products]

    def get_products_and_quantity_and_price(self):
        return [(Product.objects.get(pk=item['product_id']), item['quantity'], Product.objects.get(pk=item['product_id']).price * item['quantity']) for item in self.products]
