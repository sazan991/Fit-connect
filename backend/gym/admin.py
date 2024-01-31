from django.contrib import admin
from gym.models import Gym


class GymAdmin(admin.ModelAdmin):
    pass

admin.site.register(Gym, GymAdmin)
