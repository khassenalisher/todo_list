import { Component, OnInit } from "@angular/core";
import { ProviderService } from "../shared/services/provider.service";
import {
  ITask,
  ITaskDetail,
  ITaskCreate
} from "../shared/interfaces/task.interface";
import { ITaskList } from "../shared/interfaces/taskList.interface";

import * as $ from "jquery";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.css"]
})
export class MainComponent implements OnInit {
  public taskLists: ITaskList[] = [];
  public tasks: ITask[] = [];
  public task: ITaskDetail = {
    created_at: "",
    due_on: "",
    id: 0,
    name: "",
    status: ""
  };
  public createdTask: ITaskCreate = {
    created_at: "2019-04-22T12:17:53",
    due_on: "2016-12-19T20:00:00",
    name: "",
    status: ""
  };
  public taskList = "";
  public taskListId = null;
  public loadingTasks = false;
  public loadingTask = false;
  public name: any = "";
  public logged = false;
  public login: any = "";
  public password: any = "";
  constructor(private provider: ProviderService) {}

  ngOnInit() {
    const token = localStorage.getItem("token");
    if (token) {
      this.logged = true;
    }
    if (this.logged) {
      this.provider.getTaskLists().then(res => {
        this.taskLists = res;
      });
    }
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

  createTask() {
    this.provider.createTask(this.createdTask, this.taskListId).then(res => {
      this.createdTask.created_at = "2016-12-19T20:00:00";
      this.createdTask.due_on = "2019-04-22T12:17:53";
      this.createdTask.name = "";
      this.createdTask.status = "";
    });
  }
  auth() {
    if (this.login !== "" && this.password !== "") {
      this.provider.auth(this.login, this.password).then(res => {
        localStorage.setItem("token", res.token);
        this.logged = true;
        this.provider.getTaskLists().then(res => {
          this.taskLists = res;
        });
      });
    }
  }
  clearData() {
    this.taskLists = [];
    this.loadingTasks = false;
    this.loadingTask = false;
    this.taskList = "";
    this.login = "";
    this.password = "";
    this.taskListId = null;
  }
  logout() {
    this.provider.logout().then(res => {
      localStorage.clear();
      this.logged = false;
      this.clearData();
    });
  }
}
