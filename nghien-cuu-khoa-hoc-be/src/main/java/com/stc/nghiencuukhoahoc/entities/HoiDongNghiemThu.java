package com.stc.nghiencuukhoahoc.entities;

import com.stc.nghiencuukhoahoc.entities.embeded.ThanhVienHoiDongNghiemThu;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by: IntelliJ IDEA
 * User      : thangpx
 * Date      : 3/2/20
 * Time      : 8:50 AM
 * Filename  : HoiDongNghiemThu
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "hoi-dong-nghiem-thu")
public class HoiDongNghiemThu {
    @Id
    private String id;

    private String tenHoiDong;

    private String soQuyetDinh;

    private Date ngayQuyetDinh;

    private Date ngayHop;

    private String diaDiem;

    @DBRef
    private DeTai deTai;

    private List<ThanhVienHoiDongNghiemThu> thanhVienHoiDongs = new ArrayList<>();

    private String khachMoi;

//    private String ketLuanVaKienNghi;

    private double diemTrungBinhCuoi;

    // diemTrungBinhCuoi >=95: xuất sắc, 85-94: tốt, 70-84: khá, 50-69: đạt, <50: không đạt
    private String xepLoai;

    //upload file
    private String fileBienBanHoiDong;

    //BM12
    private String fileGioiThieuThanhVien;

    private String trangThaiDuyetHoiDong;

    @DBRef
    private ThoiGianQuyTrinh thoiGianQuyTrinh;

}
