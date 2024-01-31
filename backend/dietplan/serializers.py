from rest_framework import serializers
from dietplan.models import DietPlan, PredefinedDietPlan


class PredefinedDietPlanSerializer(serializers.ModelSerializer):
	class Meta:
		model = PredefinedDietPlan
		fields = '__all__'


class DietPlanSerializer(serializers.ModelSerializer):
	template = PredefinedDietPlanSerializer(read_only=True)
	template_id = serializers.PrimaryKeyRelatedField(
			queryset=PredefinedDietPlan.objects.all(),
			source='template',
			write_only=True
		)

	class Meta:
		model = DietPlan
		fields = [
			'id', 'goal', 'template', 'template_id',
			'name', 'target_calorie'
		]
