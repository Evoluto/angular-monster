import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  msg = '';
  isLoading = false;

  constructor(
    private authService: AuthService, 
    private routes: Router) { }

  loginform = true;
  recoverform = false;

  showRecoverForm() {
    this.loginform = !this.loginform;
    this.recoverform = !this.recoverform;
  }

  getButtonStyle(): string{
    return this.isLoading ? '#076aac73' : '#076aace8';
  }
  
  check(username: string, password: string) {
    this.isLoading = true;
    this.authService
      .signIn(username, password)
      .subscribe(user => {
        this.routes.navigate(['/']);
      }, error => {
        this.msg = error;
        this.isLoading = false;
      });
  }
}
