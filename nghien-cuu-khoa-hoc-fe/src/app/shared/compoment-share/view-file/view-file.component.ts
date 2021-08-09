import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as $ from 'jquery';
import { FileControllerService } from 'src/app/core/services/common/file-controller.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-file',
  templateUrl: './view-file.component.html',
  styleUrls: ['./view-file.component.css']
})
export class ViewFileComponent implements OnInit {
  @Input() fileId: string;
  @Output() hideIframe = new EventEmitter<boolean>();

  viewer: string;
  resourceUrl: string;
  extension: string;
  degree = 0;

  constructor(
    private fileService: FileControllerService
  ) {
  }

  ngOnInit(): void {
    this.fileService.getFileInfo(this.fileId)
      .subscribe(res => {
        this.extension = this.fileService.getExtensionFile(res.tenFile);
        this.resourceUrl = environment.serverUrl + '/rest/file/view/' + this.fileId;

        switch (this.extension) {
          case 'pdf':
            this.viewer = 'pdfViewer';
            break;
          case 'doc':
            this.viewer = 'officeViewer';
            break;
          case 'xls':
            this.viewer = 'officeViewer';
            break;
          case 'ppt':
            this.viewer = 'officeViewer';
            break;
          case 'docx':
            this.viewer = 'officeViewer';
            break;
          case 'xlsx':
            this.viewer = 'officeViewer';
            break;
          case 'pptx':
            this.viewer = 'officeViewer';
            break;
          case 'jpeg':
            this.viewer = 'imageViewer';
            break;
          case 'jpg':
            this.viewer = 'imageViewer';
            break;
          case 'png':
            this.viewer = 'imageViewer';
            break;
          case 'tiff':
            this.viewer = 'imageViewer';
            break;
        }
      });


  }

  hide(): void {
    this.hideIframe.emit();
  }

  rotateImage(): void {
    this.degree += 90;
    $('#image').css({
      // eslint-disable-next-line quote-props
      'transform': 'rotate(' + this.degree + 'deg)',
      '-ms-transform': 'rotate(' + this.degree + 'deg)',
      '-moz-transform': 'rotate(' + this.degree + 'deg)',
      '-webkit-transform': 'rotate(' + this.degree + 'deg)',
      '-o-transform': 'rotate(' + this.degree + 'deg)'
    });
  }
}
