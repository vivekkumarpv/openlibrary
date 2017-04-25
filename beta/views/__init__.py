#!/usr/bin/env pythonNone
#-*-coding: utf-8 -*-

"""
    __init__.py
    ~~~~~~~~~~~


    :copyright: (c) 2016 by Anonymous
    :license: BSD, see LICENSE for more details.
"""

from flask import render_template, request
from flask.views import MethodView

class Base(MethodView):
    def get(self, uri=None):
        template = uri or "home"
        return render_template('base.html', template=template)

class WorkEdition(MethodView):
    def get(self, id=None):
        status = request.args.get('status', 'read')
        return render_template('base.html', template='book', status=status)

class Search(MethodView):
    def get(self, uri=None):
        facet = request.args.get('facet', 'books')
        return render_template('base.html', template='search', facet=facet)

class Partial(MethodView):
    def get(self, partial):
        return render_template('partials/%s.html' % partial)
