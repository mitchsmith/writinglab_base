from django.conf.urls import patterns, url, include
from django.contrib import admin
from writinglab.views import IndexView, FacebookLogin
#from rest_framework_nested import routers
# from authentication.views import AccountViewSet, LoginView, LogoutView
from posts.views import AccountPostsViewSet, PostViewSet
from documents.views import AccountDocumentsViewSet, DocumentViewSet

#router = routers.SimpleRouter()
# router.register(r'accounts', AccountViewSet)
# router.register(r'posts', PostViewSet)
# router.register(r'documents', DocumentViewSet)

# accounts_router = routers.NestedSimpleRouter(
#     router, r'accounts', lookup='account'
# )
# accounts_router.register(r'posts', AccountPostsViewSet)
# accounts_router.register(r'documents', AccountDocumentsViewSet)

urlpatterns = patterns(
    '',
    url(r'^accounts/', include('allauth.urls')),
    url(r'^api/v1/accounts/', include('rest_auth.urls')),
    url(r'^api/v1/accounts/registration/', include('rest_auth.registration.urls')),
    url(r'^api/v1/accounts/facebook/$', FacebookLogin.as_view(), name='fb_login'),
    url(r'^api/v1/accounts/user/posts/', AccountPostsViewSet),
    url(r'^api/v1/accounts/user/documents/', AccountDocumentsViewSet),
    url(r'^api/v1/accounts/posts/', PostViewSet),
    url(r'^api/v1/accounts/documents/', DocumentViewSet),

    # url(r'^api/v1/', include(router.urls)),
    url(r'^admin/', include(admin.site.urls)),
    url('^.*$', IndexView.as_view(), name='index'),
    # url(r'^api/v1/', include(accounts_router.urls)),
    # url(r'^api/v1/auth/login/$', LoginView.as_view(), name='login'),
    # url(r'^api/v1/auth/logout/$', LogoutView.as_view(), name='logout'),
)

#####  rest-auth urls for reference ###########################################
    # # URLs that do not require a session or valid token
    # url(r'^password/reset/$', PasswordReset.as_view(),
    #     name='rest_password_reset'),
    # url(r'^password/reset/confirm/$', PasswordResetConfirm.as_view(),
    #     name='rest_password_reset_confirm'),
    # url(r'^login/$', Login.as_view(), name='rest_login'),
    # # URLs that require a user to be logged in with a valid session / token.
    # url(r'^logout/$', Logout.as_view(), name='rest_logout'),
    # url(r'^user/$', UserDetails.as_view(), name='rest_user_details'),
    # url(r'^password/change/$', PasswordChange.as_view(),
    #     name='rest_password_change'),
