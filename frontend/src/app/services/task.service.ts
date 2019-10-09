import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Task } from '../models/task';


@Injectable({ providedIn: 'root' })

export class TaskService {
    constructor(private httpClient: HttpClient) { }

    public createTask(task: Task) {
        const data = { title: task.title };
        return this.httpClient.post('http://localhost:3000/task', data);
    }

    public getTasks() {
        return this.httpClient.get('http://localhost:3000/task')
    }
}
