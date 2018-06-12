import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { LoginVM } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthenticationService) {
  }

  userName: string;
  password: string;

  ngOnInit() {
  }

  isAuthenticated() {
    console.log('authenticated: ' + this.authService.isAuthenticated());
    return this.authService.isAuthenticated();
  }

  login() {
    const loginDto: LoginVM = <LoginVM> {
      userName: this.userName,
      password: this.password,
      rememberMe: true
    };
    this.authService.login(loginDto);
  }

  logout() {
    this.authService.logout();
  }


}
