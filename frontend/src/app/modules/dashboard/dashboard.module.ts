import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { DashboardRoutingModule } from '../dashboard/dashboard-routing.module';

import { DashboardComponent } from '../../components/dashboard/dashboard.component';
import { HeaderHomeComponent } from '../../components/header-home/header-home.component';
import { PopupCreateBoardComponent } from '../../components/popup-create-board/popup-create-board.component';
import { IndividualBoardComponent } from '../../components/individual-board/individual-board.component';
import { CardComponent } from '../../components/card/card.component';

@NgModule({
    declarations: [
        DashboardComponent,
        HeaderHomeComponent,
        PopupCreateBoardComponent,
        IndividualBoardComponent,
        CardComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        DashboardRoutingModule,
        DragDropModule
    ]
})
export class DashboardModule { }
