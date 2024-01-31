from django.contrib import admin
from scraper.models import ScrapeRun, ScrapedVideo


class ScrapedVideoAdmin(admin.ModelAdmin):
    pass

admin.site.register(ScrapedVideo, ScrapedVideoAdmin)

class ScrapeRunAdmin(admin.ModelAdmin):
    pass

admin.site.register(ScrapeRun, ScrapeRunAdmin)
