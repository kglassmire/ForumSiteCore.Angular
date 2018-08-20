import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { ToastType, Toast } from '../models/toast';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private subject = new Subject<Toast>();
  private keepAfterRouteChange = false;

  constructor(private router: Router) {
    // clear alert mesage on route change unless flag indicates to persist
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterRouteChange) {
          // only keep for a single route change
          this.keepAfterRouteChange = false;
        } else {
          this.clear();
        }

      }
    });
  }

  getAlert(): Observable<any> {
    return this.subject.asObservable();
  }

  success(message: string, keepAfterRouteChange = false) {
    this.alert(ToastType.Success, message, keepAfterRouteChange);
  }

  error(message: string, keepAfterRouteChange = false) {
      this.alert(ToastType.Error, message, keepAfterRouteChange);
  }

  info(message: string, keepAfterRouteChange = false) {
      this.alert(ToastType.Info, message, keepAfterRouteChange);
  }

  warn(message: string, keepAfterRouteChange = false) {
      this.alert(ToastType.Warning, message, keepAfterRouteChange);
  }

  alert(type: ToastType, message: string, keepAfterRouteChange = false) {
      this.keepAfterRouteChange = keepAfterRouteChange;
      this.subject.next(<Toast>{ type: type, message: message });
  }

  clear() {
    // clears all alerts
    this.subject.next();
  }
}
