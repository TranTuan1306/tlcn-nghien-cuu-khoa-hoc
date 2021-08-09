package com.stc.nghiencuukhoahoc.dtos.hoidongxetduyet;

import com.stc.nghiencuukhoahoc.entities.danhmuc.LinhVuc;
import com.stc.nghiencuukhoahoc.entities.embeded.ThanhVienHoiDongXetDuyet;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by IntelliJ IDEA.
 * User: thangtm
 * Date: 4/13/2021
 * Time: 2:09 PM
 * Filename: HoiDongXetDuyetDto
 */
@Getter
@Setter
@NoArgsConstructor
public class HoiDongXetDuyetDto {
    private String tenHoiDong;

    private String linhVucId;

    private String soQuyetDinh;

    private Date ngayQuyetDinh;

    private Date ngayHop;

    private String diaDiem;

    private List<String> deTaiIds = new ArrayList<>();

    private List<ThanhVienHoiDongXetDuyetDto> thanhVienHoiDongs = new ArrayList<>();
}
