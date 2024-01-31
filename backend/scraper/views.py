from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status

from main.views import BaseAuthView
from scraper.models import ScrapedVideo, ScrapeRun
# from scraper.youtube import YoutubeScraper

from datetime import datetime


class ScrapeView(BaseAuthView, generics.CreateAPIView):

    def post(self, request, *args, **kwargs):

        data = request.data
        keyword = data['keyword']
        yt = YoutubeScraper()
        videos = yt.scrape(keyword)

        sr = ScrapeRun.objects.create(date_run=datetime.now())
        for video in videos:
            sv = ScrapedVideo.objects.create(
                scrape_run=sr,
                url=video['url'],
                title=video['title']
                )
        return Response(videos, status=status.HTTP_201_CREATED)
