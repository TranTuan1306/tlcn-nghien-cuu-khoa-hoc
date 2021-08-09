import { Subject } from 'rxjs';
import { ThoiGianQuyTrinh } from './../../../../core/models/management/cau-hinh/thoi-gian-quy-trinh.model';
import { ThoiGianQuyTrinhService } from './../../../../core/services/management/cau-hinh/thoi-gian-quy-trinh.service';
import { HoiDongNghiemThuService } from 'src/app/core/services/management/hoi-dong/hoi-dong-nghiem-thu.service';
import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { MessageConstant } from 'src/app/core/constants/message.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { BreadCrumb } from 'src/app/core/models/common/breadcrumb.model';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { DeTai } from 'src/app/core/models/management/de-tai/de-tai.model';
import { ThanhVienHoiDongNghiemThu } from 'src/app/core/models/management/hoi-dong/hoi-dong-nghiem-thu.model';
import { HoiDongNghiemThu } from 'src/app/core/models/management/hoi-dong/hoi-dong-nghiem-thu.model';
import { Paginate } from 'src/app/shared/widget/paginate/paginate.model';
import { debounceTime } from 'rxjs/operators';
import { MessageTooltipConstant } from 'src/app/core/constants/message-tooltip.constant';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { FileControllerService } from 'src/app/core/services/common/file-controller.service';

@Component({
  selector: 'app-list-hd-nghiem-thu',
  templateUrl: './list-hd-nghiem-thu.component.html',
  styleUrls: ['./list-hd-nghiem-thu.component.scss']
})
export class ListHdNghiemThuComponent implements OnInit {

  @ViewChild('uploadGioiThieuThanhVien') uploadGioiThieuHoiDong: ElementRef<HTMLElement>;

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'vi';
  ///////////////////////////////

  listTrangThaiHoiDongTitle = SystemConstant.TRANG_THAI_HOI_DONG_TITLE[this.langCode];
  messageTooltipConstant = MessageTooltipConstant[this.langCode];

  // breadcrum
  breadcrumbObj: BreadCrumb = new BreadCrumb();
  trangThaiHoiDong = SystemConstant.TRANG_THAI_HOI_DONG;

  // modal ref
  modalRef: NzModalRef;
  modalDefaultWidth = 400;
  modalData: ModalData<unknown> = new ModalData<unknown>();
  modalDataDuyet: ModalData<HoiDongNghiemThu> = new ModalData<HoiDongNghiemThu>();
  modalDataEdit: ModalData<HoiDongNghiemThu> = new ModalData<HoiDongNghiemThu>();
  currentTab = 1;
  truongDonVi = false;

  //Search
  searchTimeProcessChanged = new Subject<string>();

  // table
  lazyLoadingTable = false;

  listHoiDongNghiemThu: Paginate<HoiDongNghiemThu> = new Paginate<HoiDongNghiemThu>();
  listThanhVienHoiDongView: ThanhVienHoiDongNghiemThu[] = [];
  listDeTai: Paginate<DeTai> = new Paginate<DeTai>();
  thoiGianQuyTrinhDefault = '';
  listThoiGianQuyTrinh: ThoiGianQuyTrinh[] = [];

  searchValue = '';
  searchValueDeTai = '';

  isGeneratingCouncil = false;
  idHoiDongEditTheoDetai = '';
  selectedHoiDongId = '';
  selectedFileIdForView = '';

