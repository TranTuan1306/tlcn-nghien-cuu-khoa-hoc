/* eslint-disable @typescript-eslint/naming-convention */
export class SystemConstant {
  public static CURRENT_USER = 'jwt_user';
  public static CURRENT_USER_GOOGLE = 'jwt_user_google';

  public static ACTION = {
    ADD: 'add',
    EDIT: 'edit',
    DELETE: 'delete',
    VIEW: 'view',
    APPROVE: 'approve'
  };

  public static LOAI_EMAIL = {
    YEU_CAU_CHINH_SUA: 'EMAIL_YEU_CAU_CHINH_SUA',
    PHAN_HOI: 'EMAIL_PHAN_HOI',
    DUYET_DANG: 'EMAIL_DUYET_DANG',
    MOI_VIET_BAI: 'EMAIL_MOI_VIET_BAI',
  };

  public static LOAI_EMAIL_TITLE = {
    en: [
      { id: SystemConstant.LOAI_EMAIL.YEU_CAU_CHINH_SUA, title: 'Yêu cầu chỉnh sửa' },
      { id: SystemConstant.LOAI_EMAIL.PHAN_HOI, title: 'Phản hồi' },
      { id: SystemConstant.LOAI_EMAIL.DUYET_DANG, title: 'Duyệt đăng' },
      { id: SystemConstant.LOAI_EMAIL.MOI_VIET_BAI, title: 'Mời viết bài' },
    ],
    vi: [
      { id: SystemConstant.LOAI_EMAIL.YEU_CAU_CHINH_SUA, title: 'Editing required' },
      { id: SystemConstant.LOAI_EMAIL.PHAN_HOI, title: 'Feedback' },
      { id: SystemConstant.LOAI_EMAIL.DUYET_DANG, title: 'Browse post' },
      { id: SystemConstant.LOAI_EMAIL.MOI_VIET_BAI, title: 'Please post' },
    ]
  };

  public static LOAI_SAN_PHAM = {
    KHOA_HOC: 'KHOA_HOC',
    DAO_TAO: 'DAO_TAO',
    UNG_DUNG: 'UNG_DUNG',
    KHAC: 'SAN_PHAM_KHAC',
  };

  public static LOAI_SAN_PHAM_TITLE = {
    vi: [
      { thuTu: 1, id: SystemConstant.LOAI_SAN_PHAM.KHOA_HOC, title: 'Khoa học' },
      { thuTu: 2, id: SystemConstant.LOAI_SAN_PHAM.DAO_TAO, title: 'Đào tạo' },
      { thuTu: 3, id: SystemConstant.LOAI_SAN_PHAM.UNG_DUNG, title: 'Ứng dụng' },
      { thuTu: 4, id: SystemConstant.LOAI_SAN_PHAM.KHAC, title: 'Khác' },
    ],
    en: [
      { thuTu: 1, id: SystemConstant.LOAI_SAN_PHAM.KHOA_HOC, title: 'Science' },
      { thuTu: 2, id: SystemConstant.LOAI_SAN_PHAM.DAO_TAO, title: 'Educate' },
      { thuTu: 3, id: SystemConstant.LOAI_SAN_PHAM.UNG_DUNG, title: 'Application' },
      { thuTu: 4, id: SystemConstant.LOAI_SAN_PHAM.KHAC, title: 'Other' },
    ]
  };

  public static CHUC_VU_HOI_DONG = {
    CHU_TICH: 'CHU_TICH',
    PHO_CHU_TICH: 'PHO_CHU_TICH',
    THU_KY: 'THU_KY',
    THANH_VIEN: 'THANH_VIEN'
  };

  public static CHUC_VU_HOI_DONG_TITLE = {
    en: [
      { id: SystemConstant.CHUC_VU_HOI_DONG.CHU_TICH, title: 'President' },
      { id: SystemConstant.CHUC_VU_HOI_DONG.PHO_CHU_TICH, title: 'Vice President' },
      { id: SystemConstant.CHUC_VU_HOI_DONG.THU_KY, title: 'Secretary' },
      { id: SystemConstant.CHUC_VU_HOI_DONG.THANH_VIEN, title: 'Member' },
    ],
    vi: [
      { id: SystemConstant.CHUC_VU_HOI_DONG.CHU_TICH, title: 'Chủ tịch' },
      { id: SystemConstant.CHUC_VU_HOI_DONG.PHO_CHU_TICH, title: 'Phó chủ tịch' },
      { id: SystemConstant.CHUC_VU_HOI_DONG.THU_KY, title: 'Thư ký' },
      { id: SystemConstant.CHUC_VU_HOI_DONG.THANH_VIEN, title: 'Thành viên' },
    ]
  };
  public static TYPE_DOCS_FORM = {
    VAN_BAN: 'VAN_BAN',
    BIEU_MAU: 'BIEU_MAU',
  };

  public static TYPE_DOCS_FORM_TITLE = {
    en: [
      { id: SystemConstant.TYPE_DOCS_FORM.VAN_BAN, title: 'Document' },
      { id: SystemConstant.TYPE_DOCS_FORM.BIEU_MAU, title: 'Form' },
    ],
    vi: [
      { id: SystemConstant.TYPE_DOCS_FORM.VAN_BAN, title: 'Văn bản' },
      { id: SystemConstant.TYPE_DOCS_FORM.BIEU_MAU, title: 'Biểu mẫu' },
    ]
  };

