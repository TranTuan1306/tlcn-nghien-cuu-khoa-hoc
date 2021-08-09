package com.stc.nghiencuukhoahoc.services.thoigianquytrinh;

import com.stc.nghiencuukhoahoc.dtos.ThoiGianQuyTrinhDto;
import com.stc.nghiencuukhoahoc.entities.ThoiGianQuyTrinh;
import com.stc.nghiencuukhoahoc.exceptions.InvalidException;
import com.stc.nghiencuukhoahoc.exceptions.NotFoundException;
import com.stc.nghiencuukhoahoc.repositories.ThoiGianQuyTrinhRepository;
import com.stc.vietnamstringutils.VietnameseStringUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import java.util.List;

/**
 * Created by IntelliJ IDEA.
 * User: thangtm
 * Date: 3/10/2021
 * Time: 11:00 AM
 * Filename: ThoiGianQuyTrinhServiceImpl
 */
@Service
@Slf4j
public class ThoiGianQuyTrinhServiceImpl implements ThoiGianQuyTrinhService {
    private final ThoiGianQuyTrinhRepository thoiGianQuyTrinhRepository;

    private final VietnameseStringUtils vietnameseStringUtils;

    public ThoiGianQuyTrinhServiceImpl(ThoiGianQuyTrinhRepository thoiGianQuyTrinhRepository, VietnameseStringUtils vietnameseStringUtils) {
        this.thoiGianQuyTrinhRepository = thoiGianQuyTrinhRepository;
        this.vietnameseStringUtils = vietnameseStringUtils;
    }

    @Override
    public List<ThoiGianQuyTrinh> getListActive() {
        try {
            return thoiGianQuyTrinhRepository.findAllByTrangThaiIsTrue();
        } catch (Exception e) {
            throw new InvalidException("Đã có lỗi trong quá trình lấy thời gian quy trình!");
        }
    }

    @Override
    public Page<ThoiGianQuyTrinh> getPaging(String search, Pageable pageable) {
        return thoiGianQuyTrinhRepository.getAllThoiGianQuyTrinhsPaging(vietnameseStringUtils.makeSearchRegex(search), pageable);
    }

