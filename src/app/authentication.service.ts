import { Injectable, OnDestroy, Inject, InjectionToken } from '@angular/core';
import { map, takeUntil } from 'rxjs/operators';
import { AuthService, LoginDto, FileResponse } from './api.service';
import { Subject } from 'rxjs';

export const COOKIE_NAME = new InjectionToken<string>('COOKIE_NAME');

@Injectable()
export class AuthenticationService implements OnDestroy {

  private ngUnsubscribe: Subject<any> = new Subject();

  constructor(private authService: AuthService, @Inject(COOKIE_NAME) cookieName?: string) { }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  getCookie(name: string): any {
    const value = '; ' + document.cookie;
    const parts = value.split('; ' + name + '=');
    if (parts.length === 2) {
      return parts.pop().split(';').shift();
    } else {
      return null;
    }
  }


  isAuthenticated(): boolean {
    if (this.getCookie('ForumSiteCore') !== null) {
      return true;
    }
    return false;
  }

  login(loginDto: LoginDto) {
    this.authService.login(loginDto, '/')
      .pipe(
        map((res: FileResponse) => {
          if (res) {
            if (res.status === 200) {
              loginDto.userName = '';
              loginDto.password = '';
            }
          }
        }),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(response => console.log(response), err => console.log(err));
  }

  logout() {
    this.authService.logout()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => console.log(response), err => console.log(err));
  }
}
