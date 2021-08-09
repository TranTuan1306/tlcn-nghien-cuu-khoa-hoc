package com.stc.nghiencuukhoahoc.dtos.detai;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DeTaiByThoiGianTrangThaiDto {
    private String thoiGianQuyTrinhId;
    private List<String> trangThaiDeTais;
}
