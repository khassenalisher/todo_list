from django.contrib import admin
from api.models import Task, TaskList

admin.site.register(TaskList)
admin.site.register(Task)