/* eslint-disable @typescript-eslint/naming-convention */
export class SystemConstant {
  public static CURRENT_USER = 'jwt_user';
  public static CURRENT_USER_GOOGLE = 'jwt_user_google';
  public static CURRENT_ROLE_USER = 'jwt_role_user';

  public static ROLE_USER = {
    ROLE_ADMIN: 'ROLE_ADMIN',
    ROLE_USER: 'ROLE_USER',
    ROLE_TRUONG_DON_VI: 'ROLE_TRUONG_DON_VI'
  };

  public static HOME_POST_STATUS = {
    NEW: 'BAI_VIET_MOI',
    THONG_BAO: 'THONG_BAO',
  };

  public static VAN_BAN_BIEU_MAU = {
    VAN_BAN: 'VAN_BAN',
    BIEU_MAU: 'BIEU_MAU'
  };

  public static VAN_BAN_BIEU_MAU_TILE = {
    vi: [
      { id: SystemConstant.VAN_BAN_BIEU_MAU.VAN_BAN, title: 'Văn bản' },
      { id: SystemConstant.VAN_BAN_BIEU_MAU.BIEU_MAU, title: 'Biểu mẫu' }
    ],
    en: [
      { id: SystemConstant.VAN_BAN_BIEU_MAU.VAN_BAN, title: 'Document' },
      { id: SystemConstant.VAN_BAN_BIEU_MAU.BIEU_MAU, title: 'Form' },
    ]
  };

