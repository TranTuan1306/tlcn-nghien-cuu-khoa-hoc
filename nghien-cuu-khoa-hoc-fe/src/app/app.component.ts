import { Component } from '@angular/core';
import { LanguageConstant } from './core/constants/language.constant';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'vi';
  ///////////////////////////////

  constructor() {
    console.log('%cRev. 21.0731.1', 'background: #3f51b5; color: #fff; padding: 5px 10px;');

    if (!localStorage.getItem('language')) {
      localStorage.setItem('language', 'vi');
    }

    if (!localStorage.getItem('jwt_role_user')) {
      localStorage.setItem('jwt_role_user', JSON.stringify(
        {
          authenticatePermissions: '',
          role: ''
        }
      )
      );
    }

    if (!localStorage.getItem('jwt_user_google')) {
      localStorage.setItem('jwt_user_google', JSON.stringify(
        {
          name: '',
          photoUrl: ''
        }
      ));
    }
    /* eslint-disable @typescript-eslint/no-explicit-any */
    /* eslint-disable @typescript-eslint/naming-convention */
    // if (!localStorage.getItem('jwt_user')) {
    //   localStorage.setItem('jwt_user', JSON.stringify({
    //     access_token: '',
    //     expires_in: '',
    //     refresh_token: '',
    //     scope: '',
    //     token_type: ''
    //   }));
    // }
  }
}
