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
    this.alertService.getAlert().subscribe((alert: Alert) => {
      if (!alert) {
        this.alerts = new Array<Alert>();
        return;
      }

      this.alerts.push(alert);
    });
  }

  removeAlert(alert: Alert) {
    this.alerts = this.alerts.splice(this.alerts.indexOf(alert), 1);
  }

  cssClass(alert: Alert) {
    if (!alert) {
      return;
    }

    switch (alert.type) {
      case AlertType.Success:
        return 'alert alert-success';
      case AlertType.Error:
        return 'alert alert-danger';
      case AlertType.Info:
        return 'alert alert-info';
      case AlertType.Warning:
        return 'alert alert-warning';
    }
  }
}
