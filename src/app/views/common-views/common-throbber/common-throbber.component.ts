import { Component, OnInit } from '@angular/core';
import { ThrobberHandlerService } from '@app/services/throbberHandler/throbber-handler.service';

@Component({
  selector: 'app-common-throbber',
  templateUrl: './common-throbber.component.html',
  styleUrls: ['./common-throbber.component.scss']
})
export class CommonThrobberComponent implements OnInit {
  showThrobber: boolean = false;
  constructor(
    private throbberService: ThrobberHandlerService
  ) { }

  ngOnInit() {
    this.throbberService.isLoading.subscribe(val => {
      this.showThrobber = val;
    });
  }
}
