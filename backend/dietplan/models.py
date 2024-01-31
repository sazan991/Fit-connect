from django.db import models
from main.models import BaseModel

from goaltracker.models import Goal


class PredefinedDietPlan(BaseModel):
    type = models.CharField(max_length=255)
    difficulty_level = models.CharField(choices=[('easy', 'Easy'), ('medium', 'Medium'), ('pro', 'Pro')])
    daily_calorie_consumption = models.IntegerField()

    def __str__(self):
        return self.type

class DietPlan(BaseModel):
    goal = models.ForeignKey(Goal, on_delete=models.CASCADE)
    template = models.ForeignKey(PredefinedDietPlan, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    target_calorie = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.id} : {self.name}"

