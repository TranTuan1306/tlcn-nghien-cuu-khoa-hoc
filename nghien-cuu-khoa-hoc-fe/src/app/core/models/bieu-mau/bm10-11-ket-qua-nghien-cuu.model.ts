// INFORMATION ON RESEARCH RESULTS
export class KetQuaNghienCuuBM1011 {
  tinhMoi: string;
  tinhMoiEn: string;
  ketQuaNghienCuu: string;
  ketQuaNghienCuuEn: string;
  sanPhamDaoTaos: ChiTietSanPhamBM07Dto[];
  sanPhamKhacs: ChiTietSanPhamKhacBM07Dto[];
  sanPhamKhoaHocs: ChiTietSanPhamBM07Dto[];
  sanPhamUngDungs: ChiTietSanPhamBM07Dto[];
  hieuQuaPhuongThucChuyenGiao: string;
  hieuQuaPhuongThucChuyenGiaoEn: string;
}

export class ChiTietSanPhamKhacBM07Dto {
  sanPham: string;
  sanPhamDaDatDuoc: string;
  sanPhamEn: string;
  tuDanhGia: string;
}

export class ChiTietSanPhamBM07Dto {
  sanPhamDaDatDuoc: string;
  sanPhamId: string;
  tuDanhGia: string;
}
