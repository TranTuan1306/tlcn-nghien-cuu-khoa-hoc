import { BieuMauService } from 'src/app/core/services/management/bieu-mau/bieu-mau.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalData } from './../../../../core/models/common/modal-data.model';
import { BienBanHoiDongThuyetMinhService } from './../../../../core/services/management/hoi-dong/bien-ban-hoi-dong-thuyet-minh.service';
import { BienBanHoiDongThuyetMinhGet } from './../../../../core/models/management/hoi-dong/bien-ban-hoi-dong-tm-get.model';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, TemplateRef } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
// import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { MessageConstant } from 'src/app/core/constants/message.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { BreadCrumb } from 'src/app/core/models/common/breadcrumb.model';
import { DeTai } from 'src/app/core/models/management/de-tai/de-tai.model';
import { HoiDongDuyetThuyetMinhGet } from 'src/app/core/models/management/hoi-dong/hoi-dong-duyet-thuyet-minh-get.model';
import { DeTaiAdminService } from 'src/app/core/services/management/de-tai/de-tai-admin.service';
import { Paginate } from 'src/app/shared/widget/paginate/paginate.model';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-list-bien-ban-hoi-dong',
  templateUrl: './list-bien-ban-hoi-dong.component.html',
  styleUrls: ['./list-bien-ban-hoi-dong.component.scss']
})
export class ListBienBanHoiDongComponent implements OnInit, OnChanges {
  @Input() hoiDong: HoiDongDuyetThuyetMinhGet;
  @Output() returnData: EventEmitter<boolean> = new EventEmitter();
  @Output() returnCheck: EventEmitter<boolean> = new EventEmitter();

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'vi';
  ///////////////////////////////

  // breadcrum
  breadcrumbObj: BreadCrumb = new BreadCrumb();

  //Param truyền vào modal
  idDeTai: string;
  idHoiDong: string;
  checkShowBtnAddNew = false;


  // modal ref
  modalRef: NzModalRef;
  modalDefaultWidth = 400;
  modalData: ModalData<string[]> = new ModalData<string[]>();
  modalDataUploadBienBan: ModalData<BienBanHoiDongThuyetMinhGet> = new ModalData<BienBanHoiDongThuyetMinhGet>();
  modalBieuDiemData: ModalData<BienBanHoiDongThuyetMinhGet> = new ModalData<BienBanHoiDongThuyetMinhGet>();

  modalDataTemp: string[] = [];

  deTaiId: string;
  hoiDongId: string;
  bienBanHoiDongId: string;

  // table
  listThanhVienHoiDongView: HoiDongDuyetThuyetMinhGet[] = [];
  listHoiDongKiemDuyet: Paginate<HoiDongDuyetThuyetMinhGet> = new Paginate<HoiDongDuyetThuyetMinhGet>();
  listBienBanHoiDongKiemDuyet: Paginate<BienBanHoiDongThuyetMinhGet> = new Paginate<BienBanHoiDongThuyetMinhGet>();
  listDeTai: Paginate<DeTai> = new Paginate<DeTai>();
  searchValue = '';
  searchValueHoiDongKiemDuyet = new Subject<string>();
  searchValueBienBanHoiDong = new Subject<string>();
  constructor(
    private modalService: NzModalService,
    // private alert: ToastrService,
    private bienBanHoiDongXetDuyetSvc: BienBanHoiDongThuyetMinhService,
    private deTaiAdminSvc: DeTaiAdminService,
    private spinner: NgxSpinnerService,
    private bieuMauSvc: BieuMauService
  ) { }

  ngOnInit() {
    this.breadcrumbObj.heading = this.languageData[this.langCode].MINURES_OF_COUNCIL;
    this.breadcrumbObj.lstBreadcrumb = [
      {
        title: this.languageData[this.langCode].MINURES_OF_COUNCIL,
        link: UrlConstant.ROUTE.MANAGEMENT.HOI_DONG
      }
    ];
    this.getBienBanHoiDongByIdHoiDongSetShowBtnAddNew();
    this.searchValueBienBanHoiDong.pipe(debounceTime(300))
      .subscribe(searchValue => {
        this.getBienBanHoiDongByIdHoiDong(searchValue);
      });
  }

  ngOnChanges() {
    this.getBienBanHoiDongByIdHoiDong();
    this.getBienBanHoiDongByIdHoiDongSetShowBtnAddNew();
  }

  onSearch() {
    this.listHoiDongKiemDuyet.currentPage = 1;
    this.getBienBanHoiDongByIdHoiDong();
  }

  getBienBanHoiDongByIdHoiDong(searchValue?: string) {
    this.bienBanHoiDongXetDuyetSvc.getBienBanHoiDongKiemDuyetByIdHoiDongPaging(
      this.hoiDong.id,
      this.listHoiDongKiemDuyet.currentPage - 1,
      this.listHoiDongKiemDuyet.limit,
      searchValue
    ).subscribe(res => {
      this.listBienBanHoiDongKiemDuyet.data = res.content;
      this.listBienBanHoiDongKiemDuyet.currentPage = res.pageable.pageNumber + 1;
      this.listBienBanHoiDongKiemDuyet.limit = res.pageable.pageSize;
      this.listBienBanHoiDongKiemDuyet.totalPage = res.totalPages;
      this.listBienBanHoiDongKiemDuyet.totalItem = res.totalElements;
    });
  }

