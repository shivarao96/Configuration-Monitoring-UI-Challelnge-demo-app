import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SystemConfigHandlerService } from 'src/app/services/systemConfigHandler/system-config-handler.service';
import { UserHandlerService } from 'src/app/services/userHandler/user-handler.service';

@Component({
  selector: 'app-main-section',
  templateUrl: './main-section.component.html',
  styleUrls: ['./main-section.component.scss'],
})
export class MainSectionComponent implements OnInit {

    selectedTab: string = '';
    userData: any = null;
    systemData: any = null;

    constructor(
        private router: Router
    ) {}

    ngOnInit(): void {
        this.setCurrentAction(this.router.url)
    }

    setCurrentAction(url: string): void {
        /** istanbul ignore else */
        if(url) {
            if (url.includes('configuration')) {
                this.selectedTab = 'configuration';
            } else if (url.includes('user')) {
                this.selectedTab = 'user';
            }
        }
    }

    enableConfigurationTab() : void {
        this.selectedTab = 'configuration';
        this.router.navigate(['configuration']);
    }

    enableUserTab() : void {
        this.selectedTab = 'user';
        this.router.navigate(['user']);
    }

}
