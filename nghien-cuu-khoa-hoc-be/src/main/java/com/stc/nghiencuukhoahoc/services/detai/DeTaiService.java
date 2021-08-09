package com.stc.nghiencuukhoahoc.services.detai;

import com.stc.nghiencuukhoahoc.dtos.ThoiGianQuyTrinhDto;
import com.stc.nghiencuukhoahoc.dtos.detai.*;
import com.stc.nghiencuukhoahoc.entities.DeTai;
import com.stc.nghiencuukhoahoc.entities.embeded.BaoCaoTienDo;
import com.stc.nghiencuukhoahoc.entities.embeded.GiaiTrinhChinhSua;
import com.stc.nghiencuukhoahoc.entities.embeded.ThongTinKetQua;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.security.Principal;
import java.util.List;

/**
 * Created by IntelliJ IDEA.
 * User: thangtm
 * Date: 3/11/2021
 * Time: 10:21 AM
 * Filename: DeTaiService
 */
public interface DeTaiService {
    List<DeTai> getAll();

    Page<DeTai> getByTrangThaiDeTaiPaging(String search, String trangThaiDeTai, Pageable pageable);

    Page<DeTai> getByChuNhiemPaging(String emailChuNhiem, String search, DeTaiByThoiGianTrangThaiDto dto, Pageable pageable);

    Page<DeTai> getDeTaiChuaCoHoiDongXetDuyet(String search, Pageable pageable);

    Page<DeTai> getDeTaiByTruongDonViVaTrangThaiDeTai(String search, String email, String trangThaiDeTai, Pageable pageable);

    DeTai addNew(DeTaiDto dto, Principal principal);

    DeTai mailYeuCauChinhSuaKhoa(String deTaiId, YeuCauChinhSuaDto dto);

    DeTai mailYeuCauChinhSuaKHCN(String deTaiId, YeuCauChinhSuaDto dto);


    DeTai update(String deTaiId, DeTaiDto dto);

    DeTai cndtHuyDeTai(String deTaiId);

    DeTai truongDonViDuyet(String deTaiId);

    DeTai khoaHocCongNgheDuyet(String deTaiId);

    DeTai getDeTai(String deTaiId);

    DeTai updateDeXuatDeTai(String deTaiId, DeTaiDto deTaiDto);

    DeTai updateThongTinKetQuaNghienCuu(String deTaiId, ThongTinKetQuaDto thongTinKetQuaDto);

//    DeTai updateGiaiTrinhChinhSua(String deTaiId, List<GiaiTrinhChinhSuaDto> giaiTrinhChinhSuaDtos);

    Page<DeTai> getByThoiGianQuyTrinhVaTrangThai(String search, DeTaiByThoiGianTrangThaiDto dto, Pageable pageable);

    DeTai addMaSoDeTaiSauKhiDuyet(String deTaiId, String maSoDeTai);

    DeTai changeThoiGianQuyTrinh(String deTaiId, ThoiGianQuyTrinhDto dto);

    Page<DeTai> getDeTaIByListId(String search, List<String>deTaiIds, Pageable pageable);



    File xuatDeXuatDeTai(String deTaiId) throws Exception;

    File xuatThuyetMinhDeTai(String deTaiId) throws Exception;

    DeTai uploadHopDongThucHien(String deTaiId, String fileKyHopDongId);
    File xuatHopDongThucHien(String deTaiId) throws Exception;

    DeTai uploadBoSungThuyetMinh(String deTaiId, String fileId);
    File xuatBoSungThuyetMinh(String deTaiId) throws Exception;

    DeTai addTinhHinhThucHien(String deTaiId, BaoCaoTienDoDto dto);
    DeTai updateTinhHinhThucHien(String deTaiId, BaoCaoTienDoDto dto);
    DeTai uploadTinhHinhThucHien(String deTaiId, String fileId);
    File xuatTinhHinhThucHien(String deTaiId) throws Exception;

    DeTai uploadBienBanKiemTraTinhHinhThucHien(String deTaiId, String fileId);
    File xuatBienBanKiemTraTinhHinhThucHien(String deTaiId) throws Exception;

    DeTai uploadDonXinHuy(String deTaiId, UploadXinHuyDto dto);
    File xuatDonXinHuy (String deTaiId, DonXinHuyDto donXinHuyDto) throws Exception;

    File xuatThongTinKetQua(String deTaiId) throws Exception;

    DeTai uploadGiaiTrinhChinhSua(String deTaiId, String fileId);
    File xuatGiaiTrinhChinhSua(String deTaiId) throws Exception;

    DeTai uploadBienBanBanGiaoThietBi(String deTaiId, String fileId);
    File xuatBienBanBanGiaoThietBi(String deTaiId) throws Exception;

    DeTai uploadDeNghiThanhToan(String deTaiId, String fileId);
    File xuatDeNghiThanhToan(String deTaiId) throws Exception;

    DeTai uploadThanhLiHopDong(String deTaiId, String fileId);
    File xuatThanhLiHopDong(String deTaiId) throws Exception;
}
