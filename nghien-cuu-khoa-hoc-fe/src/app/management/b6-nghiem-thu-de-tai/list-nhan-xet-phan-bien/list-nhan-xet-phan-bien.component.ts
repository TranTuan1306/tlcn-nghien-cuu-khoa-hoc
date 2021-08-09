import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { ToastrService } from 'ngx-toastr';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { MessageConstant } from 'src/app/core/constants/message.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { BreadCrumb } from 'src/app/core/models/common/breadcrumb.model';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { ThanhVienHoiDongNghiemThu } from 'src/app/core/models/management/hoi-dong/hoi-dong-nghiem-thu.model';
import { HoiDongNghiemThuService } from 'src/app/core/services/management/hoi-dong/hoi-dong-nghiem-thu.service';
import { Paginate } from 'src/app/shared/widget/paginate/paginate.model';

@Component({
  selector: 'app-list-nhan-xet-phan-bien',
  templateUrl: './list-nhan-xet-phan-bien.component.html',
  styleUrls: ['./list-nhan-xet-phan-bien.component.scss']
})
export class ListNhanXetPhanBienComponent implements OnInit {

  @Input() modalDataNhanXetPhanBien: ModalData<ThanhVienHoiDongNghiemThu>;
  @Output() returnData: EventEmitter<boolean> = new EventEmitter();

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
  ///////////////////////////////

  // breadcrum
  breadcrumbObj: BreadCrumb = new BreadCrumb();

  form: FormGroup;

  // modal ref
  modalRef: NzModalRef;
  modalDefaultWidth = 400;
  modalData: ModalData<ThanhVienHoiDongNghiemThu> = new ModalData<ThanhVienHoiDongNghiemThu>();

  // table
  listNhanXetPhanBien: Paginate<ThanhVienHoiDongNghiemThu> = new Paginate<ThanhVienHoiDongNghiemThu>();
  searchValue = '';
  tableLoading = true;


  constructor(
    private modalService: NzModalService,
    private nhanXetPhanBienSvc: HoiDongNghiemThuService,
    private alert: ToastrService,) { }

  ngOnInit() {
    this.breadcrumbObj.heading = this.languageData[this.langCode].BOARD_SCORE;
    this.breadcrumbObj.lstBreadcrumb = [
      {
        title: this.languageData[this.langCode].CATEGORIES,
        link: UrlConstant.ROUTE.MANAGEMENT.DANH_MUC
      }
    ];

    this.getAllDataPaging();
  }

  getAllDataPaging() {
    this.tableLoading = true;
    //  this.listNhanXetPhanBien.data = [{ id: '1',  }];
    this.listNhanXetPhanBien.totalItem = 1;
    this.listNhanXetPhanBien.totalPage = 1;
    this.listNhanXetPhanBien.limit = 5;
    this.tableLoading = false;
    /*this.nhanXetPhanBienSvc.getAllPagingBienBanKiemTra(
      this.listNhanXetPhanBien.currentPage - 1,
      this.listBangDiemHoiDong.limit,
      this.searchValue)
      .subscribe(res => {
        this.listBangDiemHoiDong.data = res.content;
        this.listBangDiemHoiDong.totalItem = res.totalElements;
        this.listBangDiemHoiDong.totalPage = res.totalPages;
        this.listBangDiemHoiDong.limit = res.pageable.pageSize;
        this.tableLoading = false;
      });*/
  }

  onSearch() {
    this.listNhanXetPhanBien.currentPage = 1;
    this.getAllDataPaging();
  }

  modalCreate(template: TemplateRef<unknown>, modalWidth?: number) {
    this.modalData.action = SystemConstant.ACTION.ADD;
    this.openModal(template, modalWidth ? modalWidth : this.modalDefaultWidth);
  }

  modalEdit(template: TemplateRef<unknown>, data: ThanhVienHoiDongNghiemThu, modalWidth?: number) {
    this.modalData.action = SystemConstant.ACTION.EDIT;
    this.modalData.data = data;
    this.openModal(template, modalWidth ? modalWidth : this.modalDefaultWidth);
  }

  modalDelete(id: string) {
    this.modalService.confirm({
      nzWidth: 300,
      nzTitle: MessageConstant[this.langCode].XAC_NHAN_XOA,
      nzContent: MessageConstant[this.langCode].MSG_CONFIRM_DEL,
      nzOkText: MessageConstant[this.langCode].BTN_OK,
      nzCancelText: MessageConstant[this.langCode].BTN_CANCEL,
      nzOnOk: () => {
        this.nhanXetPhanBienSvc.deletePhanBien(id)
          .subscribe(() => {
            this.alert.success(MessageConstant[this.langCode].MSG_DELETED_DONE);
          });
      }
    });
  }

  pageChanged(page: Paginate<ThanhVienHoiDongNghiemThu>) {
    this.listNhanXetPhanBien = page;
    this.getAllDataPaging();
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
      this.getAllDataPaging();
      this.alert.success(MessageConstant[this.langCode].MSG_CREATED_DONE);
    }
    this.modalRef.destroy();
  }

}

