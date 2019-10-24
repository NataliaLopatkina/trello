import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Board } from '../models/board';

@Injectable({ providedIn: 'root' })

export class BoardService {

    color: string = '';
    title: string = '';
    id: number;
    private _board: object

    // private subject = new BehaviorSubject<any>(this.board);
    // currentBoard = this.subject.asObservable();

    // sendBoardData(board: Board) {
    //     this.subject.next({board})
    // }

    public set board(value: object) {
        this.board = value;
    }

    public get board() : object {
        return this.board
    }
    
    public getBoardData(board) {
        return board;
    }

    constructor(private httpClient: HttpClient) {}

    // private initBoard(board: Board) {
    //     this.color = board.color;
    //     this.title = board.title;
    //     this.id = board.id;
    // }

    public getBoards() {
        return this.httpClient.get(environment.baseUrl + 'board');
    }

    public createBoard(board: Board) {
        const data = {title: board.title, color: board.color}
        return this.httpClient.post<any>(environment.baseUrl + 'board', data)
            .pipe(map(response=> {
                this.sendBoardData(response.board);
            }))
    }

    public getBoard(id) {
        return this.httpClient.get(environment.baseUrl + 'board/' + id)
    }

    public renameBoard(id, title) {
        return this.httpClient.patch(environment.baseUrl + 'board' + id, { title})
    }
} 
