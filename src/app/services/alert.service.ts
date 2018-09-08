import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject, empty } from 'rxjs';
import { AlertType, Alert } from '../models/alert';
import { SwaggerException } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private subject = new Subject<Alert>();
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

  handle500Error(err: any): void {
    if (SwaggerException.isSwaggerException(err)) {
      const response = JSON.parse(err.response);
      // this will data object is a exception which is ISerializable and as a result will not be camelCased.
      console.log(response.data);
    }
  }

  getAlert(): Observable<Alert> {
    return this.subject.asObservable();
  }

/*   getAlertNoDuplicates(): Observable<Alert> {
    return this.subject.asObservable().pipe(
        groupBy(x => x.key),
        mergeMap(reduce((acc, curr) => [...acc, ...curr], []))
      );
  } */

  alert(type: AlertType, message: string, key: string, keepAfterRouteChange = false) {
      this.keepAfterRouteChange = keepAfterRouteChange;
      this.subject.next(<Alert>{ type: type, message: message, key: key, count: 1 });
  }

  clear() {
    // clears all alerts
    this.subject.next();
  }
}
