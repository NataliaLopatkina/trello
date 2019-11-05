import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from '@components/main/main.component';
import { NotFoundComponent } from '@components/not-found/not-found.component';

export const routes: Routes = [
    {
        path: '', component: MainComponent
    },

    { 
        path: 'auth', loadChildren: ()=> import('./modules/auth/auth.module').then(m => m.AuthModule)
    },

    {
        path: 'boards', loadChildren: ()=> import('./modules/board/board.module').then(m => m.BoardModule)
    },

    {
        path: '**', component: NotFoundComponent
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})

export class AppRoutingModule{}
