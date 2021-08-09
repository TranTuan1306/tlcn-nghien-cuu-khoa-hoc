import { BaiVietTheoChuyenMuc } from 'src/app/core/models/management/danh-muc/bai-viet-theo-chuyen-muc.model';
export class ChuyenMucBaiViet {
  id: string;
  maChuyenMuc: string;
  tenChuyenMuc: string;
  tenChuyenMucEn: string;
  trangThai: boolean;
  baiViet?: BaiVietTheoChuyenMuc[];
}

export class ChuyenMucBaiVietDTO {
  maChuyenMuc: string;
  tenChuyenMuc: string;
  tenChuyenMucEn: string;
}

