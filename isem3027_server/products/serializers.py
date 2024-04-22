from django.contrib.auth import get_user_model
from rest_framework import serializers

from .models import Product

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'password2')
        extra_kwargs = {'password': {'write_only': True}}

    # following method is used to control when creating user
    def save(self):
        # create temporary user instance with username
        user_account = User(
            username = self.validated_data['username'],
        )
        password = self.validated_data['password']
        password2 = self.validated_data['password2']

        if password != password2:
            raise serializers.ValidationError({"error": "Password does not match"})
        # set the password for this user
        user_account.set_password(password)
        # call save method which save to database
        user_account.save()
        return user_account

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('id',
            'name',
            'price',
            'discount',
            'quantity',
            'description',
            'picture',
            'created',
            'updated',
        )
