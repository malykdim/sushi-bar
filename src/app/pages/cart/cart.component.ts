import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private ajax: AjaxService,
    private router: Router
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
      url: 'https://parseapi.back4app.com/classes/Orders',
      data: {
        userId: this.user.objectId,
        sushiIds: this.cart.get().map(c => {
          return c.objectId;
        })
      },
      callback: (response) => {
        this.cart.clear();
        alert('Your order was submited successfully');
        this.router.navigate(['/']);
      }
    })
  }

}
