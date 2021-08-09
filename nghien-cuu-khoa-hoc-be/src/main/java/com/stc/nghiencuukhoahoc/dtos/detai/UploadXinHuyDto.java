package com.stc.nghiencuukhoahoc.dtos.detai;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UploadXinHuyDto {
    private String fileId;
    private String noiDungEmailKhongDuyet;
    private boolean duyet;
}
