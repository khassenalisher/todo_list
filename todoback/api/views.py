from django.shortcuts import render
from django.http import JsonResponse
from api.models import Task, TaskList

def task_lists(request):
    task_lists = TaskList.objects.all()
    json_task_lists = [tl.to_json() for tl in task_lists]
    return JsonResponse(json_task_lists, safe=False)

def task_list(request, pk):
    try:
        task_list = TaskList.objects.get(id=pk)
    except TaskList.DoesNotExist as e:
        return JsonResponse({'error': str(e)}, safe=False)
    
    return JsonResponse(task_list.to_json())

def task_list_tasks(request, pk):
    try:
        task_list = TaskList.objects.get(id=pk)
    except TaskList.DoesNotExist as e:
        return JsonResponse({'error': str(e)}, safe=False)
    
    tasks = task_list.task_set.all()
    json_tasks = [t.to_json() for t in tasks]
    return JsonResponse(json_tasks, safe=False)

def task(request, pk):
    try:
        task = Task.objects.get(id=pk)
    except Task.DoesNotExist as e:
        return JsonResponse({'error': str(e)}, safe=False)
    
    return JsonResponse(task.to_json_detail())