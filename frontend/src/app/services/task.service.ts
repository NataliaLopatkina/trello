import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Task } from '../models/task';

@Injectable({ providedIn: 'root' })

export class TaskService {
    
    constructor(private httpClient: HttpClient) { }

    public addTask(task: Task) {
        const data = { title: task.title, boardId: task.boardId, state: task.state };
        return this.httpClient.post(environment.baseUrl + 'task', data);
    }

    public renameTask(title, id) {
        return this.httpClient.patch(environment.baseUrl + 'task/' + id, { title })
    }

    public updateDescriptionTask(descirption, id) {
        return this.httpClient.patch(environment.baseUrl + 'task/' + id, { descirption })
    }

    public removeTask(id) {
        return this.httpClient.delete(environment.baseUrl + 'task/' + id)
    }
}
