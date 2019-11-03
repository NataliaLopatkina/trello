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
import { FormCreateTaskComponent } from './components/form-create-task/form-create-task.component';
import { PopupUpdateTaskComponent } from './components/popup-update-task/popup-update-task.component';
import { InviteComponent } from './components/invite/invite.component';

import { FocusDirective } from '../../directives/focus.directive';

@NgModule({
    declarations: [
        DashboardComponent,
        HeaderHomeComponent,
        PopupCreateBoardComponent,
        BoardHeaderComponent,
        BoardComponent,
        FormCreateTaskComponent,
        PopupUpdateTaskComponent,
        InviteComponent,
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
