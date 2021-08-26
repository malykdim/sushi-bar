import { Component, Input } from '@angular/core';
import { ISushi } from 'src/app/interfaces/Sushi';
import { CartService } from 'src/app/services/cart.service';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
})
export class CardComponent { 
    
    constructor(
        private cart: CartService
    ) {}
    
    public sushi = {} as ISushi;
    @Input('sushi') set setSushi(sushi: ISushi) {
        this.sushi = sushi;
        this.inCart = (this.cart.get().find(c => c.objectId == this.sushi.objectId) ? true : false);
    }

    public inCart = false;
    
    public cartToggle(): void {
        if (!this.inCart) {
            this.cart.add(this.sushi);
            this.inCart = true;
            return;
        }
        this.cart.remove(this.sushi.objectId);
        this.inCart = false;
    }

}
