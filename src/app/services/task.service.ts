import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ITask } from './../models/Task.model';

@Injectable()
export class TaskService {
    apiUrlBase = 'http://localhost:3000/api/v1';
    constructor(private http: HttpClient) { }

    getTasks(): Observable<ITask[]> {
        return this.http.get<ITask[]>(`${this.apiUrlBase}/task`);
    }

    createTask(dataTask: ITask): Observable<ITask> {
        return this.http.post<ITask>(`${this.apiUrlBase}/task`, dataTask)
    }

    editTask(id: number, dataTask: ITask): Observable<ITask> {
        return this.http.patch<ITask>(`${this.apiUrlBase}/task/${id}`, dataTask);
    }

    deleteTask(id: number): Observable<any> {
        return this.http.delete<any>(`${this.apiUrlBase}/task/${id}`);
    }
}

