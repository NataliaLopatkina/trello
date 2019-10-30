import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { BoardRoutingModule } from './board-routing.module';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeaderHomeComponent } from './components/header-home/header-home.component';
import { PopupCreateBoardComponent } from './components/popup-create-board/popup-create-board.component';
import { BoardHeaderComponent } from './components/board-header/board-header.component';
import { BoardComponent } from './components/board/board.component';
import { CreateCardComponent } from './components/create-card/create-card.component';
import { UpdateTaskComponent } from './components/update-task/update-task.component';

import { FocusDirective } from '../../directives/focus.directive';

@NgModule({
    declarations: [
        DashboardComponent,
        HeaderHomeComponent,
        PopupCreateBoardComponent,
        BoardHeaderComponent,
        BoardComponent,
        CreateCardComponent,
        UpdateTaskComponent,
        FocusDirective
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        BoardRoutingModule,
        DragDropModule
    ]
})
export class BoardModule { }
