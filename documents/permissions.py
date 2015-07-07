# from rest_framework import permissions


# class IsOwnerOfDocument(permissions.BasePermission):
#     def has_object_permission(self, request, view, document):
#         if request.user:
#             return document.owner == request.user
#         return False