from django.db import models
from django.core.files.storage import FileSystemStorage
from django.contrib.sites.shortcuts import get_current_site
from autoslug import AutoSlugField
from authentication.models import Account
import datetime
import re


def get_populate_from(instance):
    p = re.compile('^([./].*/)?([^/]+)(\.\w{3})$')
    return p.match(instance.original_filename).group(2)

def get_uploaded_filename(instance, filename):
    if not instance.original_filename:
        instance.original_filename = filename
    slug = get_populate_from(instance)
    return "uploads/%s/%s.odt" % (instance.owner.username, slug)


class Document(models.Model):
    owner             = models.ForeignKey(Account, related_name='parent_owner', help_text='The author of this resoponse')
    original_filename = models.CharField('original filename', max_length=255, blank=True, null=True)
    slug              = AutoSlugField(populate_from=get_populate_from, unique_with='owner__username')
    odtfile           = models.FileField(upload_to=get_uploaded_filename)
    created_at        = models.DateTimeField('Created', auto_now_add=True)
    updated_at        = models.DateTimeField('Modified', auto_now=True)


    class Meta:
        ordering = ['owner', 'original_filename', 'updated_at']

    def __repr__ (self):
        return '<Document %s>' % self.original_filename

    def __str__ (self):
        return '{0}'.format(self.original_filename)