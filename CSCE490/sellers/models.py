from django.db import models

class Seller(models.Model):
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=100)


# Create your models here.
