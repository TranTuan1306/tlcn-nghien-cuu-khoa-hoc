/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { Paginate } from './paginate.model';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'table-paginate',
  templateUrl: './paginate.component.html',
  styleUrls: ['./paginate.component.scss']
})
export class TablePaginateComponent implements OnInit {
  @Input() pageConfig: Paginate<unknown>;
  @Output() pageChange: EventEmitter<Paginate<unknown>> = new EventEmitter<Paginate<unknown>>();
  @Output() numOfItemChange: EventEmitter<Paginate<unknown>> = new EventEmitter<Paginate<unknown>>();

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'vi';
  ///////////////////////////////

  ngOnInit(): void { }

  setPage(page: number): void {
    if (page > 0 && page <= this.pageConfig.totalPage && page !== this.pageConfig.currentPage) {
      this.pageConfig.currentPage = page;
      this.refreshPage();
    }
  }

  changedPage(page: number): void {
    if (page - 1 > 0 && page - 1 < this.pageConfig.totalPage) {
      this.pageConfig.currentPage = page;
      this.refreshPage();
    } else {
      this.pageConfig.currentPage = 1;
      this.refreshPage();
    }
  }

  changedNumOfItem(numOfItem: string): void {
    this.pageConfig.limit = Number.parseInt(numOfItem, 10);
    this.pageConfig.currentPage = 1;
    this.refreshPage();
  }

  refreshPage(): void {
    this.pageChange.emit(this.pageConfig);
  }
}
