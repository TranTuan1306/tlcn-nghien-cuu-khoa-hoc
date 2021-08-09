import { Component, OnInit, TemplateRef } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { ToastrService } from 'ngx-toastr';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { MessageConstant } from 'src/app/core/constants/message.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { BreadCrumb } from 'src/app/core/models/common/breadcrumb.model';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { CauHinhEmail } from 'src/app/core/models/management/cau-hinh/cau-hinh-email.model';
import { CauHinhEmailService } from 'src/app/core/services/management/cau-hinh/cau-hinh-email.service';

@Component({
  selector: 'app-list-cau-hinh-email',
  templateUrl: './list-cau-hinh-email.component.html',
  styleUrls: ['./list-cau-hinh-email.component.scss']
})
export class ListCauHinhEmailComponent implements OnInit {


  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
  ///////////////////////////////

  // breadcrum
  breadcrumbObj: BreadCrumb = new BreadCrumb();

  //table
  listCauHinhEmail: CauHinhEmail[] = [];
  loadingTable = true;
  // listCauHinhEmail = [
  //   {
  //     id: '1',
  //     emailGuiThu: 'abc@gmail.com',
  //     emailNhanThu: 'xyz@gmail.com',
  //     passEmailGuiThu: '121324',
  //     confirmPassEmailGuiThu: '',
  //   }];
  cauHinhMail: CauHinhEmail;
  // modal ref
  modalData: ModalData<CauHinhEmail> = new ModalData<CauHinhEmail>();
  modalRef: NzModalRef;
  modalDefaultWidth = 400;

  constructor(
    private alert: ToastrService,
    private modalService: NzModalService,
    private cauHinhEmailSvc: CauHinhEmailService
  ) {

  }

  ngOnInit(): void {
    this.breadcrumbObj.heading = this.languageData[this.langCode].SETTING_EMAIL;
    this.breadcrumbObj.lstBreadcrumb = [
      {
        title: this.languageData[this.langCode].SETTING,
        link: UrlConstant.ROUTE.MANAGEMENT.EMAIL
      }
    ];
    this.getCauHinhEmail();
  }

  getCauHinhEmail(): void {
    this.loadingTable = true;
    this.cauHinhEmailSvc.getCauHinhEmail()
      .subscribe(res => {
        this.cauHinhMail = res;
        this.loadingTable = false;
        console.log(res);
      }, () => this.loadingTable = false);
  }


  // open modal edit
  modalEdit(template: TemplateRef<unknown>, data: CauHinhEmail, modalWidth?: number) {
    this.modalData.action = SystemConstant.ACTION.EDIT;
    this.modalData.data = data;
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
      this.getCauHinhEmail();
      this.alert.success(MessageConstant[this.langCode].MSG_CREATED_DONE);
    }
    this.modalRef.destroy();
  }

}
