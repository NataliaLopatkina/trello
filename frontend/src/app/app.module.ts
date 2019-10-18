import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthModule } from './modules/auth/auth.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';

import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { NotificationComponent } from './components/notification/notification.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

import { NotificationService } from './services/notification.service';
import { AuthService } from './services/auth.service';
import { TaskService } from './services/task.service';

import { JwtInterceptor } from './helpers/jwt.interceptor';

@NgModule({
    declarations: [
        AppComponent,
        MainComponent,
        NotificationComponent,
        NotFoundComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        AuthModule,
        DashboardModule
    ],
    providers: [
        NotificationService,
        AuthService,
        TaskService,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
