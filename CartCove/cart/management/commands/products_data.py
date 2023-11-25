import os
import django
from django.core.management.base import BaseCommand
from PIL import Image
import random
from faker import Faker


os.environ.setdefault("DJANGO_SETTINGS_MODULE", "CartCove.settings")
django.setup()

from cart.models import Product  # input product model


def generate_random_image(image_path, size=(100, 100)):
    """Generate a random color image and save it to the specified path"""
    color = (random.randint(0, 255), random.randint(0, 255), random.randint(0, 255))
    image = Image.new("RGB", size, color)
    image.save(image_path)


def create_fake_item(index, faker):
    """Generate a fake item and save it to the database"""
    name = faker.name()
    price = round(random.uniform(10, 100), 2)

    # Generate an image and save it
    image_path = f"media/products/item_{index}.png"
    generate_random_image(image_path)

    product = Product(name=name, price=price, image=image_path)
    product.save()

    return product


class Command(BaseCommand):
    help = "Generate random products with images"

    def handle(self, *args, **kwargs):
        faker = Faker()
        os.makedirs("media/products/", exist_ok=True)

        # 100 items generated
        items = [create_fake_item(i, faker) for i in range(100)]

        self.stdout.write(
            self.style.SUCCESS("Successfully generated 100 random products")
        )
