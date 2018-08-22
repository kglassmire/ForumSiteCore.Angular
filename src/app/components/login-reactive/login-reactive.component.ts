import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginVM, AuthService, SwaggerException } from '../../services/api.service';
import { AuthenticationService } from '../../services/authentication.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-login-reactive',
  templateUrl: './login-reactive.component.html',
  styleUrls: ['./login-reactive.component.css']
})
export class LoginReactiveComponent implements OnInit {
  loginForm: FormGroup;
  loginFailureMessage: string;
  constructor(
    private authService: AuthService,
    private authenticationService: AuthenticationService,
    private alertService: AlertService) { }

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
    return this.authenticationService.isAuthenticated();
  }

  login() {
    const loginDto: LoginVM = <LoginVM> {
      userName: this.loginForm.controls['userName'].value,
      password: this.loginForm.controls['password'].value,
      rememberMe: true };

    this.authService.login(loginDto, '/')
      .subscribe((next) => {
        console.log(next);
        this.loginFailureMessage = '';
      }, (err) => {
        if (SwaggerException.isSwaggerException(err)) {
          const ex: SwaggerException = err as SwaggerException;
          if (ex.status === 401) {
            this.alertService.error('Login failed. Please type again.');
          }
          if (ex.status === 403) {
            this.alertService.warn('You have been locked out. Please try again later.');
          }
        }
      }, () => {
        console.log('Login complete.');
        this.loginForm.reset();
      });
  }

  logout() {
    this.authService.logout()
      .subscribe(response => {
        console.log(response);
      }, err => {
        console.log(err);
      }, () => {
        console.log('Logout complete.');
      });
  }

}
