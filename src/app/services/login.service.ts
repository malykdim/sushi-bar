import { Injectable } from '@angular/core';
import { AjaxService } from './ajax.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private ajax: AjaxService,
    private user: UserService
  ) { }
  
  public login(form: {username: string; password: string; callback?: (arg0: any) => void}): void {
    this.ajax.get({
      url: `https://parseapi.back4app.com/login`,
      headers: {
        "X-Parse-Revocable-Session": 1
      },
      data: `username=${form.username}&password=${form.password}`,
      callback: (json) => {
        if (!json.objectId) {
          alert('Something went wrong');
          return;
        }
        this.user.login(json.objectId);

        if (form.callback) {
          form.callback(json);
        }
      }
    });
  }
}
