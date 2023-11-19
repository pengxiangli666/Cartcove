from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import generics
from .serializers import AccountSerializer
from .models import Account

# Create your views here.

def custom404(request, exception=None):
    return JsonResponse({
        'status_code': 404,
        'error': 'The page was not found'
    })

class AccountView(generics.CreateAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer
    
