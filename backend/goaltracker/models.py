from django.db import models
from main.models import BaseModel


class Goal(BaseModel):
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=255, blank=True)
    type = models.CharField(max_length=255)
    time_duration = models.FloatField()
    is_completed = models.BooleanField(default=False)
    status = models.CharField(default='pending', choices=[('pending', 'Pending'), ('started', 'Started'), ('running', 'Running'), ('failed', 'Failed'), ('quit', 'Quit'), ('completed', 'Completed')])
    date_start = models.DateTimeField()
    date_completed = models.DateTimeField(null=True)
    notes = models.JSONField(default=dict, null=True)
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.name
