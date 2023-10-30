from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth import authenticate, login
from .models import Seller
from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required

@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return JsonResponse({'message': 'Login Successful'})
        else:
            return JsonResponse({'message': 'Login Failed'})

    return JsonResponse({'message': 'Only supports POST requests'})

@login_required
def logout_view(request):
    logout(request)
    return JsonResponse({'message': 'Logged out'})

@login_required
def profile_view(request):
    return JsonResponse({'username': request.user.username, 'email': request.user.email})    return JsonResponse({'message': 'Only supports POST requests'})


# Create your views here.
