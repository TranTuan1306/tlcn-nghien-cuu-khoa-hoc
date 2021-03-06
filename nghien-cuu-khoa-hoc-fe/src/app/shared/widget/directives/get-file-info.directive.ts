import { FileService } from './../../../core/services/common/file.service';
import { Directive, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { FileInfo } from 'src/app/core/models/common/file.model';

@Directive({
  selector: '[appGetFileInfo]'
})
export class GetFileInfoByIdDirective implements OnInit {

  @Input() idFile: string;
  @Output() infoFile: EventEmitter<FileInfo> = new EventEmitter<FileInfo>();

  constructor(
    private fileSvc: FileService,
  ) {/**/}

  ngOnInit(): void {
    this.fileSvc.getFileInfo(this.idFile).subscribe(res =>
      this.infoFile.emit(res),
    () => this.infoFile.emit(null));
  }

}
