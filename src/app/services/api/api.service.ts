import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
<<<<<<< HEAD
import { LoginResponse, News, Post, Project,ProjectProgress  } from '../../model/get_res';
=======
import { LoginResponse, Post, Project } from '../../model/get_res';
import { Progress } from '../../model/getprogress';
>>>>>>> c6a13b70e90a0fbc17f436b595b9af5f12118692

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly apiUrl = 'https://pwmeds.com/api';

  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/project?pid=1`);
  }
  login(credentials: { username: string; password: string }): Observable<any> {
    // console.log(credentials.username, credentials.password);
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials);
  }
  getAllProjects(): Observable<any> {
    return this.http.get<Project>(`${this.apiUrl}/allproject`);
  }
  getProjectByID(pid: any): Observable<any> {
    console.log(pid);//=2
    
    // return this.http.get<ProjectProgress >(`${this.apiUrl}/project?pid=2`);
    
return this.http.get<ProjectProgress>(`${this.apiUrl}/project?pid=${pid}`);
    
  }
   postNews(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/news`, data);
  }
<<<<<<< HEAD
   postProject(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/project`, data);
  }
   getNewsByProject(pid: any): Observable<any> {
    return this.http.get<News>(`${this.apiUrl}/news?pid=${pid}`);
=======

    getProgress(): Observable<any> {
    return this.http.get<Progress>(`${this.apiUrl}/progress`);
>>>>>>> c6a13b70e90a0fbc17f436b595b9af5f12118692
  }
}
