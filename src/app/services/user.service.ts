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
            this.objectId = user;
        }
    }

    public objectId = ''; // userObjectId
    public isLogged = false;

    public login(objectId: string): void {
        this.objectId = objectId;
        this.isLogged = true;
        localStorage.setItem('user', objectId);
    }

    public logout(): void {
        this.objectId = '';
        this.isLogged = false;
        localStorage.removeItem('user');
        this.router.navigate(['/']);
    }
}

