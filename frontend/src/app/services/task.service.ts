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
        return this.httpClient.post(environment.baseUrl + 'tasks', data);
    }

    public renameTask(title:string, id:number) {
        return this.httpClient.patch(environment.baseUrl + 'tasks/' + id + '/title', { title })
    }

    public updateDescriptionTask(description:string, id:number) {
        return this.httpClient.patch(environment.baseUrl + 'tasks/' + id + '/description', { description })
    }

    public removeTask(id:number) {
        return this.httpClient.delete(environment.baseUrl + 'tasks/' + id)
    }

    public moveTask(id:number, state:string, tasks:Array<any>) {
        return this.httpClient.patch(environment.baseUrl + 'tasks/' + id + '/move', {state, tasks})
    }
}
