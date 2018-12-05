# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.http.response import HttpResponse
from django.template import Context, loader

from django.shortcuts import render
import json
from random import randint
# Create your views here.


def main_view(request):
    t = loader.get_template('index.html')
    return HttpResponse(t.render())


def get_try(request):
    variant = randint(1, 3)

    if variant == 1:
        return HttpResponse(json.dumps({'variant': 'rock'}), status=200)
    elif variant == 2:
        return HttpResponse(json.dumps({'variant': 'paper'}), status=200)
    elif variant == 3:
        return HttpResponse(json.dumps({'variant': 'scissors'}), status=200)

    return HttpResponse(json.dumps({'variant': 'None'}), status=400)

