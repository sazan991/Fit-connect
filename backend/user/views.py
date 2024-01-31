from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
# from drf_yasg.utils import swagger_auto_schema
# from drf_yasg import openapi

from main.helpers.mailer import send_email
from user.serializers import RegisterSerializer, UserSerializer
from user.models import User


class RegisterViewSet(APIView):

    permission_classes = [AllowAny]
    authentication_classes = []


    def post(self, request):
        data = request.data
        serializer = RegisterSerializer(data=data)
        
        if serializer.is_valid():

            user = User.objects.create(**serializer.data)
            user.set_password(serializer.data['password'])
            user.is_active = True
            user.save()
            data = serializer.data
            data['id'] = user.id
            send_email(user.email, user.first_name)
            return Response(data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.filter()
    authentication_classes = [JWTAuthentication]

    def get_serializer_class(self):
        serializer_mapping = {
            # 'POST': ProfileCreateSerializer,
            # 'PATCH': ProfilePatchSerializer,
            'GET': UserSerializer
        }
        method = self.request.method
        return serializer_mapping.get(method, UserSerializer)


