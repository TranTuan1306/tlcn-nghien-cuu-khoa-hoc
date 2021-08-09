import { Component, Input, OnInit } from '@angular/core';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-post-tpl-wide',
  templateUrl: './post-tpl-wide.component.html',
  styleUrls: ['./post-tpl-wide.component.scss']
})
export class PostTplWideComponent implements OnInit {
  @Input() categoryId: string;
  @Input() postId: string;
  @Input() postTitle: string;
  @Input() postShortContent: string;
  @Input() postFooter: string;
  @Input() fileId: string;

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'vi';
  //////////////////////////////
  filePatch: string;

  ngOnInit(): void {
    this.filePatch = environment.serverUrl + '/rest/file/view/' + this.fileId;
  }
}
