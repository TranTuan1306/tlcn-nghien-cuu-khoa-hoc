import { CauHinhBieuMau } from './../../../../core/models/management/cau-hinh/cau-hinh-bieu-mau.model';
import { CauHinhBieuMauService } from './../../../../core/services/management/cau-hinh/cau-hinh-bieu-mau.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { BreadCrumb } from 'src/app/core/models/common/breadcrumb.model';
import { ModalData } from 'src/app/core/models/common/modal-data.model';


@Component({
  selector: 'app-list-cau-hinh-bieu-mau',
  templateUrl: './list-cau-hinh-bieu-mau.component.html',
  styleUrls: ['./list-cau-hinh-bieu-mau.component.scss']
})
export class ListCauHinhBieuMauComponent implements OnInit {

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'vi';
  ///////////////////////////////

  // breadcrum
  breadcrumbObj: BreadCrumb = new BreadCrumb();

  //table
  listCauHinhEmail: CauHinhBieuMau[] = [];
  loadingTable = true;
  isShowCreate = false;

  cauHinhBieuMau: CauHinhBieuMau;
  // modal ref
  modalData: ModalData<CauHinhBieuMau> = new ModalData<CauHinhBieuMau>();
  modalRef: NzModalRef;
  modalDefaultWidth = 400;

  constructor(
    private modalService: NzModalService,
    private cauHinhBieuMauSvc: CauHinhBieuMauService
  ) {}

  ngOnInit(): void {
    this.breadcrumbObj.heading = this.languageData[this.langCode].FORM;
    this.breadcrumbObj.lstBreadcrumb = [
      {
        title: this.languageData[this.langCode].SETTING,
        link: UrlConstant.ROUTE.MANAGEMENT.FORM
      }
    ];
    this.getCauHinhBieuMau();
  }

  getCauHinhBieuMau(): void {
    this.loadingTable = true;
    this.cauHinhBieuMauSvc.getCauHinhBieuMauPaging(0, 1)
      .subscribe(res => {
        console.log(res.content);
        if (res.content.length === 0) {
          this.isShowCreate = true;
          this.cauHinhBieuMau = res.content[0];
          this.loadingTable = false;
        } else {
          this.cauHinhBieuMau = res.content[0];
          this.loadingTable = false;
        }
      }, () => this.loadingTable = false);
  }


  // open modal edit
  modalEdit(template: TemplateRef<unknown>, data: CauHinhBieuMau, modalWidth?: number) {
    this.modalData.action = SystemConstant.ACTION.EDIT;
    this.modalData.data = data;
    this.openModal(template, modalWidth ? modalWidth : this.modalDefaultWidth);
  }

  // open modal create
  modalAdd(template: TemplateRef<unknown>, modalWidth?: number) {
    this.modalData.action = SystemConstant.ACTION.ADD;
    this.openModal(template, modalWidth ? modalWidth : this.modalDefaultWidth);
  }

  openModal(template: TemplateRef<unknown>, modalWidth: number): void {
    this.modalRef = this.modalService.create({
      nzWidth: modalWidth,
      nzTitle: (this.modalData.action === SystemConstant.ACTION.ADD ? this.languageData[this.langCode].CREATING
        : this.languageData[this.langCode].EDITING) + this.breadcrumbObj.heading,
      nzContent: template,
      nzFooter: null,
      nzMaskClosable: false,
      nzClosable: true,
      // nzOnOk: () => this.closeModal(),
      // nzOnCancel: () => this.closeModal()
    });
  }

  closeModal(status: boolean): void {
    if (status) {
      this.getCauHinhBieuMau();
    }
    this.getCauHinhBieuMau();
    this.modalRef.destroy();
  }

}
