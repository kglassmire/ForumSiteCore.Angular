import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../services/alert.service';
import { Alert, AlertType } from '../../models/alert';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  alerts: Array<Alert> = new Array<Alert>();

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.alertService.getAlert()
    .subscribe((alert: Alert) => {
      if (!alert) {
        this.alerts = new Array<Alert>();
        return;
      }

      const existingElement: Alert | undefined = this.alerts.find(x => x.key === alert.key);
      if (existingElement !== undefined) {
        existingElement.count++;
      } else {
        this.alerts.push(alert);
      }
    });
  }

  removeAlert(alert: Alert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }

  getTypeName(alert: Alert) {
    switch (alert.type) {
      case AlertType.Error:
        return 'danger';
      case AlertType.Warning:
        return 'warning';
      case AlertType.Info:
        return 'info';
      case AlertType.Success:
        return 'success';
    }
  }

  getAlertFormattedMessage(alert: Alert) {
    if (alert.count === 0 || alert.count === 1) {
      return alert.message;
    } else {
      return `${alert.message} (${alert.count})`;
    }
  }
}
