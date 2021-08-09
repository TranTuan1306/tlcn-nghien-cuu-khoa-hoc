import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { EmailEditorComponent } from 'angular-email-editor';
import { ToastrService } from 'ngx-toastr';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { MessageConstant } from 'src/app/core/constants/message.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { NoiDungEmail } from 'src/app/core/models/management/cau-hinh/noi-dung-email.model';
import { NoiDungEmailService } from 'src/app/core/services/management/cau-hinh/noi-dung-email.service';

@Component({
  selector: 'app-form-gui-email',
  templateUrl: './form-gui-email.component.html',
  styleUrls: ['./form-gui-email.component.scss']
})
export class FormGuiEmailComponent implements OnInit {

  @Input() modalData: ModalData<NoiDungEmail>;
  @Output() closePopup: EventEmitter<boolean> = new EventEmitter();
  @ViewChild('emailEditor') emailEditor: EmailEditorComponent;

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
  ///////////////////////////////

  templateMacDinh = SystemConstant.EMAIL_TEMP;

  loaiEmail = SystemConstant.LOAI_EMAIL;
  noiDungEmail: NoiDungEmail[] = [];



  constructor(
    private noiDungEmailSvc: NoiDungEmailService,
    private alert: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getNoiDungEmail();
  }

  // get nội dung email
  getNoiDungEmail(): void {
    this.noiDungEmailSvc.getAllNoiDungEmail()
      .subscribe(res => {
        this.noiDungEmail = res;
        this.editEmail();
      });
  }

  // chỉnh sửa nội dung email
  editEmail(): void {
    if (this.noiDungEmail.length > 0) {
      // eslint-disable-next-line max-len
      this.templateMacDinh.body.rows[0].columns[0].contents[0].values.html = this.noiDungEmail[0].tieuDe + '<br><hr>' + this.noiDungEmail[0].noiDung;
      setTimeout(() => {
        try {
          this.emailEditor.loadDesign(this.templateMacDinh);
        } catch (error) {
          this.alert.error('Không thể tải mẫu email! Vui lòng thử lại!');
        }
      }, 250);

    }
  }
  onSubmit(): void {
    this.emailEditor.exportHtml(
      () => {
        this.noiDungEmailSvc.postEmailMoiVietBai(this.noiDungEmail[0].id)
          .subscribe(
            () => {
              this.alert.success(MessageConstant.vi.MSG_GUI_EMAIL_DONE);
              this.closePopup.emit(null);
            });
      }
    );
  }

  onCancel(): void {
    this.closePopup.emit(null);
  }

}
