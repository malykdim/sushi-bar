import { Component, OnInit } from '@angular/core';
import { ISushi } from 'src/app/interfaces/Sushi';
import { AjaxService } from 'src/app/services/ajax.service';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(
    public user: UserService,
    public cart: CartService,
    private ajax: AjaxService
  ) { }
  
  public form = {
    username: '',
    cart: this.cart.get()
  };
  
  public sushies: ISushi[] = [];
  public total = 0;

  ngOnInit(): void {
    this.sushies = this.cart.get();
    this.sushies.forEach(s => {
      this.total += s.price;
    });
  }
  
  public submitOrder(): void {
    this.ajax.post({
      url: '',
      data: {
        sessionToken: this.user.sessionToken,
        cart: this.cart.get().filter(c => c.objectId)
      },
      callback: (response) => {
        
      }
    })
  }

}
