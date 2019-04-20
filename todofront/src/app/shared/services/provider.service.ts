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

  getTaskListTasks(id: number): Promise<ITask[]> {
    return this.get(
      "http://127.0.0.1:8000/api/task_lists/" + id + "/tasks/",
      {}
    );
  }

  getTaskDetail(id: number): Promise<ITaskDetail> {
    return this.get("http://127.0.0.1:8000/api/tasks/" + id + "/", {});
  }
}
