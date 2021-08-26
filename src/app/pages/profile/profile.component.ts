import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
    
    constructor(
        public user: UserService,
        private router: Router
    ) {}
    
    ngOnInit(): void {
        // if (!this.user.isLogged) {
        //     this.router.navigate(['/login']);
        //     return;
        // }
    }
    
}
