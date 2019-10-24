import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../../guards/auth.guard';
import { DashboardComponent } from '../../components/dashboard/dashboard.component';
import { IndividualBoardComponent } from '../../components/individual-board/individual-board.component';

const routes: Routes = [
    {
        path: '', component: DashboardComponent, canActivate: [AuthGuard]
    },

    {
        path: ':idBoard/:nameBoard', component: IndividualBoardComponent, canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BoardsRoutingModule { }
