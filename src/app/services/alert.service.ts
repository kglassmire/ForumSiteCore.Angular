import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { AlertType, Alert } from '../models/alert';
import { groupBy, mergeMap, reduce } from 'rxjs/operators';

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
