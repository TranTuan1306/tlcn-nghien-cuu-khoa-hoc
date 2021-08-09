import { Component, OnInit, TemplateRef } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { ToastrService } from 'ngx-toastr';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { MessageConstant } from 'src/app/core/constants/message.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { BreadCrumb } from 'src/app/core/models/common/breadcrumb.model';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { LoaiHinhNghienCuu } from 'src/app/core/models/management/danh-muc/loai-hinh-nghien-cuu.model';
import { LoaiHinhNghienCuuService } from 'src/app/core/services/management/danh-muc/loai-hinh-nghien-cuu.service';
import { Paginate } from 'src/app/shared/widget/paginate/paginate.model';

@Component({
  selector: 'app-list-loai-hinh-nghien-cuu',
  templateUrl: './list-loai-hinh-nghien-cuu.component.html',
  styleUrls: ['./list-loai-hinh-nghien-cuu.component.scss']
})
export class ListLoaiHinhNghienCuuComponent implements OnInit {

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'vi';
  ///////////////////////////////

  // breadcrum
  breadcrumbObj: BreadCrumb = new BreadCrumb();

  // modal ref
  modalRef: NzModalRef;
  modalDefaultWidth = 400;
  modalData: ModalData<LoaiHinhNghienCuu> = new ModalData<LoaiHinhNghienCuu>();

  // table
  listLoaiHinhNghienCuu: Paginate<LoaiHinhNghienCuu> = new Paginate<LoaiHinhNghienCuu>();
  searchValue = '';
  tableLoading = true;



  constructor(
    private modalService: NzModalService,
    private loaiHinhNghienCuuSvc: LoaiHinhNghienCuuService,
    private alert: ToastrService) { }

  ngOnInit() {
    this.breadcrumbObj.heading = this.languageData[this.langCode].RESEARCH_TYPE;
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
    //  this.listLoaiHinhNghienCuu.data = [{ id: '1', tenLoaiHinh: 'Giáo dục', tenLoaiHinhEn: 'Education',
    //  maLoaiHinh: '1243', thuTu: 0, trangThai: true }];
    //  this.listLoaiHinhNghienCuu.totalItem = 1;
    //  this.listLoaiHinhNghienCuu.totalPage = 1;
    //  this.listLoaiHinhNghienCuu.limit = 5;
    //  this.tableLoading = false;
    this.loaiHinhNghienCuuSvc.findAllPaging(
      this.listLoaiHinhNghienCuu.currentPage - 1,
      this.listLoaiHinhNghienCuu.limit,
      this.searchValue)
      .subscribe(res => {
        this.listLoaiHinhNghienCuu.data = res.content;
        this.listLoaiHinhNghienCuu.totalItem = res.totalElements;
        this.listLoaiHinhNghienCuu.totalPage = res.totalPages;
        this.listLoaiHinhNghienCuu.limit = res.pageable.pageSize;
        this.tableLoading = false;
      });
  }

  onSearch() {
    this.listLoaiHinhNghienCuu.currentPage = 1;
    this.getAllDataPaging();
  }

  modalCreate(template: TemplateRef<unknown>, modalWidth?: number) {
    this.modalData.action = SystemConstant.ACTION.ADD;
    this.openModal(template, modalWidth ? modalWidth : this.modalDefaultWidth);
  }

  modalEdit(template: TemplateRef<unknown>, data: LoaiHinhNghienCuu, modalWidth?: number) {
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
        this.loaiHinhNghienCuuSvc.delete(id)
          .subscribe(() => {
            this.alert.success(MessageConstant[this.langCode].MSG_DELETED_DONE);
            this.getAllDataPaging();
          });
      }
    });
  }

  pageChanged(page: Paginate<LoaiHinhNghienCuu>) {
    this.listLoaiHinhNghienCuu = page;
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
      // this.alert.success(MessageConstant[this.langCode].MSG_CREATED_DONE);
    }
    this.modalRef.destroy();
  }

}
