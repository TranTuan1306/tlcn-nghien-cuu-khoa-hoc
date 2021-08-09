import { SanPham } from '../danh-muc/san-pham.model';

export class KetQuaNghienCuu {
  deTaiId: string;
  mucTieu: string;
  tinhMoiVaSangTao: string;
  tinhMoiVaSangTaoEn: string;
  ketQuaNghienCuu: string;
  ketQuaNghienCuuEn: string;
  sanPham: SanPham[];
  hieuQuaChuyenGiaoApDung: string;
  hieuQuaChuyenGiaoApDungEn: string;
  fileKetQuaNghienCuus: string[]; // id file
  fileKetQuaNghienCuuEns: string[]; // id file
}
