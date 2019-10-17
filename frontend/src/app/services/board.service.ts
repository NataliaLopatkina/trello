import { map } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Board } from '../models/board';

@Injectable({ providedIn: 'root' })

export class BoardService {

    color: string = '';
    title: string = '';

    constructor(private httpClient: HttpClient) {}

    public initBoard(board: Board) {
        this.color = board.color;
        this.title = board.title;
    }

    public createBoard(board: Board) {
        const data = {title: board.title, color: board.color}
        return this.httpClient.post<any>('http://localhost:3000/board', data)
        .pipe(map(response=> {
            this.initBoard(response);
        }))
    }

    public updateTitleBoard(board: Board) {
        const data = { title: board.title, id: board.id }
        return this.httpClient.patch('http://localhost:3000/board', data)
    }

    public getBoards() {
        return this.httpClient.get('http://localhost:3000/boards');
    }
}
