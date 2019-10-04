import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './components/main/main.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { RegistrationEmailComponent } from './components/registration-email/registration-email.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';

import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
    {
        path: '', component: MainComponent
    },

    {
        path: 'registration', component: RegistrationComponent
    },

    {
        path: 'registration/email', component: RegistrationEmailComponent
    },

    {
        path: 'login', component: LoginComponent
    },

    {
        path: 'home', component: HomeComponent, canActivate: [AuthGuard]
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
