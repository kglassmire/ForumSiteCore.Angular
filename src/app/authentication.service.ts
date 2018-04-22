import { Injectable } from '@angular/core';
import { AuthService, LoginDto, FileResponse } from './api.service';

@Injectable()
export class AuthenticationService {

  constructor(private authService: AuthService) { }

  isAuthenticated(): boolean {
    if (localStorage.getItem('loggedIn') === null) {
      return false;
    }
    if (localStorage.getItem('loggedIn') != null) {
      if (localStorage.getItem('loggedIn') === 'true') {
        return true;
      } else {
        return false;
      }
    }
  }

  login(loginDto: LoginDto) {
    this.authService.login(loginDto, '/')
      .map((res: FileResponse) => {
        if (res) {
          if (res.status === 200) {
            localStorage.setItem('loggedIn', 'true');
          }
        }
      })
      .subscribe(response => console.log(response), err => console.log(err));
  }

  logout() {
    this.authService.logout()
      .map((res: FileResponse) => {
        if (res) {
          if (res.status === 200) {
            localStorage.setItem('loggedIn', 'false');
          }
        }
      })
      .subscribe(response => console.log(response), err => console.log(err));
  }
}
