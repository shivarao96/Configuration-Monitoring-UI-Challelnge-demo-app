import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-common-pagination',
  templateUrl: './common-pagination.component.html',
  styleUrls: ['./common-pagination.component.scss']
})
export class CommonPaginationComponent {
    pages: number[] = [];
  pageNumber: number = 1;

  @Input() count = 0;
  @Input() recordsPerPage = 0;

  @Output() onPageChange: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnChanges(): any {
    const pageCount = this.getPageCount();
    this.pages = this.getArrayOfPage(pageCount);
    this.pageNumber = 1;
    // this.onPageChange.emit({page: 1, is});
  }

  getPageCount(): number {
    let totalPage = 0;

    /**istanbul ignore else */
    if (this.count > 0 && this.recordsPerPage > 0) {
      const pageCount = this.count / this.recordsPerPage;
      const roundedPageCount = Math.floor(pageCount);

      totalPage = roundedPageCount < pageCount ? roundedPageCount + 1 : roundedPageCount;
    }

    return totalPage;
  }

  getArrayOfPage(pageCount: number): number[] {
    const pageArray = [];
    /**istanbul ignore else */
    if (pageCount > 0) {
      for (let i = 1; i <= pageCount; i++) {
        pageArray.push(i);
      }
    }
    return pageArray;
  }

  onClickPage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.pages.length) {
      this.pageNumber = pageNumber;
      this.onPageChange.emit(this.pageNumber);
    }
  }
}
