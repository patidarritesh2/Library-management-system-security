
import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  template: `
    <!-- Show navbar only when logged in -->
    <app-navbar *ngIf="authService.isLoggedIn()"></app-navbar>

    <!-- Angular injects the current route's component here -->
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  constructor(public authService: AuthService) { }
}
