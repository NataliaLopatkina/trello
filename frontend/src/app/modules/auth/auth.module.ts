import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider } from "angularx-social-login";

import { AuthRoutingModule } from '../auth/auth-routing.module';
import { RegistrationEmailComponent } from './components/registration-email/registration-email.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';

let config = new AuthServiceConfig([
    {
      id: GoogleLoginProvider.PROVIDER_ID,
      provider: new GoogleLoginProvider("588236383626-qiosbp6aao1u3u9mbit1hghh4rc93g2s.apps.googleusercontent.com")
    }
]);
   
  export function provideConfig() {
    return config;
  }

@NgModule({
    declarations: [
        RegistrationEmailComponent,
        RegistrationComponent,
        LoginComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AuthRoutingModule,
        SocialLoginModule
    ],

    providers: [
        {
          provide: AuthServiceConfig,
          useFactory: provideConfig
        }
    ]
})

export class AuthModule { }
