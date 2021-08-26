import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss']
})
export class FeaturesComponent implements OnInit, OnDestroy {

  constructor(
    private cart: CartService
  ) { }

  private subscription!: Subscription;
  
  public cartInfo = {
    totalPrice: 0,
    items: 0
  };

  ngOnInit(): void {
    this.subscribeForCart();
  }

  private subscribeForCart(): void {
    this.subscription = this.cart.cart$.subscribe(e => {
      this.cartInfo.items = e.length;
      let price = 0;
      e.forEach(s => {
        price += s.price;
      });
      this.cartInfo.totalPrice = Number(price.toFixed(2));
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
