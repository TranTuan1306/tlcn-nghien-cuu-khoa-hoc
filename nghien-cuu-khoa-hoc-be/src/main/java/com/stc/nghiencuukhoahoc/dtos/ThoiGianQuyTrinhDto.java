package com.stc.nghiencuukhoahoc.dtos;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

/**
 * Created by IntelliJ IDEA.
 * User: thangtm
 * Date: 3/10/2021
 * Time: 10:58 AM
 * Filename: ThoiGianQuyTrinhDto
 */
@Getter
@Setter
@NoArgsConstructor
public class ThoiGianQuyTrinhDto {
    private String namHoc;

    private Date batDauHuongDan;

    private Date ketThucHuongDan;

    private Date batDauDangKy;

    private Date ketThucDangKy;

    private Date batDauKiemTraDanhGia;

    private Date ketThucKiemTraDanhGia;

    private Date batDauXetDuyet;

    private Date ketThucXetDuyet;

    private Date batDauKyHopDong;

    private Date ketThucKyHopDong;

    private Date batDauThucHien;

    // Trong 1/2 thời gian thực hiện đề tài, CN đề tài thực hiện bổ sung Thuyết minh theo BM06
    private Date yeuCauBoSungThuyetMinh;

    private Date ketThucThucHien;

    private Date batDauNghiemThu1;

    private Date ketThucNghiemThu1;

    private Date batDauNghiemThu2;

    private Date ketThucNghiemThu2;

    private Date batDauThanhQuyetToan;

    private Date ketThucThanhQuyetToan;
}
