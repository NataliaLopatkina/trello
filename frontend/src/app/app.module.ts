import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRouterModule } from './app-router.module';
import { AppComponent } from './app.component';

import { MainComponent } from '../components/main/main.component';
import { RegistrationComponent } from '../components/registration/registration.component';
import { RegistrationEmailComponent } from '../components/registration-email/registration-email.component';
import { LoginComponent } from '../components/login/login.component';
import { NotFoundComponent } from '../components/not-found/not-found.component';
import { HomeComponent } from '../components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    RegistrationComponent,
    RegistrationEmailComponent,
    LoginComponent,
    NotFoundComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
