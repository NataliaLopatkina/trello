import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Task } from '../models/task';

@Injectable({ providedIn: 'root' })

export class TaskService {
    // /createTask = new Subject();
    task = new Subject();

    // public sendTask(task) {
    //     this.task.next(task)
    // }

    // public getTask(): Observable<any> {
    //     return this.task.asObservable();
    // }

    // public sendTask() {
    //     return
    // }

    constructor(private httpClient: HttpClient) { }

    public addTask(task: Task) {
        const data = { title: task.title, boardId: task.boardId };
        return this.httpClient.post(environment.baseUrl + 'task', data);
    }

    public getTasks() {
        return this.httpClient.get(environment.baseUrl + 'task')
    }

    public getTask(task: Task) {
        const id = task.id;
        return this.httpClient.get<any>(environment.baseUrl + 'task/' + id)
            .pipe(map(response => {
                if (response) {
                    this.task.next(response.task)
                } else {
                    this.task.next(null);
                }
            }))
    }

    public updateTask(task: Task) {
        const { id, title } = task;
        return this.httpClient.patch(environment.baseUrl + 'task/' + id, { title })
    }

    // public addFormCreateTask() {
    //     this.createTask.next(true)
    // }

    // public removeFormCreateTask() {
    //     this.createTask.next(false)
    // }
}
