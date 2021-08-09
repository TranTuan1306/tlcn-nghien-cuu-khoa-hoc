package com.stc.nghiencuukhoahoc.dtos.detai;

import com.stc.nghiencuukhoahoc.entities.danhmuc.LinhVuc;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

/**
 * Created by IntelliJ IDEA.
 * User: thangtm
 * Date: 4/9/2021
 * Time: 3:40 PM
 * Filename: ThanhVienCungThamGiaDto
 */
@Getter
@Setter
@NoArgsConstructor
public class ThanhVienCungThamGiaDto {
    private String hoTen;

    private String donViCongTac;

    private String linhVucId;

    private List<String> noiDungDuocGiaos;
}
