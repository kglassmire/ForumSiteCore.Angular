import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isCollapsed: Boolean = true;

  showLogin() {
    return !this.authenticationService.isAuthenticated();
  }

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

}
