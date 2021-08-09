package com.stc.nghiencuukhoahoc.entities.embeded;

import com.stc.nghiencuukhoahoc.entities.danhmuc.LinhVuc;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by IntelliJ IDEA.
 * User: thangtm
 * Date: 12/8/2020
 * Time: 10:40 AM
 * Filename: ThanhVienCungThamGia
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ThanhVienCungThamGia {
    private String hoTen;

    private String donViCongTac;

    private LinhVuc linhVucChuyenMon;

    private List<String> noiDungDuocGiaos = new ArrayList<>();
}
