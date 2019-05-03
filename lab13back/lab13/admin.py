from django.contrib import admin
from lab13.models import Task, TaskList
admin.site.register(Task)


@admin.register(TaskList)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'created_by',)
