import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LoggerHandlerService } from '@app/services/loggerHandler/logger-handler.service';
import { Subject, debounceTime, distinctUntilChanged, filter } from 'rxjs';

@Component({
  selector: 'app-logger-console',
  templateUrl: './logger-console.component.html',
  styleUrls: ['./logger-console.component.scss'],
  providers: [LoggerHandlerService]
})
export class LoggerConsoleComponent implements OnInit, AfterViewInit {

  @ViewChildren('theLastList', { read: ElementRef })
  theLastList: QueryList<ElementRef> | null = null;

  loggerType: string = 'user';

  enableLogger: boolean = false;
  loggerInfo: any = null;
  openUploader: boolean = false;

  observer: any;

  totalPages: number = 0;
  currentPage: number = 0;

  searchedVal: string = '';
  searchValQuery: Subject<string> = new Subject<string>();

  showConsoleLoader: boolean = false;

  constructor(
    private router: Router,
    private loggerHandler: LoggerHandlerService
  ) { }

  ngAfterViewInit(): void {
    this.searchValQuery
    .pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe((res) => {
      console.log(res);
      this.getLoggerInfo(0, 'replace');
    })
    if(this.theLastList) {
      this.theLastList.changes.subscribe((d) => {
        if (d.last) this.observer.observe(d.last.nativeElement);
      });
    }
  }

  ngOnInit(): void {
    this.setCurrentAction(this.router.url);
    this.intersectionObserver();
  }

 

  openLogger() {
    /**istanbul ignore else */
    if (!this.loggerInfo || !this.router.url.includes(this.loggerType)) {
      this.setCurrentAction(this.router.url);
      this.getLoggerInfo();
    } else {
      this.enableLogger = true;
    }
  }

  setCurrentAction(url: any) {
    if (url) {
      if (url.includes('configuration')) {
        this.loggerType = 'configuration';
      } else if (url.includes('user')) {
        this.loggerType = 'user';
      }
    }
  }

  uploadUserConfig(event: FormData) {
    this.loggerHandler.uploadLoggerInfo(event).subscribe((res) => {
      // toaster
      this.openUploader = false;
      this.getLoggerInfo();
    }, err => {
      // toaster
    });
  }

  getLoggerInfo(offset = 0, action = 'replace') {
    this.loggerHandler.getLoggerInfo({
      offset,
      searchTerm: this.searchedVal,
      limit: 100,
      filter: this.loggerType
    }).subscribe((res) => {
      if (action === 'replace') {
        this.loggerInfo = res.body.data;
      } else {
        this.loggerInfo.push(...res.body.data)
      }
      this.totalPages = (res.body.count / 100);
      this.openUploader = false;
      this.enableLogger = true;
    }, err => {
      this.openUploader = true;
      // toaster
    }, () => {
      this.showConsoleLoader = false;
    });
  }

  closeLogger() {
    this.enableLogger = false;
  }

  intersectionObserver() {
    let options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    this.observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        if (this.currentPage < this.totalPages) {
          this.currentPage++;
          this.showConsoleLoader = true;
          this.getLoggerInfo(this.currentPage, 'add');
        }
      }
    }, options);
  }



  searchLogs(query: string) {
    this.searchValQuery.next(this.searchedVal);
  }

}
