from django.urls import path
from . import views

urlpatterns = [
    path('', views.chatbot_proxy, name='chatbot_proxy'),
]
