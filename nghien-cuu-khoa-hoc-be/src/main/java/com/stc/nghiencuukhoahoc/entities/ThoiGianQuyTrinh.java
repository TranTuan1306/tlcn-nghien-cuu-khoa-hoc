package com.stc.nghiencuukhoahoc.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

/**
 * Created by IntelliJ IDEA.
 * User: thangtm
 * Date: 12/25/2020
 * Time: 11:22 AM
 * Filename: ThoiGianQuyTrinh
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document("thoi-gian-quy-trinh")
public class ThoiGianQuyTrinh {
    @Id
    private String id;

    private String namHoc;

    private boolean trangThai;

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
