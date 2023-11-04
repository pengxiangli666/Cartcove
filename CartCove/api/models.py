from django.db import models
import string
import random

def generate_username():
    length = 8

    while True:
        username = ''.join(random.choice(string.ascii_uppercase, k=length))
        
        if Account.objects.filter(username=username).count() == 0:
            break

    return username

def generate_password():
    length = 8

    while True:
        password = ''.join(random.choice(string.ascii_uppercase, k=length))
        
        if Account.objects.filter(password=password).count() == 0:
            break

    return password

# Create your models here.
class Account(models.Model):
    username = models.CharField(max_length=16, default="account", unique=True)
    password = models.CharField(max_length=16, default="password", unique=True)
    seller = models.BooleanField(null=False, default=False)
    
