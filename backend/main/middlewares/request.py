from django.utils.deprecation import MiddlewareMixin
from threading import current_thread


class UserMiddleware(MiddlewareMixin):
	def process_request(self, request):
		setattr(current_thread(), 'request', request)



