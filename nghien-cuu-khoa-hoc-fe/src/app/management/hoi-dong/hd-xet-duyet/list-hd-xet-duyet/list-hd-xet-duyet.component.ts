import { BienBanHoiDongThuyetMinhService } from './../../../../core/services/management/hoi-dong/bien-ban-hoi-dong-thuyet-minh.service';
import { NhanVienEd } from 'src/app/core/models/management/de-tai/nhan-vien-ed.model';
import { HoiDongDuyetThuyetMinhGet, ThanhVienHoiDongsGet }
  from './../../../../core/models/management/hoi-dong/hoi-dong-duyet-thuyet-minh-get.model';
import { HoiDongKiemDuyetService } from './../../../../core/services/management/hoi-dong/hoi-dong-kiem-duyet.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { MessageConstant } from 'src/app/core/constants/message.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { BreadCrumb } from 'src/app/core/models/common/breadcrumb.model';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { Paginate } from 'src/app/shared/widget/paginate/paginate.model';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { MessageTooltipConstant } from 'src/app/core/constants/message-tooltip.constant';

@Component({
  selector: 'app-list-hd-xet-duyet',
  templateUrl: './list-hd-xet-duyet.component.html',
  styleUrls: ['./list-hd-xet-duyet.component.scss']
})
export class ListHdXetDuyetComponent implements OnInit {

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'vi';
  ///////////////////////////////

  // breadcrum
  breadcrumbObj: BreadCrumb = new BreadCrumb();

  messageTooltipConstant = MessageTooltipConstant;

  // modal ref
  modalRef: NzModalRef;
  modalDefaultWidth = 400;
  modalData: ModalData<HoiDongDuyetThuyetMinhGet> = new ModalData<HoiDongDuyetThuyetMinhGet>();
  thanhVienHoiDongs: NhanVienEd[];

  // table
  listThanhVienHoiDongView: HoiDongDuyetThuyetMinhGet[] = [];
  listHoiDongKiemDuyet: Paginate<HoiDongDuyetThuyetMinhGet> = new Paginate<HoiDongDuyetThuyetMinhGet>();
  searchValue = '';
  searchValueHoiDongKiemDuyet = new Subject<string>();
  hoiDong: HoiDongDuyetThuyetMinhGet;
  toggleModalListDetai = [];
  toggleModalListThanhVien = [];
  toggleModalListBienBan = [];

  indexToggleModalDetai = 0;
  indexToggleModalThanhVien = 0;
  indexToggleModalBienBan = 0;

  constructor(
    private modalService: NzModalService,
    private hoiDongKiemDuyetSvc: HoiDongKiemDuyetService,
    private bienBanHoiDongSvc: BienBanHoiDongThuyetMinhService,
  ) { }

  ngOnInit() {
    this.breadcrumbObj.heading = this.languageData[this.langCode].CENSOR_COUNCILS;
    this.breadcrumbObj.lstBreadcrumb = [
      {
        title: this.languageData[this.langCode].COUNCIL_MENBERS,
        link: UrlConstant.ROUTE.MANAGEMENT.HOI_DONG
      }
    ];
    this.getAllHoiDongKiemDuyet();
    this.searchValueHoiDongKiemDuyet.pipe(debounceTime(300))
      .subscribe(searchValue => {
        this.getAllHoiDongKiemDuyet(searchValue);
      });
  }

  modalListDeTai(hoiDong: HoiDongDuyetThuyetMinhGet, index: number) {
    this.toggleModalListDetai.map(x=>{
      x.check = false;
    });
    this.toggleModalListThanhVien.map(x=>{
      x.check = false;
    });
    this.toggleModalListBienBan.map(x=>{
      x.check = false;
    });
    this.hoiDong = hoiDong;
    this.toggleModalListDetai[index].check = true;
    this.toggleModalListThanhVien[index].check = false;
    this.toggleModalListBienBan[index].check = false;
    this.indexToggleModalDetai = index;
    this.indexToggleModalThanhVien = index;
    this.indexToggleModalBienBan = index;
  }

