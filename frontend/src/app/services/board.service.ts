import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Board } from '../models/board';

@Injectable({ providedIn: 'root' })

export class BoardService {

    constructor(private httpClient: HttpClient) {}

    public createBoard(board: Board) {
        const data = {title: board.title}
        return this.httpClient.post('http://localhost:3000/boards', data)
    }
}
