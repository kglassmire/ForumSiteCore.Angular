import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { LoginVM } from '../api.service';

@Component({
  selector: 'app-login-reactive',
  templateUrl: './login-reactive.component.html',
  styleUrls: ['./login-reactive.component.css']
})
export class LoginReactiveComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private authenticationServce: AuthenticationService) { }

  ngOnInit() {
    this.initializeForm();
  }

  private initializeForm() {
    this.loginForm = new FormGroup({
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  isAuthenticated() {
    console.log('authenticated: ' + this.authenticationServce.isAuthenticated());
    return this.authenticationServce.isAuthenticated();
  }

  login() {
    const loginDto: LoginVM = <LoginVM> {
      userName: this.loginForm.controls['userName'].value,
      password: this.loginForm.controls['password'].value,
      rememberMe: true };
    this.authenticationServce.login(loginDto);
    this.loginForm.reset();
  }

  logout() {
    this.authenticationServce.logout();
  }

}
