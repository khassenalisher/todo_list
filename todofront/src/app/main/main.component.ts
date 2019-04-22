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
  public taskListId = null;
  public loadingTasks = false;
  public loadingTask = false;
  public name: any = "";
  constructor(private provider: ProviderService) {}

  ngOnInit() {
    this.provider.getTaskLists().then(res => {
      this.taskLists = res;
    });
  }

  getTasks(taskList: ITaskList) {
    this.provider.getTaskListTasks(taskList.id).then(res => {
      this.tasks = res;
      this.taskListId = taskList.id;
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

  createTaskList() {
    if (this.name !== "") {
      this.provider.createTaskList(this.name).then(res => {
        this.taskLists.push(res);
        this.name = "";
      });
    }
  }

  deleteTaskList(taskList: ITaskList) {
    this.provider.deleteTaskList(taskList.id).then(res => {
      this.provider.getTaskLists().then(r => {
        this.taskLists = r;
      });
    });
  }

  updateTaskList(taskList: ITaskList) {
    this.provider.updateTaskList(taskList).then(res => {});
  }

  updateTask(task: ITaskDetail) {
    this.provider.updateTask(task).then(res => {});
  }

  deleteTask(task: ITaskDetail) {
    this.provider.deleteTask(task).then(res => {
      this.provider.getTaskListTasks(this.taskListId).then(r => {
        this.tasks = r;
        this.loadingTask = false;
        this.loadingTasks = false;
      });
    });
  }
}
