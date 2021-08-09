package com.stc.nghiencuukhoahoc.entities.embeded;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

/**
 * Created by IntelliJ IDEA.
 * User: thangtm
 * Date: 12/8/2020
 * Time: 10:33 AM
 * Filename: SanPhamDuKien
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SanPhamDuKien {
    private String sanPhamKhoaHoc;

    private String sanPhamDaoTao;

    private String sanPhamUngDung;

    private String sanPhamKhac;
}