  public static ACTION = {
    ADD: 'add',
    EDIT: 'edit',
    DELETE: 'delete',
    VIEW: 'view',
    APPROVE: 'approve',
    PROPOSE: 'Propose'
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

  public static TRANG_THAI_DE_TAI = {
    MOI_DANG_KY: 'MOI_DANG_KY',
    YEU_CAU_CHINH_SUA_KHOA: 'YEU_CAU_CHINH_SUA_KHOA',
    DA_CHINH_SUA_KHOA: 'DA_CHINH_SUA_KHOA',
    DAT_KHOA: 'DAT_KHOA',
    YEU_CAU_CHINH_SUA_KHCN: 'YEU_CAU_CHINH_SUA_KHCN',
    DA_CHINH_SUA_KHCN: 'DA_CHINH_SUA_KHCN',
    DAT_KHCN: 'DAT_KHCN',
    DAT_XET_DUYET: 'DAT_XET_DUYET',
    HUY: 'HUY',
    KY_HOP_DONG: 'KY_HOP_DONG',
    NGHIEM_THU: 'NGHIEM_THU',
    XIN_HUY: 'XIN_HUY',
    DAT_NGHIEM_THU: 'DAT_NGHIEM_THU',
    KHONG_DAT_NGHIEM_THU: 'KHONG_DAT_NGHIEM_THU',
    DA_THANH_LY: 'DA_THANH_LY'
  };

  public static TRANG_THAI_DE_TAI_TITLE = {
    vi: [
      { id: SystemConstant.TRANG_THAI_DE_TAI.MOI_DANG_KY, title: 'Mới đăng ký' },
      { id: SystemConstant.TRANG_THAI_DE_TAI.YEU_CAU_CHINH_SUA_KHOA, title: 'Khoa yêu cầu chỉnh sửa' },
      { id: SystemConstant.TRANG_THAI_DE_TAI.DA_CHINH_SUA_KHOA, title: 'Đã chỉnh sửa yêu cầu khoa' },
      { id: SystemConstant.TRANG_THAI_DE_TAI.DAT_KHOA, title: 'Đạt Khoa' },
      { id: SystemConstant.TRANG_THAI_DE_TAI.YEU_CAU_CHINH_SUA_KHCN, title: 'KHCN yêu cầu chỉnh sửa' },
      { id: SystemConstant.TRANG_THAI_DE_TAI.DA_CHINH_SUA_KHCN, title: 'Đã chỉnh sửa yêu cầu KHCN' },
      { id: SystemConstant.TRANG_THAI_DE_TAI.DAT_KHCN, title: 'Đạt KHCN' },
      { id: SystemConstant.TRANG_THAI_DE_TAI.DAT_XET_DUYET, title: 'Đạt xét duyệt' },
      { id: SystemConstant.TRANG_THAI_DE_TAI.HUY, title: 'Hủy' },
      { id: SystemConstant.TRANG_THAI_DE_TAI.KY_HOP_DONG, title: 'Ký hợp đồng' },
      { id: SystemConstant.TRANG_THAI_DE_TAI.NGHIEM_THU, title: 'Nghiệm thu' },
      { id: SystemConstant.TRANG_THAI_DE_TAI.DAT_NGHIEM_THU, title: 'Đạt nghiệm thu' },
      { id: SystemConstant.TRANG_THAI_DE_TAI.KHONG_DAT_NGHIEM_THU, title: 'Không đạt nghiệm thu' },
      { id: SystemConstant.TRANG_THAI_DE_TAI.DA_THANH_LY, title: 'Đã thanh lý' },
      { id: SystemConstant.TRANG_THAI_DE_TAI.XIN_HUY, title: 'Xin hủy' },
    ],
    en: [
      { id: SystemConstant.TRANG_THAI_DE_TAI.MOI_DANG_KY, title: 'New registration' },
      { id: SystemConstant.TRANG_THAI_DE_TAI.YEU_CAU_CHINH_SUA_KHOA, title: 'Faculty requires editing' },
      { id: SystemConstant.TRANG_THAI_DE_TAI.DA_CHINH_SUA_KHOA, title: 'Edited faculty requirements' },
      { id: SystemConstant.TRANG_THAI_DE_TAI.DAT_KHOA, title: 'Meet the Faculty requirements' },
      { id: SystemConstant.TRANG_THAI_DE_TAI.YEU_CAU_CHINH_SUA_KHCN, title: 'Science and Technology requires editing' },
      { id: SystemConstant.TRANG_THAI_DE_TAI.DA_CHINH_SUA_KHCN, title: 'Edited request for science and technology' },
      { id: SystemConstant.TRANG_THAI_DE_TAI.DAT_KHCN, title: 'Meet the requirements of science and technology' },
      { id: SystemConstant.TRANG_THAI_DE_TAI.DAT_XET_DUYET, title: 'Pass the review' },
      { id: SystemConstant.TRANG_THAI_DE_TAI.HUY, title: 'Cancel' },
      { id: SystemConstant.TRANG_THAI_DE_TAI.KY_HOP_DONG, title: 'Sign a contract' },
      { id: SystemConstant.TRANG_THAI_DE_TAI.NGHIEM_THU, title: 'Acceptance' },
      { id: SystemConstant.TRANG_THAI_DE_TAI.DAT_NGHIEM_THU, title: 'Achieving acceptance' },
      { id: SystemConstant.TRANG_THAI_DE_TAI.KHONG_DAT_NGHIEM_THU, title: 'No gain acceptance' },
      { id: SystemConstant.TRANG_THAI_DE_TAI.DA_THANH_LY, title: 'Liquidated' },
      { id: SystemConstant.TRANG_THAI_DE_TAI.XIN_HUY, title: 'Please cancel' },
    ]
  };

  public static TRANG_THAI_HOI_DONG = {
    KHOI_TAO: 'KHOI_TAO',
    DE_XUAT_THANH_VIEN: 'DE_XUAT_THANH_VIEN',
    DA_DUYET_THANH_VIEN: 'DA_DUYET_THANH_VIEN'
  };

  public static TRANG_THAI_HOI_DONG_TITLE = {
    vi: [
      { id: SystemConstant.TRANG_THAI_HOI_DONG.KHOI_TAO, title: 'Chưa đề xuất thành viên' },
      { id: SystemConstant.TRANG_THAI_HOI_DONG.DE_XUAT_THANH_VIEN, title: 'Đề xuất thành viên' },
      { id: SystemConstant.TRANG_THAI_HOI_DONG.DA_DUYET_THANH_VIEN, title: 'Đã duyệt thành viên' }
    ],
    en: [
      { id: SystemConstant.TRANG_THAI_HOI_DONG.KHOI_TAO, title: 'No member proposed yet' },
      { id: SystemConstant.TRANG_THAI_HOI_DONG.DE_XUAT_THANH_VIEN, title: 'Recommend membership' },
      { id: SystemConstant.TRANG_THAI_HOI_DONG.DA_DUYET_THANH_VIEN, title: 'Member approved' }
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
    THU_KY: 'THU_KY',
    UY_VIEN: 'UY_VIEN'
  };

  public static CHUC_VU_HOI_DONG_TITLE = {
    en: [
      { id: SystemConstant.CHUC_VU_HOI_DONG.CHU_TICH, title: 'President' },
      { id: SystemConstant.CHUC_VU_HOI_DONG.THU_KY, title: 'Secretary' },
      { id: SystemConstant.CHUC_VU_HOI_DONG.UY_VIEN, title: 'Commissioner' },
    ],
    vi: [
      { id: SystemConstant.CHUC_VU_HOI_DONG.CHU_TICH, title: 'Chủ tịch' },
      { id: SystemConstant.CHUC_VU_HOI_DONG.THU_KY, title: 'Thư ký' },
      { id: SystemConstant.CHUC_VU_HOI_DONG.UY_VIEN, title: 'Ủy viên' },
    ]
  };

  //Chức vụ tạo hội đồng khởi tạo first
  public static CHUC_VU_HOI_DONG_KHOI_TAO = {
    CHU_TICH: 'CHU_TICH',
    THU_KY: 'THU_KY'
  };

  public static CHUC_VU_HOI_DONG_KHOI_TAO_TITLE = {
    en: [
      { id: SystemConstant.CHUC_VU_HOI_DONG.CHU_TICH, title: 'President' },
      { id: SystemConstant.CHUC_VU_HOI_DONG.THU_KY, title: 'Secretary' }
    ],
    vi: [
      { id: SystemConstant.CHUC_VU_HOI_DONG.CHU_TICH, title: 'Chủ tịch' },
      { id: SystemConstant.CHUC_VU_HOI_DONG.THU_KY, title: 'Thư ký' }
    ]
  };

  public static CHUC_VU_HOI_DONG_DE_XUAT = {
    PHAN_BIEN_NGOAI_TRUONG: 'PHAN_BIEN_NGOAI_TRUONG',
    PHAN_BIEN_TRONG_TRUONG: 'PHAN_BIEN_TRONG_TRUONG',
    THANH_VIEN: 'THANH_VIEN'
  };

  public static CHUC_VU_HOI_DONG_DE_XUAT_TITLE = {
    en: [
      { id: SystemConstant.CHUC_VU_HOI_DONG_DE_XUAT.PHAN_BIEN_NGOAI_TRUONG, title: 'Reviewer outside school' },
      { id: SystemConstant.CHUC_VU_HOI_DONG_DE_XUAT.PHAN_BIEN_TRONG_TRUONG, title: 'Reviewer inside school' },
      { id: SystemConstant.CHUC_VU_HOI_DONG_DE_XUAT.THANH_VIEN, title: 'Member' }
    ],
    vi: [
      { id: SystemConstant.CHUC_VU_HOI_DONG_DE_XUAT.PHAN_BIEN_NGOAI_TRUONG, title: 'Phản biện ngoài trường' },
      { id: SystemConstant.CHUC_VU_HOI_DONG_DE_XUAT.PHAN_BIEN_TRONG_TRUONG, title: 'Phản biện trong trường' },
      { id: SystemConstant.CHUC_VU_HOI_DONG_DE_XUAT.THANH_VIEN, title: 'Thành viên' }
    ]
  };

  public static CHUC_VU_HOI_DONG_NGHIEM_THU = {
    CHU_TICH: 'CHU_TICH',
    THU_KY: 'THU_KY',
    PHAN_BIEN_NGOAI_TRUONG: 'PHAN_BIEN_NGOAI_TRUONG',
    PHAN_BIEN_TRONG_TRUONG: 'PHAN_BIEN_TRONG_TRUONG',
    THANH_VIEN: 'THANH_VIEN'
  };

  public static CHUC_VU_HOI_DONG_NGHIEM_THU_TITLE = {
    en: [
      { id: SystemConstant.CHUC_VU_HOI_DONG.CHU_TICH, title: 'President' },
      { id: SystemConstant.CHUC_VU_HOI_DONG.THU_KY, title: 'Secretary' },
      { id: SystemConstant.CHUC_VU_HOI_DONG_DE_XUAT.PHAN_BIEN_NGOAI_TRUONG, title: 'Reviewer outside school' },
      { id: SystemConstant.CHUC_VU_HOI_DONG_DE_XUAT.PHAN_BIEN_TRONG_TRUONG, title: 'Reviewer inside school' },
      { id: SystemConstant.CHUC_VU_HOI_DONG_DE_XUAT.THANH_VIEN, title: 'Member' }
    ],
    vi: [
      { id: SystemConstant.CHUC_VU_HOI_DONG.CHU_TICH, title: 'Chủ tịch' },
      { id: SystemConstant.CHUC_VU_HOI_DONG.THU_KY, title: 'Thư ký' },
      { id: SystemConstant.CHUC_VU_HOI_DONG_DE_XUAT.PHAN_BIEN_NGOAI_TRUONG, title: 'Phản biện ngoài trường' },
      { id: SystemConstant.CHUC_VU_HOI_DONG_DE_XUAT.PHAN_BIEN_TRONG_TRUONG, title: 'Phản biện trong trường' },
      { id: SystemConstant.CHUC_VU_HOI_DONG_DE_XUAT.THANH_VIEN, title: 'Thành viên' }
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

  public static LIST_POST_TYPE = {
    THONG_BAO: 'THONG_BAO',
    CAC_HOAT_DONG_NOI_BAT: 'CAC_HOAT_DONG_NOI_BAT',
    HOC_BONG: 'HOC_BONG',
    THONG_TIN_TONG_HOP: 'THONG_TIN_TONG_HOP',
    TUYEN_DUNG_THUC_TAP: 'TUYEN_DUNG_THUC_TAP',
    VIDEO: 'VIDEO',
  };

  public static LIST_POST_TYPE_TITLE = {
    en: [
      {
        id: SystemConstant.LIST_POST_TYPE.THONG_BAO,
        title: 'Announcements'
      },
      {
        id: SystemConstant.LIST_POST_TYPE.CAC_HOAT_DONG_NOI_BAT,
        title: 'Featured activities',
      },
      {
        id: SystemConstant.LIST_POST_TYPE.HOC_BONG,
        title: 'Scholarship'
      },
      {
        id: SystemConstant.LIST_POST_TYPE.THONG_TIN_TONG_HOP,
        title: 'General news'
      },
      {
        id: SystemConstant.LIST_POST_TYPE.TUYEN_DUNG_THUC_TAP,
        title: 'Recruitment & Internship'
      },
      {
        id: SystemConstant.LIST_POST_TYPE.VIDEO,
        title: 'Videos'
      },
    ],
    vi: [
      {
        id: SystemConstant.LIST_POST_TYPE.THONG_BAO,
        title: 'Thông báo'
      },
      {
        id: SystemConstant.LIST_POST_TYPE.CAC_HOAT_DONG_NOI_BAT,
        title: 'Các hoạt động nổi bật'
      },
      {
        id: SystemConstant.LIST_POST_TYPE.HOC_BONG,
        title: 'Học bổng'
      },
      {
        id: SystemConstant.LIST_POST_TYPE.THONG_TIN_TONG_HOP,
        title: 'Thông tin tổng hợp'
      },
      {
        id: SystemConstant.LIST_POST_TYPE.TUYEN_DUNG_THUC_TAP,
        title: 'Tuyển dụng & Thực tập'
      },
      {
        id: SystemConstant.LIST_POST_TYPE.VIDEO,
        title: 'Video'
      },
    ],
    langData: {
      // using for fast get, improving perfomnace
      en: {
        [SystemConstant.LIST_POST_TYPE.THONG_BAO]: 'Announcements',
        [SystemConstant.LIST_POST_TYPE.CAC_HOAT_DONG_NOI_BAT]: 'Featured activities',
        [SystemConstant.LIST_POST_TYPE.HOC_BONG]: 'Scholarship',
        [SystemConstant.LIST_POST_TYPE.THONG_TIN_TONG_HOP]: 'General news',
        [SystemConstant.LIST_POST_TYPE.TUYEN_DUNG_THUC_TAP]: 'Recruitment & Internship',
        [SystemConstant.LIST_POST_TYPE.VIDEO]: 'Videos',
      },
      vi: {
        [SystemConstant.LIST_POST_TYPE.THONG_BAO]: 'Thông báo',
        [SystemConstant.LIST_POST_TYPE.CAC_HOAT_DONG_NOI_BAT]: 'Các hoạt động nổi bật',
        [SystemConstant.LIST_POST_TYPE.HOC_BONG]: 'Học bổng',
        [SystemConstant.LIST_POST_TYPE.THONG_TIN_TONG_HOP]: 'Thông tin tổng hợp',
        [SystemConstant.LIST_POST_TYPE.TUYEN_DUNG_THUC_TAP]: 'Tuyển dụng & Thực tập',
        [SystemConstant.LIST_POST_TYPE.VIDEO]: 'Video',
      }
    }
  };
}
