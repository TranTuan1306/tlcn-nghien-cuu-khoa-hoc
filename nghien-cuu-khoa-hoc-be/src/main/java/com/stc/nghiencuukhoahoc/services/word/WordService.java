package com.stc.nghiencuukhoahoc.services.word;

import com.stc.nghiencuukhoahoc.dtos.hoidongnghiemthu.HoiDongNghiemThuDto;
import com.stc.nghiencuukhoahoc.entities.*;
import com.stc.nghiencuukhoahoc.entities.embeded.DonXinHuy;

import java.io.File;
import java.rmi.ServerException;

/**
 * Created by: IntelliJ IDEA
 * User      : thangpx
 * Date      : 08/12/2020
 * Time      : 14:39
 * Filename  : WordService
 */
public interface WordService {
    File xuatDeXuatDeTai(DeTai deTai) throws Exception;

    File xuatThuyetMinhDeTai(DeTai deTai) throws Exception;

    File xuatDanhGiaThuyetMinhDeTai(DeTai deTai, HoiDongXetDuyet hoiDongXetDuyet, CauHinhBieuMau cauHinhBieuMau) throws Exception;

    File xuatBienBanHopHoiDongTuyenChon(BienBanHoiDongXetDuyet bienBanHoiDongXetDuyet, CauHinhBieuMau cauHinhBieuMau) throws Exception;

    File xuatHopDongThucHienDeTai(DeTai deTai, CauHinhBieuMau cauHinhBieuMau) throws Exception;

    File xuatBoSungThuyetMinhDeTai(DeTai deTai) throws Exception;

    File xuatBaoCaoTinhHinhThucHien(DeTai deTai) throws Exception;

    File xuatKiemTraTinhHinhThucHien(DeTai deTai) throws Exception;

    File xuatThongTinKetQuaNghienCuu(DeTai deTai) throws Exception;

    File xuatDonXinHuy(DeTai deTai, DonXinHuy donXinHuy) throws  Exception;

    File xuatGiaiTrinhChinhSua(DeTai deTai) throws Exception;

    File xuatBienBanBanGiaoThietBi(DeTai deTai) throws Exception;

    File xuatDeNghiThanhToan(DeTai deTai) throws Exception;

    File xuatThanhLiHopDong(DeTai deTai) throws Exception;

    File xuatDeXuatThanhVienHoiDongNghiemThu(HoiDongNghiemThu hoiDongNghiemThu) throws Exception;

    File xuatPhieuDanhGiaNghiemThu(HoiDongNghiemThu hoiDongNghiemThu) throws Exception;

    File xuatBienBanHopHoiDongNghiemThu(HoiDongNghiemThu hoiDongNghiemThu) throws Exception;

    File xuatPhieuNhanXetPhanBien(HoiDongNghiemThu hoiDongNghiemThu) throws Exception;
}
