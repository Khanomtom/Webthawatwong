import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { LoginResponse, Post, Project } from '../../model/get_res';

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
  getProjectByID(): Observable<any> {
    return this.http.get<Project>(`${this.apiUrl}/allproject`);
  }
   postNews(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/news`, data);
  }
}
