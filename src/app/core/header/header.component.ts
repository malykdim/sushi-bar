
import { Component } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent<T> {
    title: string = 'sushi bar';
    showMenu: boolean = true;
    
    constructor() {}
    
    toggleMenu(event: MouseEvent): void {
        event.preventDefault();
        this.showMenu = !this.showMenu;
    }
}
