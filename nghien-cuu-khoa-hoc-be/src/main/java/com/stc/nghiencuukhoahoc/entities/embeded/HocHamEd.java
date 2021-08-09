package com.stc.nghiencuukhoahoc.entities.embeded;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.index.Indexed;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class HocHamEd {
    private String tenHocHam;

    private String tenHocHamEn;

    private String tenVietTat;

    private String tenVietTatEn;

    private boolean trangThai;
}
