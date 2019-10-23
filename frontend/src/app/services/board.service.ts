import { map } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Board } from '../models/board';

@Injectable({ providedIn: 'root' })

export class BoardService {

    color: string = '';
    title: string = '';
    id: number;

    constructor(
        private httpClient: HttpClient) {}

    private initBoard(board: Board) {
        this.color = board.color;
        this.title = board.title;
        this.id = board.id;
    }

    public createBoard(board: Board) {
        const data = {title: board.title, color: board.color}
        return this.httpClient.post<any>('http://localhost:3000/board', data)
        .pipe(map(response=> {
            this.initBoard(response.board);
        }))
    }

    public renameBoard(id, title) {
        return this.httpClient.patch('http://localhost:3000/board/' + id, { title})
    }

    public getBoards() {
        return this.httpClient.get('http://localhost:3000/boards');
    }

    public getBoard(id) {
        return this.httpClient.get('http://localhost:3000/board/' + id)
    }
} 
