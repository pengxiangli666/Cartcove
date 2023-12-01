from django.db import models
from django.conf import settings


class Product(models.Model):
    name = models.CharField(max_length=100, db_index=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
<<<<<<< HEAD
    image = models.ImageField(upload_to="products/", blank=True, null=True)  # Add image field
=======
    image = models.ImageField(upload_to="products/", blank=True, null=True)  # 添加图像字段
>>>>>>> e2a45cfc5baa7bc091c4e748374f1d2e2f1506c5

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
