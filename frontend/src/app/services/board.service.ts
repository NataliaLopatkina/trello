import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Board } from '../models/board';

@Injectable({ providedIn: 'root' })

export class BoardService {

    board = new Subject();
    constructor(private httpClient: HttpClient) {}

    public getBoards() {
        return this.httpClient.get(environment.baseUrl + 'board');
    }

    public removeBoard(id) {
        return this.httpClient.delete(environment.baseUrl + 'board/' + id)
    }

    public createBoard(board: Board) {
        const data = {title: board.title, color: board.color}
        return this.httpClient.post<any>(environment.baseUrl + 'board', data)
    }

    private filterTasks(array, state) {
        return array.filter((item) =>
            item.state==state)
    }

    public getBoard(id) {
        return this.httpClient.get<any>(environment.baseUrl + 'board/' + id)
            .pipe(map(response => {
                if(response) {
                    this.board.next(response.board)
                } else {
                    this.board.next(null);
                }
            }))
    }

    public renameBoard(board: Board) {
        const { id, title } = board;
        return this.httpClient.patch(environment.baseUrl + 'board/' + id, { title})
    }
} 
