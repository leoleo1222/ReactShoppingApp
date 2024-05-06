
from django.views import View
from django.contrib.auth import get_user_model
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.http import JsonResponse
import requests

from rest_framework import viewsets, permissions
from rest_framework import status
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.generics import (
    RetrieveUpdateAPIView,
    CreateAPIView,
    ListAPIView,
    RetrieveAPIView
)
from rest_framework.views import APIView  # 導入 APIView
from rest_framework.response import Response

from .serializers import UserSerializer, ProductSerializer
from .models import Product


User = get_user_model()


@receiver(post_save, sender=User)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)


class UserCreateView(CreateAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()


class UserRetrieveUpdateView(RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()


class CustomAuthToken(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'username': user.username
        })


class ProductView(APIView):

        def get_permissions(self):
            if self.request.method in ['POST', 'PUT', 'DELETE']:
                # self.permission_classes = [permissions.IsAuthenticated, IsAdminUser]
                self.permission_classes = [permissions.IsAuthenticated]
            else:
                self.permission_classes = []
            return [permission() for permission in self.permission_classes]

        def get(self, request, pk=None):
            if pk is not None:
                try:
                    product = Product.objects.get(pk=pk)
                    serializer = ProductSerializer(product)
                    return Response(serializer.data)
                except Product.DoesNotExist:
                    return Response(status=status.HTTP_404_NOT_FOUND)
            else:
                products = Product.objects.all()
                serializer = ProductSerializer(products, many=True)
                return Response(serializer.data)

        def post(self, request):
            serializer = ProductSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        def patch(self, request, pk):
            try:
                product = Product.objects.get(pk=pk)
            except Product.DoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)

            serializer = ProductSerializer(
                product, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        def delete(self, request, pk):
            try:
                product = Product.objects.get(pk=pk)
            except Product.DoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)

            product.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)


class AccountView(APIView):

    def get_permissions(self):
        permission_classes = [permissions.IsAuthenticated]
        return [permission() for permission in self.permission_classes]

    def get(self, request, username=None):
        # Retrieve single user or list all users
        if username is not None:
            try:
                user = User.objects.get(username=username)
                serializer = UserSerializer(user)
                return Response(serializer.data)
            except User.DoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)
        else:
            users = User.objects.all()
            serializer = UserSerializer(users, many=True)
            return Response(serializer.data)

    def post(self, request):
        # Create a new user account
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, username):
        # Partially update a user account
        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, username):
        # Delete a user account
        try:
            user = User.objects.get(username=username)
            user.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

from rest_framework.response import Response

class ChatbotProxyView(APIView):


    def submit(self, message):
        apiKey = "4a924173-a9d3-45d5-aa47-9db5695347d7"
        conversation = [{"role": "user", "content": message}]
        url = "https://chatgpt.hkbu.edu.hk/general/rest/deployments/gpt-35-turbo/chat/completions?api-version=2023-08-01-preview"
        headers = {'Content-Type': 'application/json', 'api-key': apiKey} 
        payload = {'messages': conversation}
        response = requests.post(url, json=payload, headers=headers)

        if response.status_code == 200:
            data = response.json()
            choices = data.get('choices', [])
            if choices:
                message_content = choices[0].get('message', {}).get('content')
                return message_content
        return 'Error:', response

    def post(self, request):
        # Extract the message from the request data
        message = request.data.get('messages')

        print("messages: ", message)

        # Call the submit function to interact with the external service
        response_content = self.submit(message)

        # Format the response in the desired format
        formatted_response = {
            "messages": [
                {
                    "role": "user",
                    "content": response_content
                }
            ]
        }

        # Return the formatted response
        return Response(formatted_response)
