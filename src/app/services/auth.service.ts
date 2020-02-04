import { Injectable } from '@angular/core';
import { HttpParams, HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from '../models/user';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }
  
  private tokenExpirationTimer: any;
  user = new BehaviorSubject<User>(null);

  signIn(username: string, password: string) {
    const url = 'https://ignatius.io/token';
    let params = new HttpParams();
    params = params.append('grant_type', 'password');
    params = params.append('username', username);
    params = params.append('password', password);
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded'
      })
    };

    return this.http
      .post<User>(url, params, options)
      .pipe(
        catchError(this.handleError),
        tap(user => {
            this.user.next(user);
            localStorage.setItem('userData', JSON.stringify(user));
        })
      );
  }

  autoLogin() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.access_token,
      new Date(userData['.expires']),
      userData.userName,
      userData.fullName
    );

    if (loadedUser.tokenIsValid()) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/login']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    // this.tokenExpirationTimer = setTimeout(() => {
    //   this.logout();
    // }, expirationDuration);
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An error occurred!';
    return throwError(errorMessage);
  }
}
