package com.stc.nghiencuukhoahoc.dtos;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

/**
 * Created by IntelliJ IDEA.
 * User: thangtm
 * Date: 3/10/2021
 * Time: 10:24 AM
 * Filename: LoaiKinhPhiDto
 */
@Getter
@Setter
@NoArgsConstructor
public class LoaiKinhPhiDto {
    private String tenLoaiKinhPhi;

    private String tenLoaiKinhPhiEn;

    // list các field name trong phụ lục tương ứng, Ví dụ: noiDungChi, duKienKetQua,...
    private List<String> fieldNames;
}
