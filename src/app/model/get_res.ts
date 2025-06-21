export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  Uid: number;
  Username: string;
  Password: string;
  Type: string;
}
export interface Project {
  Pid: number;
  name: string;
  Progress: number; // ค่าระหว่าง 0–100
}
