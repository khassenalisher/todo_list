from rest_framework import serializers
from api.models import TaskList, Task

class TaskListSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(required=True)

    def create(self, validated_data):
        taskList = TaskList(**validated_data)
        taskList.save()
        return taskList

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.save()
        return instance
    

class TaskShortSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ('id', 'name', 'status')    

class TaskSerializer2(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'
        extra_kwargs = {
            'created_at': {'allow_null': True, 'required': False}, 
            'due_on': {'allow_null': True, 'required': False},
        }

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'
        extra_kwargs = {
            'created_at': {'allow_null': True, 'required': False}, 
            'name': {'allow_null': True, 'required': False},
            'status': {'allow_null': True, 'required': False},
            'due_on': {'allow_null': True, 'required': False},
            'task_list': {'allow_null': True, 'required': False}
        }

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.status = validated_data.get('status', instance.status)
        # instance.created_at = validated_data.get('status', instance.created_at)
        instance.save()
        return instance