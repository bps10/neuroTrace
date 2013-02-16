# Create your views here.
from django.template import RequestContext, loader
from django.http import HttpResponse
from django.core.urlresolvers import reverse
from django.http import HttpResponseRedirect
from django.shortcuts import render_to_response

from uploader.forms import DocumentForm
from uploader.models import Document


from viewer.models import neuronInfo


def viewer(request):
    neuron_list = neuronInfo.objects.all()
    print neuron_list  # ['neuron_name']
    t = loader.get_template('viewer/index.html')
    #neuronData = neuron_list['data']
    if request.method == 'GET':

        c = RequestContext(request, {
            'neuron_list': neuron_list,
            'neuron_data': range(0, 1000),
            })

    return HttpResponse(t.render(c))


def upload(request):
    # Handle file upload
    if request.method == 'POST':
        form = DocumentForm(request.POST, request.FILES)
        if form.is_valid():
            newdoc = Document(docfile=request.FILES['docfile'])
            newdoc.save()

            # Redirect to the document list after POST
            return HttpResponseRedirect(reverse('neuroTrace.views.upload'))
    else:
        form = DocumentForm()  # A empty, unbound form

    # Load documents for the list page
    documents = Document.objects.all()

    # Render list page with the documents and the form
    return render_to_response(
        'uploader/uploader.html',
        {'documents': documents, 'form': form},
        context_instance=RequestContext(request)
    )


'''
def upload(request):

    neuron_list = neuronInfo.objects.all()
    print neuron_list
    if request.method == 'POST':
        t = loader.get_template('uploader/submitted.html')
        neuron_name = request.POST['neuron_name']
        date_recorded = request.POST['date_recorded']
        filePATH = request.POST['file']
        neuron_type = request.POST['neuron_type']
        meta1 = request.POST['MetaData1']
        meta2 = request.POST['MetaData2']
        meta3 = request.POST['MetaData3']
        meta4 = request.POST['MetaData4']
        metaVal1 = request.POST['MetaDataVal1']
        metaVal2 = request.POST['MetaDataVal2']
        metaVal3 = request.POST['MetaDataVal3']
        metaVal4 = request.POST['MetaDataVal4']
        description = request.POST['description']
        additional_notes = request.POST['additional_notes']

        obj = neuronInfo(
            neuron_name=neuron_name,
            date_recorded=date_recorded,
            neuron_type=neuron_type,
            data=filePATH,
            meta1=meta1,
            meta2=meta2,
            meta3=meta3,
            meta4=meta4,
            metaVal1=metaVal1,
            metaVal2=metaVal2,
            metaVal3=metaVal3,
            metaVal4=metaVal4,
            description=description,
            additional_notes=additional_notes)
        obj.save()

    if request.method == 'GET':
        t = loader.get_template('uploader/uploader.html')
        c = RequestContext(request, {})

    return HttpResponse(t.render(c))
'''
