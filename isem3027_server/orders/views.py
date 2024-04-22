from django.http import JsonResponse, HttpResponse
from django.shortcuts import render

from rest_framework.exceptions import PermissionDenied
from rest_framework import viewsets, permissions
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.generics import ListAPIView
 
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
    if (request.method == "POST"):
        if (request.user.is_authenticated):
            payment_response = create_payment(request.data.get("total_amount"))
            if payment_response.get("error"):
                return JsonResponse(payment_response)
            else:
                data = request.data
                data['customer'] = request.user.id
                data['payment_id'] = payment_response.pop("payment_id")
                data['payment_token'] = payment_response.pop("payment_token")
                serializer = OrderSerializer(data=data)
                if serializer.is_valid():
                    # print(serializer.cleaned_data)
                    serializer.save()
                    return JsonResponse(payment_response)  # {"approval_url": approval_url}
                print(serializer.errors)
                return JsonResponse({"error": "Cannot create order"})
        raise PermissionDenied()
 
 
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
