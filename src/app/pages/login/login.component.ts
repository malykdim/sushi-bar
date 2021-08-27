import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
    
  constructor(
      private cart: CartService,
      private user: UserService,
      private router: Router,
      private loginServ: LoginService
  ) {}

  
  public form = {
      username: '',
      password: ''
  };
  
  public submit(): void {
    this.loginServ.login({
      username: this.form.username,
      password: this.form.password,
      callback: (json) => {
        if (this.cart.get()[0]) {
          this.router.navigate(['/cart']);
          return;
        }
        this.router.navigate(['/profile']);
      }
    });
  }
}
