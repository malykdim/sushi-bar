import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AjaxService } from 'src/app/services/ajax.service';
import { CartService } from 'src/app/services/cart.service';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent  {

  constructor(
    private ajax: AjaxService,
    private cart: CartService,
    private user: UserService,
    private router: Router,
    private loginServ: LoginService
  ) { }
  
  public form = {
    username: '',
    email: '',
    password: ''
  };

  public submit(): void {
    this.ajax.post({
      url: 'https://parseapi.back4app.com/users',
      headers: {
        "X-Parse-Revocable-Session": 1
      },
      contentJson: true,
      data: this.form,
      callback: (json) => {
        if (!json.sessionToken) {
          return;
        }
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
    });
  }

}
