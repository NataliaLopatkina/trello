import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { BoardsRoutingModule } from './boards-routing.module';

import { DashboardComponent } from '../../components/dashboard/dashboard.component';
import { HeaderHomeComponent } from '../../components/header-home/header-home.component';
import { PopupCreateBoardComponent } from '../../components/popup-create-board/popup-create-board.component';
import { BoardHeaderComponent } from '../../components/board-header/board-header.component';
import { IndividualBoardComponent } from '../../components/individual-board/individual-board.component';
import { CreateCardComponent } from '../../components/create-card/create-card.component';
import { UpdateTaskComponent } from '../../components/update-task/update-task.component';

import { FocusDirective } from '../../directives/focus.directive';

@NgModule({
    declarations: [
        DashboardComponent,
        HeaderHomeComponent,
        PopupCreateBoardComponent,
        BoardHeaderComponent,
        IndividualBoardComponent,
        CreateCardComponent,
        UpdateTaskComponent,
        FocusDirective
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        BoardsRoutingModule,
        DragDropModule
    ]
})
export class BoardsModule { }
