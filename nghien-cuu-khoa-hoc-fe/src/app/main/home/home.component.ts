import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

import { LanguageConstant } from 'src/app/core/constants/language.constant';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss', '../../../assets/journey-theme/css/main.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('imgSlider', { static: false }) imgSlider: ElementRef;

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
  //////////////////////////////

  valueSearch = '';
  autoResizeBanner = { height: 'auto' };

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.autoResizeBanner = { height: this.imgSlider.nativeElement.offsetHeight + 'px' };
  }

  ngOnInit(): void {
    for (let i = 1; i < 5; i++) {
      setTimeout(() => window.dispatchEvent(new Event('resize')), 500 * i);
    }
  }

}
