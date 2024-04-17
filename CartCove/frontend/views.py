from django.shortcuts import render

# Create your views here.


def index(request, *args, **kwargs):
    return render(request, "frontend/index.html")

def web(request, *args, **kwargs):
    return render(request, "frontend/web.html")