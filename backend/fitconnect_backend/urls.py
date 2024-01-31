from django.contrib import admin
from django.urls import path, include

from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi


schema_view = get_schema_view(
   openapi.Info(
      title="FitConnect API",
      default_version='v1',
      description="FitConnect API Documentation",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="ab@gmail.com"),
      license=openapi.License(name="GNU License"),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
   authentication_classes=(),
)

urlpatterns = [
    path("admin/", admin.site.urls),


    path('api/v1/dietplan/', include('dietplan.urls')),
    path('api/v1/gym/', include('gym.urls')),
    path('api/v1/goal/', include('goaltracker.urls')),
    path('api/v1/scraper/', include('scraper.urls')),
    path('api/v1/user/', include('user.urls')),
    path('api/v1/video/', include('video.urls')),

    # Swagger docs
    path('swagger<format>/', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('docs/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),

]
