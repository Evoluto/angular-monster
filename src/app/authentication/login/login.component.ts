import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { User } from '../../models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  msg = '';
  constructor(
    private authService: AuthService, 
    private routes: Router) { }

  loginform = true;
  recoverform = false;

  showRecoverForm() {
    this.loginform = !this.loginform;
    this.recoverform = !this.recoverform;
  }
  
  check(username: string, password: string) {
    this.authService
      .signIn(username, password)
      .subscribe(user => {
        if(user){
          this.routes.navigate(['/']);
        }else{
          this.msg = 'Invalid Username or Password';
        }
      });
  }
}
