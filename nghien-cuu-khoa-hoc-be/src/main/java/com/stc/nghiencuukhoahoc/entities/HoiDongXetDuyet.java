package com.stc.nghiencuukhoahoc.entities;

import com.stc.nghiencuukhoahoc.entities.danhmuc.LinhVuc;
import com.stc.nghiencuukhoahoc.entities.embeded.ThanhVienHoiDongXetDuyet;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by: IntelliJ IDEA
 * User      : thangpx
 * Date      : 07/01/2021
 * Time      : 09:35
 * Filename  : HoiDongXetDuyet
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "hoi-dong-xet-duyet-de-tai-nckh")
public class HoiDongXetDuyet {
    @Id
    private String id;

    private String tenHoiDong;

    private LinhVuc linhVuc;

    private String soQuyetDinh;

    private Date ngayQuyetDinh;

    private Date ngayHop;

    private String diaDiem;

    private List<String> deTaiIds = new ArrayList<>();

    private List<ThanhVienHoiDongXetDuyet> thanhVienHoiDongs = new ArrayList<>();

    private String thoiGianQuyTrinhId;
}
