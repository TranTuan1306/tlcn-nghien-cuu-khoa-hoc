import { Directive, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { FileInfo } from 'src/app/core/models/common/file-controller.model';
import { FileControllerService } from 'src/app/core/services/common/file-controller.service';

@Directive({
  selector: '[appGetFileInfoById]'
})
export class GetFileInfoByIdDirective implements OnInit {

  @Input() idFile: string;
  @Output() infoFile: EventEmitter<FileInfo> = new EventEmitter<FileInfo>();

  constructor(
    private fileSvc: FileControllerService,
  ) {/**/}

  ngOnInit(): void {
    this.fileSvc.getFileInfo(this.idFile).subscribe(res =>
      this.infoFile.emit(res),
    () => this.infoFile.emit(null));
  }

}
