import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { LoginDto } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthenticationService) {
  }

  ngOnInit() {
  }

  isAuthenticated() {
    console.log('authenticated: ' + this.authService.isAuthenticated());
    return this.authService.isAuthenticated();
  }

  login(userName: String, password: String) {
    const loginDto: LoginDto = <LoginDto> { userName: userName, password: password, rememberMe: true, email: 'dronez@fakesite.com' };
    this.authService.login(loginDto);
  }

  logout() {
    this.authService.logout();
  }


}