  public static LIST_FIELD_NAME = {
    vi: [
      { label: 'Dự kiến kết quả', value: 'duKienKetQua', checked: false },
      { label: 'Thời gian', value: 'thoiGian', checked: false },
      { label: 'Đơn vị tính', value: 'donViTinh', checked: false },
      { label: 'Số lượng', value: 'soLuong', checked: false },
      { label: 'Đơn giá', value: 'donGia', checked: false },
      { label: 'Thành tiền', value: 'thanhTien', checked: false },
      { label: 'Tổng kinh phí', value: 'tongKinhPhi', checked: false },
    ],
    en: [
      { label: 'Expected result', value: 'duKienKetQua', checked: false },
      { label: 'Time', value: 'thoiGian', checked: false },
      { label: 'Unit', value: 'donViTinh', checked: false },
      { label: 'Amount', value: 'soLuong', checked: false },
      { label: 'Price', value: 'donGia', checked: false },
      { label: 'Cost', value: 'thanhTien', checked: false },
      { label: 'Total cost', value: 'tongKinhPhi', checked: false },
    ]
  };

  public static LOAI_TIN_TUC = {
    TB_DANG_KY_DE_TAI: 'TB_DANG_KY_DE_TAI',
    TB_KHAC: 'TB_KHAC',
  };

  public static LOAI_TIN_TUC_TITLE = {
    vi: [
      { id: SystemConstant.LOAI_TIN_TUC.TB_DANG_KY_DE_TAI, title: 'Thông báo đăng ký đề tài' },
      { id: SystemConstant.LOAI_TIN_TUC.TB_KHAC, title: 'Thông báo khác' },
    ],
    en: [
      { id: SystemConstant.LOAI_TIN_TUC.TB_DANG_KY_DE_TAI, title: 'Notification for topic registration' },
      { id: SystemConstant.LOAI_TIN_TUC.TB_KHAC, title: 'Other notification' },
    ]
  };


  public static configEditor5 = {
    toolbar: [
      'heading',
      'removeFormat',
      'fontFamily',
      'fontSize',
      'fontColor',
      'fontBackgroundColor',
      '|',
      'bold',
      'italic',
      'underline',
      'alignment',
      '|',
      'imageInsert',
      'insertTable',
      'mediaEmbed',
      'bulletedList',
      'numberedList',
      'link',
      '|',
      'indent',
      'outdent',
      '|',
      'subscript',
      'superscript',
      'strikethrough',
      'code',
      'codeBlock',
      'exportPdf',
      'exportWord'
    ],
    image: {
      toolbar: [
        'imageTextAlternative',
        'imageStyle:full',
        'imageStyle:side'
      ]
    },
    table: {
      contentToolbar: [
        'tableColumn',
        'tableRow',
        'mergeTableCells',
        'tableCellProperties',
        'tableProperties'
      ]
    }
  };


  public static configModal = {
    xl: {
      class: 'modal-xl',
      backdrop: true,
      ignoreBackdropClick: true
    },
    lg: {
      class: 'modal-lg',
      backdrop: true,
      ignoreBackdropClick: true
    },
    md: {
      class: 'modal-md',
      backdrop: true,
      ignoreBackdropClick: true
    },
    sm: {
      class: 'modal-sm',
      backdrop: true,
      ignoreBackdropClick: true
    },
    login: {
      class: 'modal-login',
      backdrop: true,
      ignoreBackdropClick: true
    },
    viewFile: {
      class: 'modal-lg full-screen'
    }
  };

  public static ROLES = {
    ADMIN: 'ROLE_ADMIN',
    DON_VI: 'ROLE_DON_VI',
    CHU_NHIEM: 'ROLE_CHU_NHIEM',
    HOI_DONG: 'ROLE_HOI_DONG',
    NGUOI_DANG_KY: 'ROLE_NGUOI_DANG_KY',
  };

  public static EMAIL_TEMP = {
    // eslint-disable-next-line max-len
    counters: { u_column: 1, u_row: 1, u_content_html: 1 }, body: { rows: [{ cells: [1], columns: [{ contents: [{ type: 'html', values: { containerPadding: '10px', _meta: { htmlID: 'u_content_html_1', htmlClassNames: 'u_content_html' }, selectable: true, draggable: true, duplicatable: true, deletable: true, html: '$$_noiDungHtml_$$', hideDesktop: false, hideMobile: false } }], values: { backgroundColor: '', padding: '0px', border: {}, _meta: { htmlID: 'u_column_1', htmlClassNames: 'u_column' } } }], values: { displayCondition: null, columns: false, backgroundColor: '', columnsBackgroundColor: '', backgroundImage: { url: '', fullWidth: true, repeat: false, center: true, cover: false }, padding: '0px', hideDesktop: false, hideMobile: false, noStackMobile: false, _meta: { htmlID: 'u_row_1', htmlClassNames: 'u_row' }, selectable: true, draggable: true, duplicatable: true, deletable: true } }], values: { backgroundColor: '#e7e7e7', backgroundImage: { url: '', fullWidth: true, repeat: false, center: true, cover: false }, contentWidth: '500px', fontFamily: { label: 'Arial', value: 'arial,helvetica,sans-serif' }, linkStyle: { body: true, linkColor: '#0000ee', linkHoverColor: '#0000ee', linkUnderline: true, linkHoverUnderline: true }, _meta: { htmlID: 'u_body', htmlClassNames: 'u_body' } } }, schemaVersion: 5
  };
}
