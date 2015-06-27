# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings
import autoslug.fields
import documents.models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Document',
            fields=[
                ('id', models.AutoField(verbose_name='ID', auto_created=True, primary_key=True, serialize=False)),
                ('original_filename', models.CharField(blank=True, verbose_name='original filename', max_length=255, null=True)),
                ('slug', autoslug.fields.AutoSlugField(editable=False, populate_from=documents.models.get_populate_from, unique_with=('owner__username',))),
                ('odtfile', models.FileField(upload_to=documents.models.get_uploaded_filename)),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Created')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='Modified')),
                ('owner', models.ForeignKey(help_text='The author of this resoponse', to=settings.AUTH_USER_MODEL, related_name='parent_owner')),
            ],
            options={
                'ordering': ['owner', 'original_filename', 'updated_at'],
            },
            bases=(models.Model,),
        ),
    ]
