from rest_framework import generics

from main.views import BaseAuthModelViewSet, BaseAuthView

from gym.serializers import GymSerializer
from gym.models import Gym

import os
import googlemaps



class GymViewSet(BaseAuthModelViewSet):
    serializer_class = GymSerializer
    queryset = Gym.objects.filter()


class NearbyGymView(BaseAuthView, generics.ListAPIView):
	serializer_class = GymSerializer
	
	def get_queryset(self):
		location = self.request.query_params.get('location')
		print(location)


		gmaps = googlemaps.Client(key=os.environ.get('GOOGLE_API_KEY'))
		geocode = gmaps.geocode(location)
		print(geocode)

		location = geocode[0]['geometry']['location']
		lat = location['lat']
		lon = location['lng']

		places = gmaps.places_nearby(
			location=(lat,lon),
			radius=500,
			keyword='gym',
			type='gym'
			)
		
		print(places)
		gyms = [place for place in places['results']]
		gym_objects = []
		for gym in gyms:
			_gym, _ = Gym.objects.get_or_create(
					name=gym['name'],
					defaults={
						'notes': gym
					}
				)
			gym_objects.append(_gym.name)

		return Gym.objects.filter(name__in=gym_objects)

