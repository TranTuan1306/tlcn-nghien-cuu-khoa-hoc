import { Component, OnInit } from '@angular/core';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { Paginate } from 'src/app/shared/widget/paginate/paginate.model';

@Component({
  selector: 'app-docs-forms',
  templateUrl: './docs-forms.component.html',
  styleUrls: ['./docs-forms.component.scss', '../../../assets/theme/css/main.css']
})
export class DocsFormsComponent implements OnInit {

  valueSearch = '';
  listVanBanBieuMau: Paginate<unknown> = new Paginate<unknown>();

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'vi';
  ///////////////////////////////

  ngOnInit(): void {
    this.onGetAllPaging();
  }

  onGetAllPaging(): void {
    //
  }

  onSearch(): void {
    this.listVanBanBieuMau.currentPage = 1;
    this.onGetAllPaging();
  }

  pageChanged(page: Paginate<unknown>) {
    this.listVanBanBieuMau = page;
    this.onGetAllPaging();
  }

}
