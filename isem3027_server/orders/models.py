from random import randint
from datetime import datetime
from django.db import models
from products.models import Product
from django.conf import settings

class Order(models.Model):
    inovice_no          =models.IntegerField(blank=True)
    customer            =models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.DO_NOTHING)
    product             =models.ForeignKey(Product, on_delete=models.DO_NOTHING)
    quantity            =models.IntegerField()
    total_amounnt       =models.DecimalField(max_digits=10, decimal_places=2, blank=True)
    created             =models.DateTimeField(auto_now_add=True, auto_now=False)
    updated             =models.DateTimeField(auto_now_add=False, auto_now=True)

    def __str__(self):
        return str(self.inovice_no)

    
    def save(self, *args, **kwargs):
        if not self.invoice_no:
            self.invoice_no = generating_invoice()  # generate new invoice number
        super(Order, self).save(*args, **kwargs)


# this the invoice number generating function
def generating_invoice():
    # random a string with 5 digits, eg: 00100/01234/12345/99999/00000 #join 5digits tgt
    i = ''.join(["%s" % randint(0, 9) for num in range(0, 5)])
    # Each digit can be drew from 0 to 9, then draw 5 times
    date_of_today = datetime.now().date().strftime("%d%m%Y")
    invoice = i + date_of_today # combine 2 string as invoice number
    # Checking whether the new generated invoice numbers is exist or not in current database by using try n except function!
    try: # try & except: doing expectation
        Order.objects.get(invoice_no=invoice)
        return generating_invoice()
    # if the new generated no = existing invoice no, run the generating invoice function again until a new one which does not crash the current one!
    except Order.DoesNotExist as e:
        return invoice
    # A new invoice no is generated n now return
