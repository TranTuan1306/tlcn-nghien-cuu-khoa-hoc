import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
// declare function showLoading(): unknown;

@Component({
  selector: 'app-form-my-topic',
  templateUrl: './form-my-topic.component.html',
  styleUrls: ['./form-my-topic.component.scss', './../../../../assets/theme/css/main.css', './../../../../assets/theme/css/preload.css']
})
export class FormMyTopicComponent implements OnInit {
  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'vi';
  ///////////////////////////////
  form: FormGroup;
  urlParam = false;
  constructor(
    private activatedRouterSvc: ActivatedRoute,
  ) {
  }
  ngOnInit(): void {
    if (this.activatedRouterSvc.snapshot.params.id === 'create') {
      this.urlParam = true;
    } else {
      this.urlParam = false;
    }
  }
}
