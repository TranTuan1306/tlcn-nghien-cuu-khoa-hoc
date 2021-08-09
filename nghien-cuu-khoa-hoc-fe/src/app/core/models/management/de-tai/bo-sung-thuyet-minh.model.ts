export class BoSungThuyetMinh {
  id: string;
  deTaiId: string;
  thayDoiTenDeTai: ThongTinThayDoi;
  thayDoiNoiDung: ThongTinThayDoi;
  thayDoiThoiGian: ThongTinThayDoi;
  thayDoiKetQuaNghienCuu: ThongTinThayDoi;
  thayDoiThanhVienThamGia: ThongTinThayDoi;
  ngayBoSung: Date;
  fileBoSungThuyetMinhs: string[]; // id file
}

export class ThongTinThayDoi {
  lyDo: string;
  noiDung: string;
}
