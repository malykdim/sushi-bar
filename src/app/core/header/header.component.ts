
import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent<T> {
    title: string = 'sushi bar';
    showMenu: boolean = true;
    
    constructor(
        public user: UserService
    ) {}
    
    public toggleMenu(event: MouseEvent): void {
        event.preventDefault();
        this.showMenu = !this.showMenu;
    }
}
