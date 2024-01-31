from rest_framework.viewsets import ModelViewSet
from rest_framework_simplejwt.authentication import JWTAuthentication


class BaseAuthModelViewSet(ModelViewSet):
	authentication_classes = [JWTAuthentication]

class BaseAuthView():
	authentication_classes = [JWTAuthentication]