package com.stc.nghiencuukhoahoc.entities.embeded;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class HocViEd {
    private String tenHocVi;

    private String tenHocViEn;

    private String tenVietTat;

    private String tenVietTatEn;

    private boolean trangThai;
}
