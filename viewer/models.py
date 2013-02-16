# -*- coding: utf-8 *-*
from django.db import models
#from neuroTrace import settings


class neuronInfo(models.Model):

    neuron_name = models.CharField(max_length=100)
    #data = models.FileField(upload_to='documents/%Y/%m/%d')
    date_recorded = models.DateField()
    NEURON_TYPE = (('onG', 'on ganglion'),
                    ('offG', 'off ganglion'),
                    ('spi', 'spider cell'), )
    #data = models.FileField(upload_to=settings.MEDIA_ROOT)
    neuron_type = models.CharField(max_length=4, choices=NEURON_TYPE)
    meta1 = models.CharField(max_length=100)
    meta2 = models.CharField(max_length=100)
    meta3 = models.CharField(max_length=100)
    meta4 = models.CharField(max_length=100)
    metaVal1 = models.CharField(max_length=100)
    metaVal2 = models.CharField(max_length=100)
    metaVal3 = models.CharField(max_length=100)
    metaVal4 = models.CharField(max_length=100)
    description = models.CharField(max_length=10000)
    additional_notes = models.CharField(max_length=10000)
