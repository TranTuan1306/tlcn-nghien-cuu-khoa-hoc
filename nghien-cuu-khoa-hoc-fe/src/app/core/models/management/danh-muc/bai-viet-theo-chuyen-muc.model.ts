import { ChuyenMucBaiViet } from './chuyen-muc-bai-viet.model';

export class BaiVietTheoChuyenMucDTO {
  chuyenMucBaiVietId: string;
  fileAnhBia: string;
  noiDung: string;
  noiDungEn: string;
  tieuDe: string;
  tieuDeEn: string;
}

export class BaiVietTheoChuyenMuc {
  chuyenMucBaiViet: ChuyenMucBaiViet;
  createdBy: string;
  fileAnhBia: string;
  id: string;
  ngayDang: string;
  noiDung: string;
  noiDungEn: string;
  tieuDe: string;
  tieuDeEn: string;
  trangThai: boolean;
  isChoose?: boolean;
}

