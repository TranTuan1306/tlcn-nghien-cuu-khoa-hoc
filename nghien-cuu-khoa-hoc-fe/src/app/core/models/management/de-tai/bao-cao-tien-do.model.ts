import { KinhPhiTheoTienDo } from '../danh-muc/kinh-phi.model';
import { SanPhamTheoTienDo } from '../danh-muc/san-pham.model';

export class BaoCaoTienDo {
  id: string;
  deTaiId: string;
  noiDungNghienCuu: NoiDungNghienCuu[];
  sanPham: SanPhamTheoTienDo[];
  kinhPhiTheoTienDo: KinhPhiTheoTienDo;
  noiDungNghienCuuTiepTheo: string;
  duKienKetQuaTiepTheo: string;
  duKienKinhPhiTiepTheo: string; // string or KinhPhiTheoTienDo ?
  dotNghiemThuDuKien: number;
  kienNghi: string;
  fileBaoCaoTienDos: string[]; // id file
}

export class NoiDungNghienCuu {
  noiDungTheoThuyetMinh: string;
  noiDungDaxThucHien: string;
  tuDanhGia: string;
}
