import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from './../models/Task.model';

@Injectable()
export class TaskService {
    constructor(private http: HttpClient) { }

    getTasks(): Observable<Task[]> {
        // return this.http.get<Task[]>('/apitodo/task')
        return this.http.get<Task[]>('http://localhost:3000/api/v1/task')
    }
}

