import { Subscription } from 'rxjs';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { PopupService } from '../../services/popup.service';
import { TaskService } from '../../services/task.service';
import { BoardService } from '../../services/board.service';

import { Task } from '../../models/task';

@Component({
    selector: 'app-board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, OnDestroy {

    subscription: Subscription;
    todo: Task [] = [];
    doing: Task [] = [];
    done: Task [] = [];
    nameBoard: string = '';
    color: string = '';
    formNameBoard: FormGroup;

    constructor(
        private popupService: PopupService,
        private taskService: TaskService,
        private activatedRoute: ActivatedRoute,
        private boardService: BoardService,
        private formBuilder: FormBuilder) {
            this.nameBoard = activatedRoute.snapshot.params['nameBoard'];
        }

    ngOnInit() {
        // this.subscription = this.taskService.getTasks()
        // .subscribe(
        //     (response: any)=> {
        //         this.todo = response.data;
        //     },

        //     (error)=> {
        //         console.log(error)
        //     }
        // )

        this.color = this.boardService.getColorBoard();
        this.formRenameBoard();
    }

    drop(event: CdkDragDrop<string[]>) {
        if (event.previousContainer !== event.container) {
            transferArrayItem(event.previousContainer.data, event.container.data,
                event.previousIndex, event.currentIndex)
        } else {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        }
    }

    formRenameBoard() {
        this.formNameBoard = this.formBuilder.group({
            title: [this.nameBoard, Validators.required]
        })
    }

    addTask() {
        this.popupService.popup();
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    click() {
        const data = { title: this.formNameBoard.value.title, id: this.boardService.getIdBoard() }
        this.boardService.updateTitleBoard(data)
        .subscribe(
            (response)=> {
                console.log(response)
            },

            (error)=> {
                console.log(error)
            }
        )
    }
}
