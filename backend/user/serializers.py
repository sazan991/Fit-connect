from rest_framework import serializers
from rest_framework import validators

from user.models import User


class RegisterSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True, validators=[
        validators.UniqueValidator(queryset=User.objects.all())
        ]
    )
    password = serializers.CharField(required=True)
    first_name = serializers.CharField(required=False)
    last_name = serializers.CharField(required=False)
    phone = serializers.CharField(required=False)
    address = serializers.CharField(required=False)
    level = serializers.CharField(required=True) #ToDo:  Add validation of limited choices


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = (
            'email', 'first_name', 'last_name',
            'phone', 'address', 'level', 'date_joined',
            'is_superuser', 
            )


