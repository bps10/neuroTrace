# -*- coding: utf-8 *-*
from django.conf.urls import patterns, include, url

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
#from NeitzModel import settings
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    url(r'^$', 'neuroTrace.views.viewer', name='viewer'),
    url(r'^upload/', 'neuroTrace.views.upload', name='upload'),
    #url(r'^list/', 'neuroTrace.views.list', name='list'),
    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),
    # Uncomment the next line to enable the admin:
    url(r'^admin/', include(admin.site.urls)),
)

