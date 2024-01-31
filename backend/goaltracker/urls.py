from django.urls import path, re_path, include
from rest_framework import routers

from goaltracker.views import GoalCreateView, GoalPatchView, GoalDetailView, \
GoalStepCreateView, GoalStepListView, GoalStepPatchView, GoalListView

urlpatterns = [
	path('', GoalCreateView.as_view(), name='goal-create'),
	path('list', GoalListView.as_view(), name='goal-list'),
	path('<int:pk>/', GoalPatchView.as_view(), name='goal-update'),
	path('detail/<int:pk>/', GoalDetailView.as_view(), name='goal-detail'),
	path('<int:goal_id>/step/', GoalStepCreateView.as_view(), name='goal-step-create'),
	path('<int:goal_id>/steps/', GoalStepListView.as_view(), name='goal-step-list'),
	path('<int:goal_id>/step/<int:pk>', GoalStepPatchView.as_view(), name='goal-step-update'),
]
