import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    
    constructor(
        private router: Router
    ) {
        const user = localStorage.getItem('user');
        if (user) {
            this.isLogged = true;
            this.sessionToken = user;
        }
    }

    public sessionToken = ''; // userObjectId
    public isLogged = false;

    public login(sessionToken: string): void {
        this.sessionToken = sessionToken;
        this.isLogged = true;
        localStorage.setItem('user', sessionToken);
    }
    
    public logout(): void {
        this.sessionToken = '';
        this.isLogged = false;
        localStorage.removeItem('user');
        this.router.navigate(['/']);
    }
}