  constructor(
    private modalService: NzModalService,
    private hoiDongNghiemThuSvc: HoiDongNghiemThuService,
    private thoiGianQuyTrinhSvc: ThoiGianQuyTrinhService,
    private fileSvc: FileControllerService,
    private alert: ToastrService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit() {
    this.breadcrumbObj.heading = this.languageData[this.langCode].ACCEPTANCE_COUNCILS;
    this.breadcrumbObj.lstBreadcrumb = [
      {
        title: this.languageData[this.langCode].COUNCILS,
        link: UrlConstant.ROUTE.MANAGEMENT.HOI_DONG
      }
    ];
    this.lazyLoadingTable = true;
    this.getAllThoiGianQuyTrinhPaging();
    this.getThoiGianQuyTrinhActive();
    this.searchTimeProcessChanged.pipe(debounceTime(300))
      .subscribe(searchValue => {
        this.getAllThoiGianQuyTrinhPaging(searchValue);
      });
  }

  onSearch() {
    // this.getAllHoiDongNghiemThuPaging();
  }

  getThoiGianQuyTrinhActive() {
    this.thoiGianQuyTrinhSvc.getThoiGianQuyTrinhActive()
      .subscribe(res => {
        this.thoiGianQuyTrinhDefault = res[0].id;
        this.getAllHoiDongNghiemThuPaging(SystemConstant.TRANG_THAI_HOI_DONG.DE_XUAT_THANH_VIEN);
      });
  }

  getAllThoiGianQuyTrinhPaging(searchValue?: string) {
    this.thoiGianQuyTrinhSvc.getAllPagingThoiGianQuyTrinh(0, 10, searchValue)
      .subscribe(res => {
        this.listThoiGianQuyTrinh = res.content;
      });
  }

  changeProcessTimeLine(thoiGianQuyTrinhId: string) {
    this.hoiDongNghiemThuSvc.getHoiDongNghiemThuPaging(
      thoiGianQuyTrinhId,
      '',
      this.listHoiDongNghiemThu.currentPage - 1,
      this.listHoiDongNghiemThu.limit,
      this.searchValue
    ).subscribe(res => {
      this.listHoiDongNghiemThu.data = res.content;
      this.listHoiDongNghiemThu.totalItem = res.totalElements;
      this.listHoiDongNghiemThu.totalPage = res.totalPages;
      this.listHoiDongNghiemThu.limit = res.pageable.pageSize;
    });
  }


  getAllHoiDongNghiemThuPaging(trangThaiDuyetHoiDong: string) {
    this.hoiDongNghiemThuSvc.getHoiDongNghiemThuPaging(
      this.thoiGianQuyTrinhDefault,
      trangThaiDuyetHoiDong,
      this.listHoiDongNghiemThu.currentPage - 1,
      this.listHoiDongNghiemThu.limit,
      this.searchValue
    ).subscribe(res => {
      this.listHoiDongNghiemThu.data = res.content;
      this.listHoiDongNghiemThu.totalItem = res.totalElements;
      this.listHoiDongNghiemThu.totalPage = res.totalPages;
      this.listHoiDongNghiemThu.limit = res.pageable.pageSize;
      this.lazyLoadingTable = false;
    });
  }

  modalCreate(isGenerate: boolean, template: TemplateRef<unknown>, modalWidth?: number) {
    this.isGeneratingCouncil = isGenerate;
    this.modalData.action = SystemConstant.ACTION.ADD;
    this.openModal(template, modalWidth ? modalWidth : this.modalDefaultWidth);
  }

  modalEdit(template: TemplateRef<unknown>, data: HoiDongNghiemThu, modalWidth?: number) {
    this.modalDataEdit.action = SystemConstant.ACTION.EDIT;
    this.modalDataEdit.data = data;
    this.modalRef = this.modalService.create({
      nzWidth: modalWidth,
      nzTitle: this.languageData[this.langCode].UPDATE + ' ' + this.languageData[this.langCode].ACCEPTANCE_COUNCILS,
      nzContent: template,
      nzFooter: null,
      nzMaskClosable: false,
      nzClosable: true,
    });
  }

  modalApprove(template: TemplateRef<unknown>, data: HoiDongNghiemThu, modalWidth?: number) {
    this.modalDataDuyet.data = data;
    this.modalDataEdit.action = SystemConstant.ACTION.APPROVE;
    this.modalData.action = SystemConstant.ACTION.EDIT;
    this.modalData.data = data;
    this.modalRef = this.modalService.create({
      nzWidth: modalWidth,
      nzTitle: this.languageData[this.langCode].APPROVE + ' ' + this.languageData[this.langCode].PROPOSING_THE_ACCEPTANCE_COMMITTEE,
      nzContent: template,
      nzFooter: null,
      nzMaskClosable: false,
      nzClosable: true,
    });
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
    this.listHoiDongNghiemThu = page;
    this.getAllHoiDongNghiemThuPaging(SystemConstant.TRANG_THAI_HOI_DONG.KHOI_TAO);
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
    });
  }

  closeModal(returnData: { check: boolean; currentTab: number }): void {
    const listTrangThai = [SystemConstant.TRANG_THAI_HOI_DONG.KHOI_TAO
      , SystemConstant.TRANG_THAI_HOI_DONG.DE_XUAT_THANH_VIEN
      , SystemConstant.TRANG_THAI_HOI_DONG.DA_DUYET_THANH_VIEN];
    if (returnData.check) {
      this.getAllHoiDongNghiemThuPaging(listTrangThai[this.currentTab]);
    }
    this.modalRef.destroy();
  }

  viewDanhSachThanhVienHoiDong(template: TemplateRef<unknown>, danhSach: ThanhVienHoiDongNghiemThu[]): void {
    this.truongDonVi = false;
    this.listThanhVienHoiDongView = danhSach;
    this.modalRef = this.modalService.create({
      nzWidth: 1200,
      nzTitle: this.languageData[this.langCode].COUNCIL_MENBERS,
      nzContent: template,
      nzFooter: null,
      nzMaskClosable: false,
      nzClosable: true,
    });
  }

  changeTab(trangThaiDuyetHoiDong: string, currentTab: number) {
    this.searchValue = '';
    this.currentTab = currentTab;
    this.lazyLoadingTable = true;
    this.listHoiDongNghiemThu.data = [];
    setTimeout(() => {
      this.getAllHoiDongNghiemThuPaging(trangThaiDuyetHoiDong);
    }, 400);
  }

  clickUploadGioiThieuHoiDong(hoiDongId: string): void {
    this.selectedHoiDongId = hoiDongId; // nhớ truyền ID bên uploadMCHopDong() HTML
    this.uploadGioiThieuHoiDong.nativeElement.click();
  }

  uploadFileGioiThieuHoiDong(file: File): void {
    this.spinner.show();
    this.fileSvc.uploadFile(file).subscribe(resFile => {
      this.hoiDongNghiemThuSvc.uploadFileDeXuatThanhVien(resFile.id, this.selectedHoiDongId)
        .subscribe(() => {
          const listTrangThai = [SystemConstant.TRANG_THAI_HOI_DONG.KHOI_TAO
            , SystemConstant.TRANG_THAI_HOI_DONG.DE_XUAT_THANH_VIEN
            , SystemConstant.TRANG_THAI_HOI_DONG.DA_DUYET_THANH_VIEN];
          this.getAllHoiDongNghiemThuPaging(listTrangThai[this.currentTab]);
          this.spinner.hide();
          this.alert.success(MessageConstant[this.langCode].MSG_UPLOADED_DONE);
        }, () => { this.alert.success(MessageConstant[this.langCode].MSG_ERR_SYSTEM); });
    });
  }

  modalViewFileGioiThieuThanhVien(template: TemplateRef<unknown>, fileId: string) {
    this.selectedFileIdForView = fileId;
    this.modalRef = this.modalService.create({
      nzStyle: { top: '20px', width: '100%', maxWidth: '75vmin' },
      nzTitle: null,
      nzMaskClosable: false,
      nzContent: template,
      nzOnOk: () => this.modalRef.close(),
      nzCancelText: null
    });

  }

}
