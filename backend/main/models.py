from django.db import models
from django.db.models.signals import pre_save
from django.dispatch import receiver
from user.models import User
from threading import current_thread


class BaseModel(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, null=True, on_delete=models.SET_NULL)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


@receiver(pre_save)
def set_user_before_save(sender, instance, **kwargs):
	if issubclass(sender, BaseModel):
		request = getattr(current_thread(), 'request', None)
		if request:
			instance.user = request.user
		