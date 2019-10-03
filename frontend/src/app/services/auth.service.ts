import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/user';

@Injectable({providedIn: 'root'})

export class AuthService {
    constructor(private httpClient: HttpClient) {}
    
    public registration(user: User) {
        const data = {name: user.name, email: user.email, password: user.password};
        return this.httpClient.post('http://localhost:3000/registration', data);
    }
}
