import { map } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Board } from '../models/board';

@Injectable({ providedIn: 'root' })

export class BoardService {

    constructor(private httpClient: HttpClient) {}

    public createBoard(board: Board) {
        const data = {title: board.title, color: board.color}
        return this.httpClient.post<any>('http://localhost:3000/board', data)
            .pipe(map(response=> {
                localStorage.setItem('color', JSON.stringify(response.color).replace(/['"]+/g, ''));
            }))
    }

    public updateTitleBoard(board: Board) {
        const data = { title: board.title, id: board.id }
        return this.httpClient.put('http://localhost:3000/board', data)
    }

    public getColorBoard() {
        return localStorage.getItem('color');
    }

    public getIdBoard() {
        return localStorage.getItem('id');
    }

    public getBoards() {
        return this.httpClient.get('http://localhost:3000/boards');
    }

    public searchBoards(valueSearch) {
        const params = { value: valueSearch }
        return this.httpClient.get('http://localhost:3000/boards/search', { params })
    }
}
