# -*- coding: utf-8 *-*
from django.db import models
from neuroTrace import settings


class neuronInfo(models.Model):

    neuron_name = models.CharField(max_length=100)
    date_recorded = models.DateField()
    NEURON_TYPE = (('onG', 'on ganglion'),
                    ('offG', 'off ganglion'), )
    data = models.FileField(upload_to=settings.MEDIA_ROOT)
    neuron_type = models.CharField(max_length=4, choices=NEURON_TYPE)
    description = models.CharField(max_length=10000)
    additional_notes = models.CharField(max_length=10000)
