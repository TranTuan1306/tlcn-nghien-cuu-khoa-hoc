import { Component, OnInit, TemplateRef } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { Paginate } from 'src/app/shared/widget/paginate/paginate.model';

@Component({
  selector: 'app-acceptance-council-suggestion',
  templateUrl: './acceptance-council-suggestion.component.html',
  styleUrls: ['./acceptance-council-suggestion.component.scss', '../../../assets/journey-theme/css/main.css']
})
export class AcceptanceCouncilSuggestionComponent implements OnInit {

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
  ///////////////////////////////

  valueSearch = '';
  listDeTai: Paginate<unknown> = new Paginate<unknown>();

  modalData = new ModalData<string>();

  constructor(
    private nzModalSvc: NzModalService,
  ) { }

  ngOnInit(): void {
    this.onGetAllPaging();
  }

  onGetAllPaging(): void {
    // get all de tai theo don vi cua user login (role TDV)
  }

  onSearch(): void {
    this.listDeTai.currentPage = 1;
    this.onGetAllPaging();
  }

  pageChanged(page: Paginate<unknown>) {
    this.listDeTai = page;
    this.onGetAllPaging();
  }

  openModal(template: TemplateRef<void>, width?: number, action?: string, data?: string): void {
    if (action) { this.modalData.action = action; }
    if (data) { this.modalData.data = data; }
    this.nzModalSvc.create({
      nzTitle: action ? action === SystemConstant.ACTION.ADD ? this.languageData[this.langCode].ACCEPTANCE_COUNCIL_SUGGESTION :
        action === SystemConstant.ACTION.EDIT ?
          `${this.languageData[this.langCode].EDIT} ${this.languageData[this.langCode].ARTICLE}` :
          this.languageData[this.langCode].VIEW_DETAILS : null,
      nzStyle: { top: '20px', width: width ? `${width}px` : '750px' },
      nzContent: template,
      nzFooter: null,
      nzMaskClosable: false
    });
  }

  hidePopup(reload?: boolean): void {
    if (reload) {
      this.onGetAllPaging();
    }
    this.nzModalSvc.closeAll();
  }

}
