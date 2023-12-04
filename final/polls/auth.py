from .models import *
from django.http import HttpRequest
import jwt

# auth
from datetime import datetime, timedelta

import jwt
from django.conf import settings
from django.contrib.auth import get_user_model
from django.contrib.auth.backends import BaseBackend
from rest_framework.exceptions import AuthenticationFailed, ParseError

User = get_user_model()


class JWTAuthentication(BaseBackend):
	HEADER_PREFIX = 'Bearer'

	def authenticate(self, request: HttpRequest, user_type: str = None):
		# Extract the JWT from the Authorization header
		print(request.headers)
		jwt_token = request.COOKIES.get("Token")
		if jwt_token is None:
			return None

		assert user_type is not None, 'user_type must be specified'

		# Decode the JWT and verify its signature
		try:
			payload = jwt.decode(jwt_token, settings.JWT_CONF['SECRET_KEY'], algorithms=['HS256'])
		except jwt.exceptions.InvalidSignatureError:
			raise AuthenticationFailed('Invalid signature')
		except:
			raise ParseError()

		# Get the user from the database
		username = payload.get('username')
		if username is None:
			raise AuthenticationFailed('User identifier not found in JWT')
		
		if user_type != payload.get('user_type'):
			raise None

		if payload.get('user_type') == 'customer':
			user = Customer.objects.filter(username=username).first()
		else:
			user = Seller.objects.filter(username=username).first()
		if user is None:
			raise AuthenticationFailed('User not found')

		# Return the user and token payload
		return user

	def authenticate_header(self, request: HttpRequest):
		return self.HEADER_PREFIX

	@classmethod
	def create_jwt(cls, user: BasicUser):
		# Create the JWT payload
		payload = {
			'username': user.username,
			'exp': int((datetime.now() + timedelta(hours=settings.JWT_CONF['TOKEN_LIFETIME_HOURS'])).timestamp()),
			# set the expiration time for 5 hour from now
			'iat': datetime.now().timestamp(),
			'user_type': user.get_user_type(),
		}

		# Encode the JWT with your secret key
		jwt_token = jwt.encode(payload, settings.JWT_CONF['SECRET_KEY'], algorithm='HS256')

		return jwt_token
