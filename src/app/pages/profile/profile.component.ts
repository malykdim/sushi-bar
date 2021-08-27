import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ISushi } from 'src/app/interfaces/Sushi';
import { AjaxService } from 'src/app/services/ajax.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
    
    constructor(
        public user: UserService,
        private router: Router,
        private ajax: AjaxService
    ) {}
    
    public orders = [] as Array<any>;
    private sushies = [] as ISushi[];
    
    ngOnInit(): void {
        if (!this.user.isLogged) {
            this.router.navigate(['/login']);
            return;
        }
        this.getOrders();
    }
    
    private getOrders(): void {
        this.ajax.get({
            url: 'https://parseapi.back4app.com/classes/Orders',
            contentJson: true,
            data: `where=${JSON.stringify({"userId": this.user.objectId})}`,
            callback: (response) => {
                this.orders = response.results;
                this.getSushis();
            }
        });
    }
    
    private getSushis(): void {
        this.ajax.get({
            url: 'https://parseapi.back4app.com/classes/Sushi',
            callback: (response) => {
                this.sushies = response.results;
                this.sushiHandler();
            }
        });
    }
    
    private sushiHandler(): void {
        if (!this.sushies || !this.orders) {
            return;
        }
        this.orders.forEach((o, index) => {
            const created = new Date(o.createdAt);
            o.createdAt = created.getDate().toString().padStart(2, '0') + '.' + created.getMonth().toString().padStart(2, '0') + '.' + created.getFullYear();
            if (!this.orders[index].orders) {
                this.orders[index].orders = [];
                this.orders[index].total = 0;
            }
            this.orders[index].orders = o.sushiIds.map((sushiId: string) => {
                const current = this.sushies.find(s => s.objectId == sushiId);
                this.orders[index].total += current?.price;
                return {
                    name: current?.name,
                    image: current?.imgUrl,
                    price: current?.price,
                }
            });
        });
    }
    
}
