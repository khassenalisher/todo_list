import json
from django.shortcuts import render
from django.http import JsonResponse
from api.models import Task, TaskList
from api.serializers import TaskListSerializer, TaskSerializer, TaskShortSerializer, TaskSerializer2
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def task_lists(request):
    if request.method == 'GET':
        task_lists = TaskList.objects.all()
        json_task_lists = [tl.to_json() for tl in task_lists]
        return JsonResponse(json_task_lists, safe=False, status=200)

    elif request.method == 'POST':
        data = json.loads(request.body)
        print(request)
        print(request.body)
        serializer = TaskListSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data,status=201)

        return JsonResponse(serializer.errors)

@csrf_exempt
def task_list(request, pk):
    try:
        task_list = TaskList.objects.get(id=pk)
    except TaskList.DoesNotExist as e:
        return JsonResponse({'error': str(e)}, safe=False)
    
    if request.method == 'GET':
        serializer = TaskListSerializer(task_list)
        return JsonResponse(serializer.data)
    elif request.method == 'PUT':
        data = json.loads(request.body)
        serializer = TaskListSerializer(instance=task_list,data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=200)
        return JsonResponse(serializer.errors)
    elif request.method == 'DELETE':
        task_list.delete()
        return JsonResponse({}, status=204)

@csrf_exempt
def task_list_tasks(request, pk):
    try:
        task_list = TaskList.objects.get(id=pk)
    except TaskList.DoesNotExist as e:
        return JsonResponse({'error': str(e)}, safe=False)
    if request.method == 'GET':
        tasks = task_list.task_set.all()
        serializer = TaskShortSerializer(tasks, many=True)
        return JsonResponse(serializer.data, safe=False)
    return JsonResponse(serializer.errors)

@csrf_exempt
def tasks(request): 
    if request.method == 'GET':
        tasks = Task.objects.all()
        serializer = TaskSerializer2(tasks, many=True)
        return JsonResponse(serializer.data, safe=False, status=200)
    elif request.method == 'POST':
        data = json.loads(request.body)
        serializer = TaskSerailizer2(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data,status=201)
        return JsonResponse(serializer.errors)

@csrf_exempt
def task(request, pk):
    try:
        task = Task.objects.get(id=pk)
    except Task.DoesNotExist as e:
        return JsonResponse({'error': str(e)}, safe=False)
    
    if request.method == 'GET':
        serializer = TaskSerializer(task)
        return JsonResponse(serializer.data)
    elif request.method == 'PUT':
        data = json.loads(request.body)
        serializer = TaskSerializer(instance=task,data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=200)
        return JsonResponse(serializer.errors)
    elif request.method == 'DELETE':
        task.delete()
        return JsonResponse({}, status=204)