from rest_framework import serializers
from goaltracker.models import Goal


class GoalSerializer(serializers.ModelSerializer):
	#date_completed = serializers.DateTimeField(required=False,allow_null=True)
	class Meta:
		model = Goal
		fields = '__all__'


class GoalDetailSerializer(GoalSerializer):
	pass


class GoalStepSerializer(serializers.ModelSerializer):
	class Meta:
		model = Goal
		fields = '__all__'

class GoalStepDetailSerializer(GoalStepSerializer):
	pass

