import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-post-tpl-wide',
  templateUrl: './post-tpl-wide.component.html',
  styleUrls: ['./post-tpl-wide.component.scss']
})
export class PostTplWideComponent {

  @Input() postTitle: string;
  @Input() postShortContent: string;
  @Input() postFooter: string;

}
