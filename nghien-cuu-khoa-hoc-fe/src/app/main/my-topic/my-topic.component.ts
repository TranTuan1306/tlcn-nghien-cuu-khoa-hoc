import { Component, OnInit } from '@angular/core';
// import { NzModalService } from 'ng-zorro-antd';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
// import { SystemConstant } from 'src/app/core/constants/system.constant';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { ThoiGianQuyTrinh } from 'src/app/core/models/management/cau-hinh/thoi-gian-quy-trinh.model';
import { DeTai } from 'src/app/core/models/management/de-tai/de-tai.model';
import { ThoiGianQuyTrinhService } from 'src/app/core/services/management/cau-hinh/thoi-gian-quy-trinh.service';
import { DeTaiService } from 'src/app/core/services/user/de-tai.service';
import { Paginate } from 'src/app/shared/widget/paginate/paginate.model';

@Component({
  selector: 'app-my-topic',
  templateUrl: './my-topic.component.html',
  styleUrls: ['./my-topic.component.scss', '../../../assets/journey-theme/css/main.css']
})
export class MyTopicComponent implements OnInit {

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
  ///////////////////////////////

  regDeTai = true; // test => true
  regIndex = 0; // test thì set, prod phải để tự nhận dạng
  dataDeTai: DeTai;

  modalData = new ModalData<DeTai | string>();

  dotDangKyId: string;
  deTaiId: string;
  
  listThoiGianQuyTrinh: ThoiGianQuyTrinh[] = [];  
  
    // table
    loading = true;
    listDeTaiByChuNhiem: Paginate<DeTai> = new Paginate<DeTai>();
    searchValue = '';

  constructor(
    private deTaiSvc: DeTaiService,
    private thoiGianQuyTrinhSvc: ThoiGianQuyTrinhService,
  ) { }
  
  ngOnInit(): void {
    this.getAllThoiGianQuyTrinh();
  }

  checkGetDeTai(): void {
    if (this.dotDangKyId !== null && this.deTaiId !== null) {
      this.getDeTaiByChuNhiem(this.dotDangKyId);
    }
  }

  getDeTaiByChuNhiem(dotDangKyId?: string): void {
    console.log( "tessttttt",dotDangKyId)
    this.loading = true;
    console.log("aa", this.listDeTaiByChuNhiem)
    this.deTaiSvc.getDeTaiByChuNhiem(
      dotDangKyId,
      this.listDeTaiByChuNhiem.currentPage - 1,
      this.listDeTaiByChuNhiem.limit,     
      this.searchValue,
      )
      .subscribe(res => {
        this.listDeTaiByChuNhiem.data = res.content;
        this.listDeTaiByChuNhiem.totalItem = res.totalElements;
        this.listDeTaiByChuNhiem.totalPage = res.totalPages;
        this.listDeTaiByChuNhiem.limit = res.pageable.pageSize;
        this.loading = false;
      },
      () => {
        this.listDeTaiByChuNhiem.data = [];
        this.loading = false;
      });
  }

  
  getAllThoiGianQuyTrinh(): void {
    this.thoiGianQuyTrinhSvc.getAllThoiGianQuyTrinh()
      .subscribe(res => this.listThoiGianQuyTrinh = res);
  }


}
