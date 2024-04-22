from django.contrib.auth.models import User, Group
from rest_framework import serializers
 
from products.models import Product
from .models import Order


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ('customer', 'product', 'quantity', 'total_amount', 'payment_id', 'payment_token')
        read_only_fields = ('invoice_no', )
