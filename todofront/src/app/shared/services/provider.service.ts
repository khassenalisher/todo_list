import { Injectable } from "@angular/core";
import { MainService } from "./main.service";
import { HttpClient } from "@angular/common/http";
import { ITask, ITaskDetail } from "../interfaces/task.interface";
import { ITaskList } from "../interfaces/taskList.interface";

@Injectable({
  providedIn: "root"
})
export class ProviderService extends MainService {
  constructor(http: HttpClient) {
    super(http);
  }

  getTaskLists(): Promise<ITaskList[]> {
    return this.get("http://127.0.0.1:8000/api/task_lists/", {});
  }

  createTaskList(name: any): Promise<ITaskList> {
    return this.post("http://127.0.0.1:8000/api/task_lists/", {
      name: name
    });
  }

  updateTaskList(taskList: ITaskList) {
    return this.put(
      "http://127.0.0.1:8000/api/task_lists/" + taskList.id + "/",
      {
        name: taskList.name
      }
    );
  }
  deleteTaskList(id: number): Promise<any> {
    return this.delet("http://127.0.0.1:8000/api/task_lists/" + id + "/", {});
  }
  getTaskListTasks(id: number): Promise<ITask[]> {
    return this.get(
      "http://127.0.0.1:8000/api/task_lists/" + id + "/tasks/",
      {}
    );
  }

  getTaskDetail(id: number): Promise<ITaskDetail> {
    return this.get("http://127.0.0.1:8000/api/tasks/" + id + "/", {});
  }

  updateTask(task: ITaskDetail) {
    return this.put("http://127.0.0.1:8000/api/tasks/" + task.id + "/", {
      name: task.name
    });
  }

  deleteTask(task: ITaskDetail) {
    return this.delet("http://127.0.0.1:8000/api/tasks/" + task.id + "/", {});
  }
}
