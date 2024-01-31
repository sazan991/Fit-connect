from django.urls import path, re_path, include
from rest_framework import routers

from gym.views import GymViewSet, NearbyGymView

router = routers.DefaultRouter()
router.register(
        r'',
        GymViewSet,
        basename='gym'
    )

urlpatterns = [
	path('nearby/', NearbyGymView.as_view(), name='nearby-gym'),
	path('', include(router.urls)),
	
]