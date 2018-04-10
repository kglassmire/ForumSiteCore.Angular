import { Component, OnInit } from '@angular/core';
import { AuthService, LoginDto } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
  }

  login(username: string, password: string) {
    const loginDto: LoginDto = <LoginDto> { userName: username, password: password, rememberMe: true, email: 'dronez@fakesite.com' };
    this.authService.login(loginDto, '/').subscribe(response => console.log(response), err => console.log(err));
  }
}
