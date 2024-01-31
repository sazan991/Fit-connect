from django.contrib import admin
from dietplan.models import PredefinedDietPlan, DietPlan


class PredefinedDietPlanAdmin(admin.ModelAdmin):
    pass

admin.site.register(PredefinedDietPlan, PredefinedDietPlanAdmin)



class DietPlanAdmin(admin.ModelAdmin):
    pass

admin.site.register(DietPlan, DietPlanAdmin)

