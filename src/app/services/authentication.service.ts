import { Injectable, Inject, InjectionToken } from '@angular/core';
import { AuthService } from './api.service';

export const COOKIE_NAME = new InjectionToken<string>('COOKIE_NAME');

@Injectable()
export class AuthenticationService {

  constructor(private authService: AuthService, @Inject(COOKIE_NAME) cookieName?: string) { }

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
}
