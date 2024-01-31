from django.contrib import admin
from goaltracker.models import Goal


class GoalAdmin(admin.ModelAdmin):
    pass

admin.site.register(Goal, GoalAdmin)
