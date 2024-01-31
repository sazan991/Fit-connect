from django.urls import path, re_path, include
from rest_framework import routers

# from scraper.views import ScrapeView
# 
urlpatterns = [
	path('scrape/', ScrapeView.as_view(), name='Scrape'),
	]
