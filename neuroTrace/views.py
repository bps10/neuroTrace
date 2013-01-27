# Create your views here.
from django.template import RequestContext, loader
from django.http import HttpResponse

from viewer.models import neuronInfo


def index(request):
    neuron_list = neuronInfo.objects.all()
    t = loader.get_template('viewer/index.html')
    #neuronData = neuron_list['data']
    if request.method == 'GET':

        c = RequestContext(request, {
            'neuron_list': neuron_list})

    return HttpResponse(t.render(c))


