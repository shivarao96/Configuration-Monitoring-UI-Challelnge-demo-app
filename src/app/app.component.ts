import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'configuration-and-monitoring-ui-challenge';

  constructor(private router: Router) {}

  navigateToHome() {
    this.router.navigate(['']);
  }
}
