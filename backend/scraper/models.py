from django.db import models
from main.models import BaseModel


class ScrapeRun(BaseModel):
    date_run = models.DateTimeField()

class ScrapedVideo(BaseModel):
    scrape_run = models.ForeignKey(ScrapeRun, on_delete=models.CASCADE)
    url = models.TextField()
    thumbnail_url = models.TextField()
    title = models.CharField(max_length=255)
    date_scraped = models.DateTimeField(auto_now_add=True)
