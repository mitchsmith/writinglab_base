# from rest_framework import permissions, viewsets
# from rest_framework.response import Response
# from documents.models import Document
# from documents.permissions import IsOwnerOfDocument
# from documents.serializers import DocumentSerializer


# class DocumentViewSet(viewsets.ModelViewSet):
#     """
#     Views for listing, creating, retrieving, updating and destroying arbitrary documents.
#     """
#     queryset = Document.objects.order_by('-created_at')
#     serializer_class = DocumentSerializer

#     def get_permissions(self):
#         if self.request.method in permissions.SAFE_METHODS:
#             return (permissions.AllowAny(),)
#         return (permissions.IsAuthenticated(), IsOwnerOfDocument(),)

#     def pre_save(self, obj):
#         obj.odtfile = self.request.FILES.get('file')

#     def perform_create(self, serializer):
#         instance = serializer.save(owner=self.request.user)

#         return super(DocumentViewSet, self).perform_create(serializer)


# class AccountDocumentsViewSet(viewsets.ViewSet):
#     """
#     Views for listing, and otherwise dealing with documents associated with a given account.
#     """
#     queryset = Document.objects.select_related('owner').all()
#     serializer_class = DocumentSerializer

#     def list(self, request, account_username=None):
#         queryset = self.queryset.filter(owner__username=account_username)
#         serializer = self.serializer_class(queryset, many=True)

#         return Response(serializer.data)