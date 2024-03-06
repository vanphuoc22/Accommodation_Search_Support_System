"""
URL configuration for ASSS project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from ASSSs.admin import admin_site
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
    openapi.Info(
        title="Accommodation_Search_Support_System API",
        default_version='v1',
        description="APIs for Accommodation_Search_Support_System",
        contact=openapi.Contact(email="trinhbaoduy.26012019@gmail.com"),
        license=openapi.License(name="OWen @2023"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),

)
urlpatterns = [
    path('', include('ASSSs.urls')),
    path('admin/', admin_site.urls),
    path('o/', include('oauth2_provider.urls',
                       namespace='oauth2_provider')),
    path("__debug__/", include("debug_toolbar.urls")),
    re_path(r'^swagger(?P<format>\.json|\.yaml)$',
            schema_view.without_ui(cache_timeout=0),
            name='schema-json'),
    re_path(r'^swagger/$',
            schema_view.with_ui('swagger', cache_timeout=0),
            name='schema-swagger-ui'),
    re_path(r'^redoc/$',
            schema_view.with_ui('redoc', cache_timeout=0),
            name='schema-redoc')
]
urlpatterns += [
    path('admin/ASSS-stats/', admin_site.stats_view, name='stats_view'),
]
