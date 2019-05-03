import json
from django.shortcuts import render
from lab13.models import Task, TaskList
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from lab13.serializers import TaskListSerializer, TaskSerializer


@csrf_exempt
def task_lists(request):
    if(request.method == 'GET'):
        task_lists = TaskList.objects.all()
        serializer = TaskListSerializer(task_lists, many=True)
        print(serializer)
        return JsonResponse(serializer.data, safe=False, status=200)

    if(request.method == 'POST'):
        data = json.loads(request.body)
        serializer = TaskListSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse({'eroor': 'eroor'})


@csrf_exempt
def task_list(request, pk):
    try:
        task_list = TaskList.objects.get(id=pk)
    except TaskList.DoesNotExist as e:
        return JsonResponse({'error': str(e)})

    if request.method == 'GET':
        serializer = TaskListSerializer(task_list)
        return JsonResponse(serializer.data)
    if request.method == 'PUT':
        data = json.loads(request.body)
        serializer = TaskListSerializer(instance=task_list, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=200)
        return JsonResponse(serializer.errors)
    if request.method == 'DELETE':
        task_list.delete()
        return JsonResponse({}, status=204)
    return JsonResponse({'message': 'No such method'}, status=204)


@csrf_exempt
def tasks_of_task_list(request, pk):
    try:
        task_list = TaskList.objects.get(id=pk)
    except TaskList.DoesNotExist as e:
        return JsonResponse({'error': str(e)})

    if request.method == 'GET':
        tasks = task_list.task_set.all()
        serializer = TaskSerializer(tasks, many=True)
        return JsonResponse(serializer.data, safe=False, status=200)

    if request.method == 'POST':
        data = json.loads(request.body)
        serializer = TaskSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors)


@csrf_exempt
def task(request, pk):
    try:
        task = Task.objects.get(id=pk)
    except Task.DoesNotExist as e:
        return JsonResponse({'error': str(e)})

    if request.method == 'GET':
        serializer = TaskSerializer(task)
        return JsonResponse(serializer.data, status=200)
    if request.method == 'PUT':
        data = json.loads(request.body)
        serializer = TaskSerializer(instance=task, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
    if request.method == 'DELETE':
        task.delete()
        return JsonResponse({}, status=204)
