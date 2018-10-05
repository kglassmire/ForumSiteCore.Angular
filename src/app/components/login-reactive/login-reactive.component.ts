import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginVM, AuthService, SwaggerException } from '../../services/api.service';
import { AuthenticationService } from '../../services/authentication.service';
import { AlertService } from '../../services/alert.service';
import { AlertType } from '../../models/alert';

@Component({
  selector: 'app-login-reactive',
  templateUrl: './login-reactive.component.html',
  styleUrls: ['./login-reactive.component.css']
})
export class LoginReactiveComponent implements OnInit {

  loginForm: FormGroup;

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
      rememberMe: true
    };

    this.authService.login(loginDto, '/')
      .subscribe((next) => {
        console.log(next);
      }, (err) => {
        if (SwaggerException.isSwaggerException(err)) {
          const ex: SwaggerException = err as SwaggerException;
          if (ex.status === 401) {
            this.alertService.alert(AlertType.Error, 'Login failed. Please type again.', 'loginFailure');
          }
          if (ex.status === 403) {
            this.alertService.alert(AlertType.Warning, 'You have been locked out. Please try again later.', 'loginLockout');
          }
        }
      }, () => {
        console.log('Login complete.');
        if (this.loginForm) {
          this.alertService.clear();
          this.loginForm.reset();
        }
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
