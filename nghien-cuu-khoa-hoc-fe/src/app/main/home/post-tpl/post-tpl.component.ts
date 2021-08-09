import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-post-tpl',
  templateUrl: './post-tpl.component.html',
  styleUrls: ['./post-tpl.component.scss']
})
export class PostTplComponent {

  @Input() postTitle: string;
  @Input() postShortContent: string;
  @Input() postFooter: string;

}
