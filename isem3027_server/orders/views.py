from django.http import JsonResponse, HttpResponse
from django.shortcuts import render

from rest_framework.exceptions import PermissionDenied
from rest_framework import viewsets, permissions
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.generics import ListAPIView
from rest_framework import status
from rest_framework.views import APIView 
 
from .serializers import OrderSerializer, OrderListSerializer
from .models import Order
from .paypal_api import create_payment, execute_payment_process
 
 
class OrderListView(ListAPIView):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Order.objects.all()
    serializer_class = OrderListSerializer
    permission_classes = [permissions.IsAuthenticated]
 

 
    def get_queryset(self):
        user = self.request.user
        if (user.is_authenticated):
            return Order.objects.filter(customer=user)
        return None
 
 
'''
POST data as following
data = {
    customer: user_id,
    product: product_id,
    quantity: quantity,
    total_amount: total_amount
};
'''
 
 
@api_view(['POST'])
@renderer_classes((JSONRenderer,))
def make_payment(request):
    if request.method != "POST":
        return
    
    if not request.user.is_authenticated:
        raise PermissionDenied()

    payment_response = create_payment(request.data.get("total_amount"))
    if payment_response.get("error"):
        return JsonResponse(payment_response)

    data = request.data
    data['customer'] = request.user.id
    data['payment_id'] = payment_response.pop("payment_id")
    data['payment_token'] = payment_response.pop("payment_token")
    data['status'] = "Paid"
    serializer = OrderSerializer(data=data)
    if not serializer.is_valid():
        print(serializer.errors)
        return JsonResponse({"error": "Cannot create order"})

    serializer.save()
    return JsonResponse(payment_response)
 
 
# http://127.0.0.1:8000/cancel/?token=EC-8X333147JK744044X
@api_view(['GET'])
def cancel_payment(request):
    if (request.method == "GET"):
        print(request.user)
        token = request.GET.get("token")
        try:
            canceled_order = Order.objects.get(payment_token=token)
            canceled_order.delete()
        except Exception as e:
            print("Cannot delete object")
            print(e)
        finally:
            return render(request, 'cancel.html', {})
 
 
# http://127.0.0.1:8000/process?paymentId=PAYID-LSDZWMA0HA96543F7393463Y&token=EC-27430308GD746773K&PayerID=7FLA4P82VMUFL
@api_view(['GET'])
def confirm_payment(request):
    if (request.method == "GET"):
        print(request.user)
        paymentId = request.GET.get("paymentId")
        PayerID = request.GET.get("PayerID")
        token = request.GET.get("token")
        payment_response = execute_payment_process(paymentId, PayerID)
        if payment_response.get("error"):
            return render(request, 'cancel.html', {})

        order = Order.objects.get(payment_id=paymentId)
        order.confirm_order()
        return render(request, 'success.html', {})


   
class OrderAdminView(APIView):
    # permission_classes = [IsAdminUser]  # Ensures only admin users can access this view
    
    def get(self, request, pk=None):
        """
        Get a single order by pk or list all orders if no pk is specified.
        """
        if pk:
            try:
                order = Order.objects.get(pk=pk)
                serializer = OrderSerializer(order)
                return Response(serializer.data)
            except Order.DoesNotExist:
                return Response({'error': 'Order not found'}, status=status.HTTP_404_NOT_FOUND)
        else:
            orders = Order.objects.all()
            serializer = OrderSerializer(orders, many=True)
            return Response(serializer.data)

    def post(self, request):
        """
        Create a new order.
        """
        serializer = OrderSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk):
        """
        Partially update an order.
        """
        try:
            order = Order.objects.get(pk=pk)
        except Order.DoesNotExist:
            return Response({'error': 'Order not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = OrderSerializer(order, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        """
        Delete an order.
        """
        try:
            order = Order.objects.get(pk=pk)
            order.delete()
            return Response({'message': 'Order deleted'}, status=status.HTTP_204_NO_CONTENT)
        except Order.DoesNotExist:
            return Response({'error': 'Order not found'}, status=status.HTTP_404_NOT_FOUND)