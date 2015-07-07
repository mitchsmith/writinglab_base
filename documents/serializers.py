# from rest_framework import serializers
# from authentication.serializers import AccountSerializer
# from documents.models import Document


# class DocumentSerializer(serializers.ModelSerializer):
#     """
#     Serialize a document instance, along with its nested account relation via owner.
#     Setting AccountSerializer to read_only=True prevents updating it with the document.  
#     """
#     owner = AccountSerializer(read_only=True, required=False)
#     # odtfile = serializers.FileField()

#     class Meta:
#         model = Document

#         fields = ('id', 'owner', 'original_filename', 'odtfile', 'created_at', 'updated_at')
#         read_only_fields = ('id', 'slug', 'created_at', 'updated_at')

#     def get_validation_exclusions(self, *args, **kwargs):
#         """
#         Add nested relation to owner to the list of validation exclusions.
#         """
#         exclusions = super(DocumentSerializer, self).get_validation_exclusions()

#         return exclusions + ['owner']

#     def create(self, attrs, instance=None):
#         #assert instance is None, 'Cannot update documents with DocumentsSerializer'

#         (document_object, created) = Document.objects.get_or_create(
#             owner=attrs.get('owner'),
#             original_filename = attrs.get('original_filename')
#         )

#         # You can extend here to work on `document_object` as required - update etc.

#         return document_object