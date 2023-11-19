from django.urls import path
from .views import AccountView
from .views import custom404

handler404 = custom404

urlpatterns = [
    path('', AccountView.as_view())
]