  modalListThanhVien(thanhVienHoiDongs: ThanhVienHoiDongsGet[], index: number) {
    this.thanhVienHoiDongs = thanhVienHoiDongs.map(x => ({
      chucVu: x.thanhVien.chucVu,
      chucVuId: x.thanhVien.chucVuId,
      dienThoaiDiDong: x.thanhVien.dienThoaiDiDong,
      donVi: x.thanhVien.donVi,
      donViId: x.thanhVien.donViId,
      email: x.thanhVien.email,
      gioiTinh: x.thanhVien.gioiTinh,
      hoTen: x.thanhVien.hoTen,
      maDonVi: x.thanhVien.maDonVi,
      ngaySinh: x.thanhVien.ngaySinh,
      soHieuCongChuc: x.thanhVien.soHieuCongChuc,
      hocHam: x.thanhVien.hocHam,
      hocVi: x.thanhVien.hocVi,
      taiKhoanNganHang: x.thanhVien.taiKhoanNganHang,
      vaiTro: x.vaiTro,
      isEdit: false
    }));
    this.toggleModalListDetai.map(x=>{
      x.check = false;
    });
    this.toggleModalListThanhVien.map(x=>{
      x.check = false;
    });
    this.toggleModalListBienBan.map(x=>{
      x.check = false;
    });
    this.toggleModalListDetai[index].check = false;
    this.toggleModalListThanhVien[index].check = true;
    this.toggleModalListBienBan[index].check = false;
    this.indexToggleModalDetai = index;
    this.indexToggleModalThanhVien = index;
    this.indexToggleModalBienBan = index;
  }

  modalListBienBanHoiDong(hoiDong: HoiDongDuyetThuyetMinhGet, index: number) {
    this.toggleModalListDetai.map(x=>{
      x.check = false;
    });
    this.toggleModalListThanhVien.map(x=>{
      x.check = false;
    });
    this.toggleModalListBienBan.map(x=>{
      x.check = false;
    });
    this.hoiDong = hoiDong;
    this.toggleModalListDetai[index].check = false;
    this.toggleModalListThanhVien[index].check = false;
    this.toggleModalListBienBan[index].check = true;
    this.indexToggleModalDetai = index;
    this.indexToggleModalThanhVien = index;
    this.indexToggleModalBienBan = index;
    this.checkHaveBienBan();
  }

  onSearch() {
    this.listHoiDongKiemDuyet.currentPage = 1;
    this.getAllHoiDongKiemDuyet();
  }

  getAllHoiDongKiemDuyet(searchValue?: string) {
    this.hoiDongKiemDuyetSvc.getHoiDongKiemDuyetPaging(
      this.listHoiDongKiemDuyet.currentPage - 1,
      this.listHoiDongKiemDuyet.limit,
      searchValue)
      .subscribe(res => {
        this.listHoiDongKiemDuyet.data = res.content;
        this.listHoiDongKiemDuyet.currentPage = res.pageable.pageNumber + 1;
        this.listHoiDongKiemDuyet.limit = res.pageable.pageSize;
        this.listHoiDongKiemDuyet.totalPage = res.totalPages;
        this.listHoiDongKiemDuyet.totalItem = res.totalElements;
        this.checkHaveBienBan();
        this.mappingVarCheckBtnShowForm(res.content);
      });
  }

  mappingVarCheckBtnShowForm(listHoiDongTm: HoiDongDuyetThuyetMinhGet[]) {
    this.toggleModalListBienBan = listHoiDongTm.map(x => ({
      id: x.id,
      check: false,
    }));
    this.toggleModalListDetai = listHoiDongTm.map(x => ({
      id: x.id,
      check: false,
    }));
    this.toggleModalListThanhVien = listHoiDongTm.map(x => ({
      id: x.id,
      check: false,
    }));
  }

  checkHaveBienBan() {
    this.listHoiDongKiemDuyet.data.map(x =>
      this.bienBanHoiDongSvc.getBienBanHoiDongKiemDuyetByIdHoiDongPaging(
        x.id, 0, 20
      ).subscribe(res => {
        if (res.totalElements > 0) {
          x.bienBan = true;
        } else {
          x.bienBan = false;
        }
      })
    );
  }

  modalCreate(template: TemplateRef<unknown>, modalWidth?: number) {
    this.modalData.action = SystemConstant.ACTION.ADD;
    this.openModal(template, modalWidth ? modalWidth : this.modalDefaultWidth);
  }

  modalEdit(template: TemplateRef<unknown>, data: HoiDongDuyetThuyetMinhGet, modalWidth?: number) {
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

  pageChanged(page: Paginate<HoiDongDuyetThuyetMinhGet>) {
    this.listHoiDongKiemDuyet = page;
    this.getAllHoiDongKiemDuyet();
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
      this.getAllHoiDongKiemDuyet();
      this.checkHaveBienBan();
    }
    this.modalRef.destroy();
  }

  viewDanhSachThanhVienHoiDong(template: TemplateRef<unknown>, danhSach: HoiDongDuyetThuyetMinhGet[]): void {
    this.listThanhVienHoiDongView = danhSach;
    this.openModal(template, 800);
  }

  checkCreateBienBan(check: boolean) {
    if (check) {
      this.checkHaveBienBan();
    }
  }

}
