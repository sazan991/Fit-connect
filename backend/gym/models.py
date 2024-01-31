from django.db import models
from main.models import BaseModel


class Gym(BaseModel):
    name = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    notes = models.JSONField(null=True, blank=True, default=dict)
