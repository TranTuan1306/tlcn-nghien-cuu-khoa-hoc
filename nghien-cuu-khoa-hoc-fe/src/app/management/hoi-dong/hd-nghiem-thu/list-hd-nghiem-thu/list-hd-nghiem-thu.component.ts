import { Component, OnInit, TemplateRef } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { ToastrService } from 'ngx-toastr';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { MessageConstant } from 'src/app/core/constants/message.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { BreadCrumb } from 'src/app/core/models/common/breadcrumb.model';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { DeTai } from 'src/app/core/models/management/de-tai/de-tai.model';
import { ThanhVienHoiDongThuyetMinh } from 'src/app/core/models/management/hoi-dong/hoi-dong-duyet-tm.model';
import { HoiDongNghiemThu } from 'src/app/core/models/management/hoi-dong/hoi-dong-nghiem-thu.model';
import { Paginate } from 'src/app/shared/widget/paginate/paginate.model';

@Component({
  selector: 'app-list-hd-nghiem-thu',
  templateUrl: './list-hd-nghiem-thu.component.html',
  styleUrls: ['./list-hd-nghiem-thu.component.scss']
})
export class ListHdNghiemThuComponent implements OnInit {

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
  ///////////////////////////////

  // breadcrum
  breadcrumbObj: BreadCrumb = new BreadCrumb();

  // modal ref
  modalRef: NzModalRef;
  modalDefaultWidth = 400;
  modalData: ModalData<unknown> = new ModalData<unknown>();

  // table
  loadingTable = true;
  listHoiDong: Paginate<HoiDongNghiemThu> = new Paginate<HoiDongNghiemThu>();
  listThanhVienHoiDongView: ThanhVienHoiDongThuyetMinh[] = [];
  listDeTai: Paginate<DeTai> = new Paginate<DeTai>();

  searchValue = '';
  searchValueDeTai = '';

  isGeneratingCouncil = false;
  idHoiDongEditTheoDetai = '';

  constructor(
    private modalService: NzModalService,
    private alert: ToastrService,
  ) { }

  ngOnInit() {
    this.breadcrumbObj.heading = this.languageData[this.langCode].ACCEPTANCE_COUNCILS;
    this.breadcrumbObj.lstBreadcrumb = [
      {
        title: this.languageData[this.langCode].COUNCILS,
        link: UrlConstant.ROUTE.MANAGEMENT.HOI_DONG
      }
    ];

    this.getAllHoiDongPaging();
  }

  onSearch() {
    this.listHoiDong.currentPage = 1;
    this.getAllHoiDongPaging();
  }

  onSearchDeTai() {
    this.listDeTai.currentPage = 1;
    this.getAllDeTaiPaging();
  }

  getAllHoiDongPaging() {
    this.loadingTable = true;
    this.listHoiDong.data = [];
    this.listHoiDong.totalItem = 4;
    this.listHoiDong.totalPage = 1;
    this.listHoiDong.limit = 10;
    this.loadingTable = false;
    /*this.hocHamSvc.findAllPaging(
      this.listHocHam.currentPage - 1,
      this.listHocHam.limit,
      this.searchValue)
      .subscribe(res => {
        this.listHocHam.data = res.content;
        this.listHocHam.totalItem = res.totalElements;
        this.listHocHam.totalPage = res.totalPages;
        this.listHocHam.limit = res.pageable.pageSize;
        this.loadingTable = false;
      });*/
  }

  getAllDeTaiPaging() {
    this.loadingTable = true;
    this.listDeTai.data = [];
    this.listDeTai.totalItem = 4;
    this.listDeTai.totalPage = 1;
    this.listDeTai.limit = 10;
    this.loadingTable = false;
    /*this.hocHamSvc.findAllPaging(
      this.listHocHam.currentPage - 1,
      this.listHocHam.limit,
      this.searchValue)
      .subscribe(res => {
        this.listHocHam.data = res.content;
        this.listHocHam.totalItem = res.totalElements;
        this.listHocHam.totalPage = res.totalPages;
        this.listHocHam.limit = res.pageable.pageSize;
        this.loadingTable = false;
      });*/
  }

  modalCreate(isGenerate: boolean, template: TemplateRef<unknown>, modalWidth?: number) {
    this.isGeneratingCouncil = isGenerate;
    this.modalData.action = SystemConstant.ACTION.ADD;
    this.openModal(template, modalWidth ? modalWidth : this.modalDefaultWidth);
  }

  modalEdit(template: TemplateRef<unknown>, data: unknown, modalWidth?: number) {
    this.modalData.action = SystemConstant.ACTION.EDIT;
    this.modalData.data = data;
    this.openModal(template, modalWidth ? modalWidth : this.modalDefaultWidth);
  }

  modalEditHoiDongTheoDeTai(template: TemplateRef<unknown>, data: unknown, modalWidth?: number) {
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
        console.log(id);
      }
    });
  }

  pageChanged(page: Paginate<HoiDongNghiemThu>) {
    this.listHoiDong = page;
    this.getAllHoiDongPaging();
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
      this.getAllDeTaiPaging();
      this.alert.success(MessageConstant[this.langCode].MSG_CREATED_DONE);
    }
    this.modalRef.destroy();
  }

  viewDanhSachThanhVienHoiDong(template: TemplateRef<unknown>, danhSach: ThanhVienHoiDongThuyetMinh[]): void {
    this.listThanhVienHoiDongView = danhSach;
    this.openModal(template, 800);
  }

}
