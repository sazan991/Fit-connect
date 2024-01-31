from rest_framework import generics
from rest_framework.response import Response

from main.views import BaseAuthView
from goaltracker.models import Goal
from goaltracker.serializers import *

class GoalCreateView(BaseAuthView, generics.CreateAPIView):
	serializer_class = GoalSerializer
	queryset = Goal.objects.all()


class GoalListView(BaseAuthView, generics.ListAPIView):
	serializer_class = GoalSerializer
	queryset = Goal.objects.all()

class GoalPatchView(BaseAuthView, generics.UpdateAPIView):
	serializer_class = GoalSerializer
	queryset = Goal.objects.all()


class GoalDetailView(BaseAuthView, generics.RetrieveAPIView):
	serializer_class = GoalDetailSerializer
	queryset = Goal.objects.all()


class GoalStepCreateView(BaseAuthView, generics.CreateAPIView):
	serializer_class = GoalStepSerializer
	
	def get_queryset(self):
		goal_id = self.kwargs['goal_id']
		return Goal.objects.filter(pk=goal_id)

	def perform_create(self, serializer):
		goal_id = self.kwargs['goal_id']
		goal = Goal.objects.get(pk=goal_id)
		serializer.save(parent=goal)


class GoalStepListView(BaseAuthView, generics.ListAPIView):
	serializer_class = GoalStepSerializer
	def get_queryset(self):
		goal_id = self.kwargs['goal_id']
		return Goal.objects.filter(parent_id=goal_id)



class GoalStepPatchView(BaseAuthView, generics.UpdateAPIView):
	queryset = Goal.objects.all()
	serializer_class = GoalStepDetailSerializer

