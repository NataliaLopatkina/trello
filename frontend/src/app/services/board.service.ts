import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Board } from  '@models/board';

@Injectable({ providedIn: 'root' })

export class BoardService {

    board = new Subject();
    tasks = new Subject();
    
    constructor(private httpClient: HttpClient) {}

    public getBoards() {
        return this.httpClient.get(environment.baseUrl + 'boards');
    }

    public removeBoard(id) {
        return this.httpClient.delete(environment.baseUrl + 'boards/' + id)
    }

    public createBoard(board: Board) {
        const data = {title: board.title, color: board.color}
        return this.httpClient.post<any>(environment.baseUrl + 'boards', data)
    }

    public getBoard(id) {
        return this.httpClient.get<any>(environment.baseUrl + 'boards/' + id)
            .pipe(map(response => {
                if(response) {
                    this.board.next(response.board)
                    this.tasks.next(response.tasks)
                } else {
                    this.board.next(null);
                }
            }))

            
    }

    public renameBoard(id, title) {
        return this.httpClient.patch(environment.baseUrl + 'boards/' + id, { title})
    }
} 
