export interface ITask {
  id: number;
  name: string;
  status: string;
}

export interface ITaskDetail {
  id: number;
  name: string;
  status: string;
  created_at: string;
  due_on: string;
}

export interface ITaskCreate {
  name: string;
  status: string;
  created_at: string;
  due_on: string;
}

export interface IAuthResponse {
  token: string;
}
