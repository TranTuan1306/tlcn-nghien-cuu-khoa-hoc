package com.stc.nghiencuukhoahoc.services.hoidongnghiemthu;

import com.stc.nghiencuukhoahoc.dtos.hoidongnghiemthu.*;
import com.stc.nghiencuukhoahoc.entities.BienBanHoiDongXetDuyet;
import com.stc.nghiencuukhoahoc.entities.HoiDongNghiemThu;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.io.File;
import java.util.List;

/**
 * Created by: IntelliJ IDEA
 * User: vlong
 * Date: 19/5/2021
 * Time: 10:48 AM
 * Filename: HoiDongNghiemThuService
 */
public interface HoiDongNghiemThuService {
    HoiDongNghiemThu updateDeXuatThanhVienHoiDongNghiemThu(String hoiDongNghiemThuId, List<ThanhVienHoiDongNghiemThuDto> thanhVienHoiDongNghiemThuDtos);

    HoiDongNghiemThu updateThanhVienHoiDongNghiemThu(String hoiDongNghiemThuId, List<ThanhVienHoiDongNghiemThuDto> thanhVienHoiDongNghiemThuDtos);

    HoiDongNghiemThu getHoiDongNghiemThu(String hoiDongNghiemThuId);

    HoiDongNghiemThu uploadPhieuNhanXetVaPhanBienCuaThanhVienHoiDong(String hoiDongNghiemThuId, NhanXetPhanBienDto nhanXetPhanBienDto);

    String createListHoiDongWithChuTichThuKyByListDeTai(ChuTichThuKyDeTaiDto dto);

    HoiDongNghiemThu updateHoiDongNghiemThu(String hoiDongId, HoiDongNghiemThuDto dto);

    File xuatDeXuatThanhVienHoiDongNghiemThu(String hoiDongNghiemThuId) throws Exception;

    File xuatPhieuDanhGiaNghiemThu(String hoiDongNghiemThuId) throws  Exception;

    File xuatBienBanHopDongDanhGiaNghiemThu(String hoiDongNghiemThuId) throws Exception;

    File xuatPhieuNhanXetPhanBienNghiemThu(String hoiDongNghiemThuId) throws Exception;

    HoiDongNghiemThu uploadBienBanHoiDongNghiemThu(String hoiDongNghiemThuId, BienBanHoiDongDto dto);

    Page<HoiDongNghiemThu> getHoiDongNghiemThuByTDVPaging(String search, String thoiGianQuyTrinhId, String email, String trangThaiDuyetHoiDong, Pageable pageable);

    Page<HoiDongNghiemThu> getHoiDongNghiemThuPaging(String search, String thoiGianQuyTrinhId, String trangThaiDuyetHoiDong, Pageable pageable);

    HoiDongNghiemThu uploadDeXuatThanhVienHoiDongNghiemThu(String hoiDongNghiemThuId,String fileId);

    Page<HoiDongNghiemThu> getHoiDongNghiemThuByCNDT(String search, String thoiGianQuyTrinhId, String email, String trangThaiDuyetHoiDong, Pageable pageable);

    HoiDongNghiemThu getHoiDongNghiemThuByDeTai(String deTaiId);
}
