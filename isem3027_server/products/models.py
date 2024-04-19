from django.db import models

def upload_location(instance, filename):
    # instance=current product, filename=uploaded filename, split=python function, split the file name into different sections.
    filebase, extension = filename.split(".") 
# build-in function to split a string to multi-parts
    # example: 123abc.jpg > filebase=123abc, extension=jpg, %s=string, 1st string,          product name, 2nd string: file extension)
    return "img/%s.%s" % (instance.name, extension)
    # example: img/apple.jpg  that means rename 123abc.jpg to apple.jpg



class Product(models.Model): # declare a model class
    # data fields:
    # CharField: a string.
    # DecimalField:A fixed-precision decimal number field
    # IntegerField: An integer. Values from -2147483648 to 2147483647 are safe in all databases supported by Django.
    # TextField: A large text field
    name            = models.CharField(unique=True, max_length=50)
    price           = models.DecimalField(max_digits=10, decimal_places=2)
    discount        = models.IntegerField(default=1)
    quantity        = models.IntegerField(default=0)
    description     = models.TextField()
    picture         = models.ImageField(
                        upload_to=upload_location, # upload_location here is a function which will return a file path to store the image
                        height_field="height_field",
                        width_field="width_field",
                        null=True,
                        blank=True)
    # height_field & width_field is for setting image size
    height_field    = models.IntegerField(default=0)
    width_field     = models.IntegerField(default=0)
    created         = models.DateTimeField(auto_now=False, auto_now_add=True)
    updated         = models.DateTimeField(auto_now=True, auto_now_add=False)

    def __str__(self):
        return self.name

    class Meta:
        ordering=["-created"]
