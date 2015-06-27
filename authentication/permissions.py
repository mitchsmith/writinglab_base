from rest_framework import permissions

class IsAccountOwner(permissions.BasePermission):
    """
    Permissions for authenticated customer.
    """
    def has_object_permission(self, request, view, account):
        if request.user:
            return account == request.user
        return False