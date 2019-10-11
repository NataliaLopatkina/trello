import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './components/main/main.component';
import { RegistrationEmailComponent } from './components/registration-email/registration-email.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { BoardsComponent } from './components/boards/boards.component';
import { BoardComponent } from './components/board/board.component';

import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
    {
        path: '', component: MainComponent
    },

    {
        path: 'registration', component: RegistrationEmailComponent
    },

    {
        path: 'registration/:email', component: RegistrationComponent
    },

    {
        path: 'login', component: LoginComponent
    },

    {
        path: 'boards', component: BoardsComponent, canActivate: [AuthGuard]
    },

    {
        path: 'board', component: BoardComponent, canActivate: [AuthGuard]
    },

    {
        path: '**', component: NotFoundComponent
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})

export class AppRouterModule{}
