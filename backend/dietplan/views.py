from rest_framework import viewsets
from main.views import BaseAuthModelViewSet

from dietplan.models import DietPlan, PredefinedDietPlan
from dietplan.serializers import PredefinedDietPlanSerializer, DietPlanSerializer

class PredefinedDietPlanViewSet(BaseAuthModelViewSet):
	queryset = PredefinedDietPlan.objects.all()
	serializer_class = PredefinedDietPlanSerializer

class DietPlanViewSet(BaseAuthModelViewSet):
	queryset = DietPlan.objects.all()
	serializer_class = DietPlanSerializer
