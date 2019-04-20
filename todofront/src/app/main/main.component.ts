import { Component, OnInit } from "@angular/core";
import { ProviderService } from "../shared/services/provider.service";
import { ITask, ITaskDetail } from "../shared/interfaces/task.interface";
import { ITaskList } from "../shared/interfaces/taskList.interface";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.css"]
})
export class MainComponent implements OnInit {
  public taskLists: ITaskList[] = [];
  public tasks: ITask[] = [];
  public task: ITaskDetail = {};
  public taskList = "";
  public loadingTasks = false;
  public loadingTask = false;
  constructor(private provider: ProviderService) {}

  ngOnInit() {
    this.provider.getTaskLists().then(res => {
      this.taskLists = res;
    });
  }

  getTasks(taskList: ITaskList) {
    this.provider.getTaskListTasks(taskList.id).then(res => {
      this.tasks = res;
      this.taskList = taskList.name;
      this.loadingTasks = true;
      this.loadingTask = false;
    });
  }
  getTask(task: ITask) {
    this.provider.getTaskDetail(task.id).then(res => {
      this.task = res;
      this.loadingTask = true;
    });
  }
}
