package com.stc.nghiencuukhoahoc.entities;

import com.stc.nghiencuukhoahoc.entities.embeded.PhieuDiemThanhVienHoiDongXetDuyet;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by: IntelliJ IDEA
 * User      : thangpx
 * Date      : 07/01/2021
 * Time      : 10:23
 * Filename  : BienBanHoiDongXetDuyetDeTai
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "bien-ban-hoi-dong-xet-duyet-de-tai")
public class BienBanHoiDongXetDuyet {
    @Id
    private String id;

    @DBRef
    private DeTai deTai;

    @DBRef
    private HoiDongXetDuyet hoiDongXetDuyet;

    private List<PhieuDiemThanhVienHoiDongXetDuyet> phieuDiemThanhViens = new ArrayList<>();

    private String khachMoi;

    private String kienNghiHoiDong;

    private Boolean ketLuan;

    // upload file
    private String bienBanHoiDong;
}
