from django.conf.urls import patterns, url, include
from django.contrib import admin
from writinglab.views import IndexView, FacebookLogin
from rest_framework_nested import routers
# from authentication.views import AccountViewSet, LoginView, LogoutView
# from posts.views import AccountPostsViewSet, PostViewSet
# from documents.views import AccountDocumentsViewSet, DocumentViewSet

# router = routers.SimpleRouter()
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
    url(r'^rest-auth/', include('rest_auth.urls')),
    url(r'^rest-auth/registration/', include('rest_auth.registration.urls')),
    url(r'^rest-auth/facebook/$', FacebookLogin.as_view(), name='fb_login'),
    # url(r'^api/v1/', include(router.urls)),
    url(r'^admin/', include(admin.site.urls)),
    url('^.*$', IndexView.as_view(), name='index'),
    # url(r'^api/v1/', include(accounts_router.urls)),
    # url(r'^api/v1/auth/login/$', LoginView.as_view(), name='login'),
    # url(r'^api/v1/auth/logout/$', LogoutView.as_view(), name='logout'),
)
