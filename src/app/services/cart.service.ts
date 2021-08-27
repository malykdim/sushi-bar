import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { ISushi } from '../interfaces/Sushi';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  constructor() {
    const cart = localStorage.getItem('cart');
    if (cart) {
      this.cart = JSON.parse(cart);
      this.notify();
    }
  }

  private cart = [] as ISushi[];
  public cart$ = new BehaviorSubject([] as ISushi[]);

  private actions = {
    add: (sushiObj: ISushi): void => {
      this.cart.push(sushiObj);
      this.notify();
      console.log(this.cart);
    },
    remove: (index: number): void => {
      this.cart.splice(index, 1);
      this.notify();
      console.log(this.cart);
    },
    removeAll: (): void => {
      this.cart = [];
      this.notify();
    }
  };

  private notify(): void {
    console.log('notify', this.cart);
    this.cart$.next(this.cart);
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }
  
  public add(sushiObj: ISushi): void {
    // if exists and count is different, udpate the count
    this.actions.add(sushiObj);
  }
  
  public remove(id: string): void {
    const index = this.cart.findIndex(c => c.objectId === id);
    if (index !== -1) {
      this.actions.remove(index);
    }
  }
  
  public clear(): void {
    this.actions.removeAll();
  }

  public toggleItem(sushiObj: ISushi): void {
    const index = this.cart.findIndex(c => c.objectId === sushiObj.objectId);
    if (index !== -1) {
      this.actions.remove(index);
      console.log(this.cart);
      return;
    }
    this.actions.add(sushiObj);
    console.log(this.cart);
  }

  public get(): ISushi[] {
    return this.cart;
  }
}
