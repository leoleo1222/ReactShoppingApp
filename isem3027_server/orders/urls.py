from django.urls import path, include
from rest_framework import routers

from .views import (
    OrderListView,
    make_payment,
    confirm_payment,
    cancel_payment,
)

urlpatterns = [
    path('orders/', OrderListView.as_view()),
    path('payment/', make_payment, ),
    path('process/', confirm_payment, ),
    path('cancel/', cancel_payment),
]

