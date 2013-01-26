# Create your views here.
from django.template import RequestContext, loader
from django.http import HttpResponse
#from django.utils import simplejson


def index(request):

    t = loader.get_template('index.html')
    if request.method == 'GET':

        c = RequestContext(request, {})

    return HttpResponse(t.render(c))
