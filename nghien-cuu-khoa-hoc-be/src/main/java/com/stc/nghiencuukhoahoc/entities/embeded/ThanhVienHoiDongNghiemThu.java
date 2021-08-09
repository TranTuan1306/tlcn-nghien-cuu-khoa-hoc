package com.stc.nghiencuukhoahoc.entities.embeded;

import com.stc.nghiencuukhoahoc.entities.danhmuc.HocHam;
import com.stc.nghiencuukhoahoc.entities.danhmuc.HocVi;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.DBRef;

/**
 * Created by: IntelliJ IDEA
 * User      : thangpx
 * Date      : 07/01/2021
 * Time      : 10:54
 * Filename  : ThanhVienHoiDongNghiemThu
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ThanhVienHoiDongNghiemThu {
    private String hoTen;

    @DBRef
    private HocHam hocHam;

    @DBRef
    private HocVi hocVi;


    private String chuyenMon;

    private String donViCongTac;

    private String email;

    private String soDienThoai;

    //Từ EnumVaiTroNhiemVuHoiDongNghiemThu
    private String nhiemVuHoiDong;

    private String fileNhanXetPhanBien;

    private String filePhieuDiemHoiDong;

    private double tongDiem;

    private Boolean trangThaiDuyetThanhVien;
}