    @Override
    public ThoiGianQuyTrinh addNew(ThoiGianQuyTrinhDto dto) {
            if(ObjectUtils.isEmpty(dto.getBatDauDangKy())){
                throw new InvalidException("Thời gian bắt đầu đăng ký không để trống");
            }
            if(ObjectUtils.isEmpty(dto.getBatDauHuongDan())){
                throw new InvalidException("Thời gian bắt đầu hướng dẫn không để trống");
            }
            if(ObjectUtils.isEmpty(dto.getBatDauKiemTraDanhGia())){
                throw new InvalidException("Thời gian bắt đầu kiểm tra đánh giá không để trống");
            }
            if(ObjectUtils.isEmpty(dto.getBatDauKyHopDong())){
                throw new InvalidException("Thời gian bắt đầu ký hợp đồng không để trống");
            }
            if(ObjectUtils.isEmpty(dto.getBatDauNghiemThu1())){
                throw new InvalidException("Thời gian bắt đầu nghiệm thu lần 1 không để trống");
            }
            if(ObjectUtils.isEmpty(dto.getBatDauNghiemThu2())){
                throw new InvalidException("Thời gian bắt đầu bắt đầu nghiệm thu lần 2 không để trống");
            }
            if(ObjectUtils.isEmpty(dto.getBatDauThanhQuyetToan())){
                throw new InvalidException("Thời gian bắt đầu thanh quyết toán không để trống");
            }
            if(ObjectUtils.isEmpty(dto.getBatDauThucHien())){
                throw new InvalidException("Thời gian bắt đầu thực hiện đề tài không để trống");
            }
            if(ObjectUtils.isEmpty(dto.getBatDauXetDuyet())){
                throw new InvalidException("Thời gian bắt đầu xét duyệt không để trống");
            }
            if(ObjectUtils.isEmpty(dto.getKetThucDangKy())){
                throw new InvalidException("Thời gian kết thúc đăng ký không để trống");
            }
            if(ObjectUtils.isEmpty(dto.getKetThucHuongDan())){
                throw new InvalidException("Thời gian kết thúc hướng dẫn không để trống");
            }
            if(ObjectUtils.isEmpty(dto.getKetThucKiemTraDanhGia())){
                throw new InvalidException("Thời gian kết thúc kiểm tra đánh giá không để trống");
            }
            if(ObjectUtils.isEmpty(dto.getKetThucKyHopDong())){
                throw new InvalidException("Thời gian kết thúc ký hợp đồng không để trống");
            }
            if(ObjectUtils.isEmpty(dto.getKetThucNghiemThu1())){
                throw new InvalidException("Thời gian kết thúc nghiệm thu đợt 1 không để trống");
            }
            if(ObjectUtils.isEmpty(dto.getKetThucNghiemThu2())){
                throw new InvalidException("Thời gian kết thúc nghiệm thu đợt 2 không để trống");
            }
            if(ObjectUtils.isEmpty(dto.getKetThucThanhQuyetToan())){
                throw new InvalidException("Thời gian kết thúc thanh quyết toán không để trống");
            }
            if(ObjectUtils.isEmpty(dto.getKetThucThucHien())){
                throw new InvalidException("Thời gian kết thúc thực hiện không để trống");
            }
            if(ObjectUtils.isEmpty(dto.getKetThucXetDuyet())){
                throw new InvalidException("Thời gian kết thúc xét duyệt không để trống");
            }
            if(ObjectUtils.isEmpty(dto.getNamHoc())){
                throw new InvalidException("Năm học không để trống");
            }
            if(ObjectUtils.isEmpty(dto.getYeuCauBoSungThuyetMinh())){
                throw new InvalidException("Thời gian yêu cầu bổ sung thuyết minh không để trống");
            }
            ThoiGianQuyTrinh thoiGianQuyTrinh = new ThoiGianQuyTrinh();
            thoiGianQuyTrinh.setNamHoc(dto.getNamHoc());
            thoiGianQuyTrinh.setBatDauHuongDan(dto.getBatDauHuongDan());
            thoiGianQuyTrinh.setKetThucHuongDan(dto.getKetThucHuongDan());
            thoiGianQuyTrinh.setBatDauDangKy(dto.getBatDauDangKy());
            thoiGianQuyTrinh.setKetThucDangKy(dto.getKetThucDangKy());
            thoiGianQuyTrinh.setBatDauKiemTraDanhGia(dto.getBatDauKiemTraDanhGia());
            thoiGianQuyTrinh.setKetThucKiemTraDanhGia(dto.getKetThucKiemTraDanhGia());
            thoiGianQuyTrinh.setBatDauXetDuyet(dto.getBatDauXetDuyet());
            thoiGianQuyTrinh.setKetThucXetDuyet(dto.getKetThucXetDuyet());
            thoiGianQuyTrinh.setBatDauKyHopDong(dto.getBatDauKyHopDong());
            thoiGianQuyTrinh.setKetThucKyHopDong(dto.getKetThucKyHopDong());
            thoiGianQuyTrinh.setBatDauThucHien(dto.getBatDauThucHien());
            thoiGianQuyTrinh.setYeuCauBoSungThuyetMinh(dto.getYeuCauBoSungThuyetMinh());
            thoiGianQuyTrinh.setKetThucThucHien(dto.getKetThucThucHien());
            thoiGianQuyTrinh.setBatDauNghiemThu1(dto.getBatDauNghiemThu1());
            thoiGianQuyTrinh.setKetThucNghiemThu1(dto.getKetThucNghiemThu1());
            thoiGianQuyTrinh.setBatDauNghiemThu2(dto.getBatDauNghiemThu2());
            thoiGianQuyTrinh.setKetThucNghiemThu2(dto.getKetThucNghiemThu2());
            thoiGianQuyTrinh.setBatDauThanhQuyetToan(dto.getBatDauThanhQuyetToan());
            thoiGianQuyTrinh.setKetThucThanhQuyetToan(dto.getKetThucThanhQuyetToan());
            thoiGianQuyTrinh.setTrangThai(true);

            if(!getListActive().isEmpty()) {
                ThoiGianQuyTrinh thoiGianQuyTrinhActive = getListActive().get(0);
                thoiGianQuyTrinhActive.setTrangThai(false);
                thoiGianQuyTrinhRepository.save(thoiGianQuyTrinhActive);
            }
            thoiGianQuyTrinhRepository.save(thoiGianQuyTrinh);
            return thoiGianQuyTrinh;
    }

