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
export interface News {
  Tittle: string;
  Newsid: number;
  Details: string;
  Date: string; // หรือใช้ Date ถ้าจะ parse เป็น object
  name: string;
  build: string;
  Projectid: number;
  Images: string[];
}
export interface ProjectProgress {
  Projectid: number;
  name: string;
  Details: string;
  Progress: number;
  Date: string | null; // เพราะ Date เป็น null จาก API
  Images: string[];
}

