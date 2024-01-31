from django.urls import path, include
from rest_framework import routers
from rest_framework_simplejwt.views import TokenObtainPairView

from user.views import RegisterViewSet, UserViewSet

router = routers.DefaultRouter()
router.register(
        r'',
        UserViewSet,
        basename='users'
    )

urlpatterns = [
	path('token/', TokenObtainPairView.as_view(), name='login'),
	path('register/', RegisterViewSet.as_view(), name='register'),

	path('', include(router.urls))
]