    @Override
    public ThoiGianQuyTrinh update(String thoiGianQuyTrinhId, ThoiGianQuyTrinhDto dto) {
        try {
            ThoiGianQuyTrinh thoiGianQuyTrinh = getThoiGianQuyTrinh(thoiGianQuyTrinhId);
            if(ObjectUtils.isEmpty(dto.getBatDauDangKy())){
                throw new InvalidException("Thời gian bắt đầu đăng ký không để trống");
            }
            if(ObjectUtils.isEmpty(dto.getBatDauHuongDan())){
                throw new InvalidException("Thời gian bắt đầu hướng dẫn không để trống");
            }
            if(ObjectUtils.isEmpty(dto.getBatDauKiemTraDanhGia())){
                throw new InvalidException("Thời gian bắt đầu kiểm tra đánh giá không để trống");
            }
            if(ObjectUtils.isEmpty(dto.getBatDauKyHopDong())){
                throw new InvalidException("Thời gian bắt đầu ký hợp đồng không để trống");
            }
            if(ObjectUtils.isEmpty(dto.getBatDauNghiemThu1())){
                throw new InvalidException("Thời gian bắt đầu nghiệm thu lần 1 không để trống");
            }
            if(ObjectUtils.isEmpty(dto.getBatDauNghiemThu2())){
                throw new InvalidException("Thời gian bắt đầu bắt đầu nghiệm thu lần 2 không để trống");
            }
            if(ObjectUtils.isEmpty(dto.getBatDauThanhQuyetToan())){
                throw new InvalidException("Thời gian bắt đầu thanh quyết toán không để trống");
            }
            if(ObjectUtils.isEmpty(dto.getBatDauThucHien())){
                throw new InvalidException("Thời gian bắt đầu thực hiện đề tài không để trống");
            }
            if(ObjectUtils.isEmpty(dto.getBatDauXetDuyet())){
                throw new InvalidException("Thời gian bắt đầu xét duyệt không để trống");
            }
            if(ObjectUtils.isEmpty(dto.getKetThucDangKy())){
                throw new InvalidException("Thời gian kết thúc đăng ký không để trống");
            }
            if(ObjectUtils.isEmpty(dto.getKetThucHuongDan())){
                throw new InvalidException("Thời gian kết thúc hướng dẫn không để trống");
            }
            if(ObjectUtils.isEmpty(dto.getKetThucKiemTraDanhGia())){
                throw new InvalidException("Thời gian kết thúc kiểm tra đánh giá không để trống");
            }
            if(ObjectUtils.isEmpty(dto.getKetThucKyHopDong())){
                throw new InvalidException("Thời gian kết thúc ký hợp đồng không để trống");
            }
            if(ObjectUtils.isEmpty(dto.getKetThucNghiemThu1())){
                throw new InvalidException("Thời gian kết thúc nghiệm thu đợt 1 không để trống");
            }
            if(ObjectUtils.isEmpty(dto.getKetThucNghiemThu2())){
                throw new InvalidException("Thời gian kết thúc nghiệm thu đợt 2 không để trống");
            }
            if(ObjectUtils.isEmpty(dto.getKetThucThanhQuyetToan())){
                throw new InvalidException("Thời gian kết thúc thanh quyết toán không để trống");
            }
            if(ObjectUtils.isEmpty(dto.getKetThucThucHien())){
                throw new InvalidException("Thời gian kết thúc thực hiện không để trống");
            }
            if(ObjectUtils.isEmpty(dto.getKetThucXetDuyet())){
                throw new InvalidException("Thời gian kết thúc xét duyệt không để trống");
            }
            if(ObjectUtils.isEmpty(dto.getNamHoc())){
                throw new InvalidException("Năm học không để trống");
            }
            if(ObjectUtils.isEmpty(dto.getYeuCauBoSungThuyetMinh())){
                throw new InvalidException("Thời gian yêu cầu bổ sung thuyết minh không để trống");
            }
            thoiGianQuyTrinh.setNamHoc(dto.getNamHoc());
            thoiGianQuyTrinh.setBatDauHuongDan(dto.getBatDauHuongDan());
            thoiGianQuyTrinh.setKetThucHuongDan(dto.getKetThucHuongDan());
            thoiGianQuyTrinh.setBatDauDangKy(dto.getBatDauDangKy());
            thoiGianQuyTrinh.setKetThucDangKy(dto.getKetThucDangKy());
            thoiGianQuyTrinh.setBatDauKiemTraDanhGia(dto.getBatDauKiemTraDanhGia());
            thoiGianQuyTrinh.setKetThucKiemTraDanhGia(dto.getKetThucKiemTraDanhGia());
            thoiGianQuyTrinh.setBatDauXetDuyet(dto.getBatDauXetDuyet());
            thoiGianQuyTrinh.setKetThucXetDuyet(dto.getKetThucXetDuyet());
            thoiGianQuyTrinh.setBatDauKyHopDong(dto.getBatDauKyHopDong());
            thoiGianQuyTrinh.setKetThucKyHopDong(dto.getKetThucKyHopDong());
            thoiGianQuyTrinh.setBatDauThucHien(dto.getBatDauThucHien());
            thoiGianQuyTrinh.setYeuCauBoSungThuyetMinh(dto.getYeuCauBoSungThuyetMinh());
            thoiGianQuyTrinh.setKetThucThucHien(dto.getKetThucThucHien());
            thoiGianQuyTrinh.setBatDauNghiemThu1(dto.getBatDauNghiemThu1());
            thoiGianQuyTrinh.setKetThucNghiemThu1(dto.getKetThucNghiemThu1());
            thoiGianQuyTrinh.setBatDauNghiemThu2(dto.getBatDauNghiemThu2());
            thoiGianQuyTrinh.setKetThucNghiemThu2(dto.getKetThucNghiemThu2());
            thoiGianQuyTrinh.setBatDauThanhQuyetToan(dto.getBatDauThanhQuyetToan());
            thoiGianQuyTrinh.setKetThucThanhQuyetToan(dto.getKetThucThanhQuyetToan());
            thoiGianQuyTrinhRepository.save(thoiGianQuyTrinh);
            return thoiGianQuyTrinh;
        } catch (Exception e) {
            throw new InvalidException("Đã có lỗi trong quá trình cập nhật thời gian quy trình!");
        }
    }

    @Override
    public ThoiGianQuyTrinh changeStatus(String thoiGianQuyTrinhId) {
        ThoiGianQuyTrinh thoiGianQuyTrinh = getThoiGianQuyTrinh(thoiGianQuyTrinhId);
        thoiGianQuyTrinh.setTrangThai(!thoiGianQuyTrinh.isTrangThai());
        if(!getListActive().isEmpty()) {
            ThoiGianQuyTrinh thoiGianQuyTrinhActive = getListActive().get(0);
            thoiGianQuyTrinhActive.setTrangThai(false);
            thoiGianQuyTrinhRepository.save(thoiGianQuyTrinhActive);
        }
        thoiGianQuyTrinhRepository.save(thoiGianQuyTrinh);
        return thoiGianQuyTrinh;
    }

    @Override
    public ThoiGianQuyTrinh getThoiGianQuyTrinh(String thoiGianQuyTrinhId){
        return thoiGianQuyTrinhRepository.findById(thoiGianQuyTrinhId)
                .orElseThrow(() -> new NotFoundException(String.format("Không tìm thấy thời gian quy trình với id: %s", thoiGianQuyTrinhId)));
    }
}
