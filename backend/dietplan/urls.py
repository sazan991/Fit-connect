from django.urls import path, re_path, include
from rest_framework import routers

from dietplan.views import PredefinedDietPlanViewSet, DietPlanViewSet

router = routers.DefaultRouter()
router.register(
        r'predefined',
        PredefinedDietPlanViewSet,
        basename='predefined-dietplan'
    )

router.register(
        r'',
        DietPlanViewSet,
        basename='dietplan'
    )

urlpatterns = [
	path('', include(router.urls)),
	
]