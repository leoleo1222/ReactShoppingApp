from django.urls import path, include
from .views import (
    UserCreateView,
    UserRetrieveUpdateView,
    CustomAuthToken,
    ProductView,
    AccountView,
    ChatbotProxyView
)
# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    # URL for user register
    path('user-register/', UserCreateView.as_view(), name="user-register"),
    # URLs for get specific user information with user id(pk) <primary key>
    path('user/<int:pk>/', UserRetrieveUpdateView.as_view(), name="user-detail"),
    # URL for user login and return user informaiton 
    path('api-token-auth/', CustomAuthToken.as_view()),
    # URL for get products data
    
    # path('products/', ProductListView.as_view()),
    # path('product/<int:pk>/', ProductDetailView.as_view()),
    
    # URL for get specific product information with product id(pk) <primary key>

    path('products/<int:pk>', ProductView.as_view()),
    path('products/', ProductView.as_view()),
    path('product/<int:pk>', ProductView.as_view()),
    path('product/', ProductView.as_view()),
    path('admin/account/<str:username>/', AccountView.as_view()),
    path('admin/account/', AccountView.as_view()),
    path('chatbot/', ChatbotProxyView.as_view()),
]

# example:
# post data to server for user register > localhost:8000user-register/
# get user ID 999 detail info > localhost:8000/user/999/
# post data to server for getting user token > localhost:8000/api-token-auth/
# get products list data > localhost:8000/products/
# get product ID 1 info data > localhost:8000/product/1/
