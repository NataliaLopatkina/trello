import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppRouterModule } from './app-router.module';
import { AppComponent } from './app.component';

import { MainComponent } from './components/main/main.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { RegistrationEmailComponent } from './components/registration-email/registration-email.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';
import { NotificationComponent } from './components/notification/notification.component';
import { PopupComponent } from './components/popup/popup.component';
import { BoardComponent } from './components/board/board.component';
import { HeaderHomeComponent } from './components/header-home/header-home.component';

import { NotificationService } from './services/notification.service';
import { AuthService } from './services/auth.service';

import { JwtInterceptor } from './helpers/jwt.interceptor';

@NgModule({
    declarations: [
        AppComponent,
        MainComponent,
        RegistrationComponent,
        RegistrationEmailComponent,
        LoginComponent,
        NotFoundComponent,
        HomeComponent,
        NotificationComponent,
        PopupComponent,
        BoardComponent,
        HeaderHomeComponent
    ],
    imports: [
        BrowserModule,
        AppRouterModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        DragDropModule
    ],
    providers: [
        NotificationService,
        AuthService,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
