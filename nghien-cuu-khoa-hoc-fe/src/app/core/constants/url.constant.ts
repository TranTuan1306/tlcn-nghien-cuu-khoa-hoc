/* eslint-disable @typescript-eslint/naming-convention */
import { environment } from 'src/environments/environment';

export const UrlConstant = {
  API: {
    // Accounts & users
    OAUTH2: {
      GET_ACCESS_TOKEN: environment.serverOAuth2Url + '/oauth/token',
      GET_REFRESH_TOKEN: environment.serverOAuth2Url + '/oauth/token',
      GET_USER_INFO: environment.serverOAuth2Url + '/me'
    },
    HRM: {
      NHAN_VIEN: environment.serverHrmUrl + '/rest/nhan-vien',
      DON_VI: environment.serverHrmUrl + '/rest/don-vi',
      NHAN_VIEN_THEO_DON_VI: environment.serverHrmUrl + '/rest/nhan-viens/truong-don-vi',
    },

    // File
    FILE: environment.serviceFile + '/rest/file',

    // Catalog
    DIA_DIEM: environment.serverUrl + '/rest/dia-diem',
    BIEU_DIEM_DANH_GIA: environment.serverUrl + '/rest/bieu-diem-thanh-vien-hoi-dong',
    THOI_GIAN_DANG_KY: environment.serverUrl + '/rest/dot-dang-ky-de-tai-nckh',
    HOC_HAM: environment.serverUrl + '/rest/hoc-ham',
    HOC_VI: environment.serverUrl + '/rest/hoc-vi',
    LINH_VUC_NGHIEN_CUU: environment.serverUrl + '/rest/linh-vuc',
    LOAI_HINH_NGHIEN_CUU: environment.serverUrl + '/rest/loai-hinh-nghien-cuu',
    LOAI_KINH_PHI: environment.serverUrl + '/rest/loai-kinh-phi',

    TIN_TUC: environment.serverUrl + '/doi-api',
    CHUYEN_MUC_BAI_VIET: environment.serverUrl + '/rest/chuyen-muc-bai-viet',
    BAI_VIET_THEO_CHUYEN_MUC: environment.serverUrl + '/rest/bai-viet',
    SAN_PHAM: environment.serverUrl + '/rest/san-pham',
    BANNER: environment.serverUrl + '/rest/banner',

    // Cau hinh
    CAU_HINH_EMAIL: environment.serverUrl + '/rest/cau-hinh-email',
    CAU_HINH_BIEU_MAU: environment.serverUrl + '/rest/cau-hinh-bieu-mau',
    NOI_DUNG_EMAIL: environment.serverUrl + '/doi-api',
    VAN_BAN_BIEU_MAU: environment.serverUrl + '/rest/van-ban-bieu-mau',
    THOI_GIAN_QUY_TRINH: environment.serverUrl + '/rest/thoi-gian-quy-trinh',


    // De tai management
    BAO_CAO_TIEN_DO: environment.serverUrl + '/rest/de-tai',
    BIEN_BAN_KIEM_TRA: environment.serverUrl + '/rest/de-tai',
    BO_SUNG_THUYET_MINH: environment.serverUrl + '/rest/de-tai',
    DON_XIN_HUY_DE_TAI: environment.serverUrl + '/rest/de-tai',
    KET_QUA_NGHIEN_CUU: environment.serverUrl + '/rest/de-tai',
    GIAI_TRINH_CHINH_SUA: environment.serverUrl + '/doi-api',
    DE_NGHI_THANH_TOAN: environment.serverUrl + '/doi-api',
    BIEN_BAN_THANH_LY: environment.serverUrl + '/doi-api',
    BANG_DIEM_DANH_GIA: environment.serverUrl + '/doi-api',
    NHAN_XET_PHAN_BIEN: environment.serverUrl + '/doi-api',
    BIEN_BAN_NGHIEM_THU: environment.serverUrl + '/doi-api',
    // Thanh toan

    DON_VI: environment.serverUrl + '/rest/don-vi',


    //De tai user
    DE_TAI: environment.serverUrl + '/rest/de-tai',

    //user
    NHAN_VIEN: environment.serverUrl + '/rest/nhan-vien',

    //Hội đồng kiểm duyệt
    HOI_DONG_KIEM_DUYET: environment.serverUrl + '/rest/hoi-dong-xet-duyet',
    BIEN_BAN_HOI_DONG_KIEM_DUYET: environment.serverUrl + '/rest/bien-ban-hoi-dong-xet-duyet',

    //hội đồng nghiệm thu
    HOI_DONG_KIEM_NGHIEM_THU: environment.serverUrl + '/rest/hoi-dong-nghiem-thu',

    //Thông báo
    THONG_BAO: environment.serverUrl + '/rest/thong-bao'
  },

  ROUTE: {
    LOGIN: '/login',
    WORK: '/work',
    MAIN: {
      HOME: '/',
    },
    MANAGEMENT: {
      DASHBOARD: '/management/dashboard',
      DANH_MUC: '/management',
      BANNER: '/management/categories/banner',
      TIN_TUC: '/management/categories/news',
      CHUYEN_MUC_BAI_VIET: '/management/categories/categories-articles',
      BAI_VIET_THEO_CHUYEN_MUC: '/management/categories/articles',
      DIA_DIEM: '/management/categories/dia-diem',
      HOC_HAM: '/management/categories/academic-rank',
      HOC_VI: '/management/categories/degree',
      LINH_VUC_NGHIEN_CUU: '/management/categories/research-domain',
      LOAI_HINH_NGHIEN_CUU: '/management/categories/research-type',
      SAN_PHAM: '/management/categories/product-type',
      LOAI_KINH_PHI: '/management/categories/expense-type',

      CAU_HINH: '/management',
      THOI_GIAN_QUY_TRINH: '/management/setting/progress-timeline',
      THONG_BAO: '/management/setting/thong-bao',
      EMAIL: '/management/setting/email-account',
      CONTENT_EMAIL: '/management/setting/email-content',
      FORM: '/management/setting/form-setting',
      VAN_BAN_BIEU_MAU: '/management/setting/docs-form',
      DO_TUOI_GIANG_VIEN: '/management/setting/do-tuoi-giang-vien',
      CHI_TIEU_DANH_GIA: '/management/setting/rating-target',

      HOI_DONG: '/management',
      HOI_DONG_XET_DUYET: '/management/councils/censor',
      HOI_DONG_NGHIEM_THU: '/management/councils/acceptance',
      DE_XUAT_HOI_DONG: '/management/propose-acceptance-committee',

      DE_TAI: '/management',
      XET_DUYET_DE_TAI: '/management/topics-censoring',
      XET_DUYET_DE_TAI_KHOA: '/management/topics-censoring-faculty',
      HOP_DONG: '/management/contract-signing',
      TIEN_DO_THUC_HIEN: '/management/performing-progress',
      NGHIEM_THU_DE_TAI: '/management/topics-inspect',
      XEM_NGHIEM_THU_DE_TAI: '/management/view-topics-inspect',
      THANH_QUYET_TOAN: '/management/topics-settle',
      XUAT_FILE: '/management/export-file',
      THAY_DOI_THOI_GIAN_QUY_TRINH: '/management/change-timeline-of-project'

    },
  }
};
