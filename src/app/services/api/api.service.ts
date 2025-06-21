import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { LoginResponse, News, Post, Project,ProjectProgress  } from '../../model/get_res';

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
   postProject(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/project`, data);
  }
   getNewsByProject(pid: any): Observable<any> {
    return this.http.get<News>(`${this.apiUrl}/news?pid=${pid}`);
  }
}