  getBienBanHoiDongByIdHoiDongSetShowBtnAddNew(searchValue?: string) {
    this.bienBanHoiDongXetDuyetSvc.getBienBanHoiDongKiemDuyetByIdHoiDongPaging(
      this.hoiDong.id,
      this.listHoiDongKiemDuyet.currentPage - 1,
      this.listHoiDongKiemDuyet.limit,
      searchValue
    ).subscribe(res => {
      this.listBienBanHoiDongKiemDuyet.data = res.content;
      this.listBienBanHoiDongKiemDuyet.currentPage = res.pageable.pageNumber + 1;
      this.listBienBanHoiDongKiemDuyet.limit = res.pageable.pageSize;
      this.listBienBanHoiDongKiemDuyet.totalPage = res.totalPages;
      this.listBienBanHoiDongKiemDuyet.totalItem = res.totalElements;
      if (res.totalElements === this.hoiDong.deTaiIds.length) {
        this.checkShowBtnAddNew = false;
      } else { this.checkShowBtnAddNew = true; }
    });
  }

  getDeTaiByListId(searchValue?: string) {
    this.deTaiAdminSvc.getDeTaiByListIdPaging(
      this.hoiDong.deTaiIds,
      this.listDeTai.currentPage - 1,
      this.listDeTai.limit,
      searchValue)
      .subscribe(res => {
        this.listDeTai.data = res.content;
        this.listDeTai.currentPage = res.pageable.pageNumber + 1;
        this.listDeTai.limit = res.pageable.pageSize;
        this.listDeTai.totalPage = res.totalPages;
        this.listDeTai.totalItem = res.totalElements;
      });
  }

  modalCreate(template: TemplateRef<unknown>, modalWidth?: number) {
    this.modalData.data = this.hoiDong.deTaiIds;
    this.listBienBanHoiDongKiemDuyet.data.forEach(x=>{
      this.modalDataTemp.push(x.deTai.id);
    });
    // this.modalData.data = this.modalData.data.concat(this.modalDataTemp);
    this.modalData.data = this.modalData.data.filter(val => !this.modalDataTemp.includes(val));
    this.modalRef = this.modalService.create({
      nzWidth: modalWidth,
      nzTitle: this.languageData[this.langCode].CREATE_MINURES_COUNCIL,
      nzContent: template,
      nzFooter: null,
      nzMaskClosable: false,
      nzClosable: true,
    });
  }

  openModalPhieuDiem(template: TemplateRef<unknown>, data: BienBanHoiDongThuyetMinhGet, modalWidth?: number) {
    this.modalBieuDiemData.data = data;
    this.openModal(template, modalWidth ? modalWidth : this.modalDefaultWidth);
  }

  openModal(template: TemplateRef<unknown>, modalWidth: number): void {
    this.modalRef = this.modalService.create({
      nzWidth: modalWidth,
      nzTitle: this.languageData[this.langCode].BOARD_SCORE,
      nzContent: template,
      nzFooter: null,
      nzMaskClosable: false,
      nzClosable: true,
      // nzOnOk: () => this.closeModal(),
      // nzOnCancel: () => this.closeModal()
    });
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

  pageChanged(page: Paginate<HoiDongDuyetThuyetMinhGet>) {
    this.listHoiDongKiemDuyet = page;
    this.getBienBanHoiDongByIdHoiDong();
  }

  closeModal(status: boolean): void {
    if (status) {
      this.getBienBanHoiDongByIdHoiDong();
      this.getBienBanHoiDongByIdHoiDongSetShowBtnAddNew();
      this.returnCheck.emit(true);
    }
    this.modalRef.destroy();
  }

  handleDataReturnBieuDiem() {
    this.getBienBanHoiDongByIdHoiDong();
  }

  openModalUploadBienBan(idDeTai: string, bienBanHoiDong: BienBanHoiDongThuyetMinhGet,
    template: TemplateRef<unknown>, modalWidth?: number) {
    this.deTaiId = idDeTai;
    this.hoiDongId = this.hoiDong.id;
    this.bienBanHoiDongId = bienBanHoiDong.id;
    this.modalDataUploadBienBan.data = bienBanHoiDong;
    if (!bienBanHoiDong.ketLuan) {
      this.modalDataUploadBienBan.action = SystemConstant.ACTION.ADD;
    } else {
      this.modalDataUploadBienBan.action = SystemConstant.ACTION.EDIT;
    }
    this.modalRef = this.modalService.create({
      nzWidth: modalWidth,
      nzTitle: (this.modalData.action === SystemConstant.ACTION.ADD ? this.languageData[this.langCode].CREATING
        : this.languageData[this.langCode].EDITING) + this.languageData[this.langCode].UPLOAD_MINURES_COUNCIL,
      nzContent: template,
      nzFooter: null,
      nzMaskClosable: false,
      nzClosable: true,
    });
  }

  exportBienBanHopHoiDongTuyenChon(idBienBan: string) {
    this.spinner.show();
    this.bieuMauSvc.xuatBienBanHoiDongTuyenChon(idBienBan)
      .subscribe(res => {
        this.convertFileFromBlob(res.body, `BM04T-bien-ban-hop-hoi-dong-tuyen-chon(${idBienBan}).docx`);
        this.spinner.hide();
      }, () => this.spinner.hide());
  }

  exportPhieuDanhGiaThuyetMinh(idDeTTai: string, hoiDongXetDuyetId: string) {
    this.spinner.show();
    this.bieuMauSvc.xuatBieuMauDanhGiaThuyetMinh(idDeTTai, hoiDongXetDuyetId)
      .subscribe(res => {
        this.convertFileFromBlob(res.body, `BM03T-phieu-danh-gia-thuyet-minh(${hoiDongXetDuyetId}).docx`);
        this.spinner.hide();
      }, () => this.spinner.hide());
  }


  convertFileFromBlob(data: Blob, fileName: string) {
    const url = window.URL.createObjectURL(data);
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.setAttribute('style', 'display: none');
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }
}
