package com.stc.nghiencuukhoahoc.entities.danhmuc;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Created by: IntelliJ IDEA
 * User      : thangpx
 * Date      : 3/11/20
 * Time      : 8:47 AM
 * Filename  : HocHam
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document("hoc-ham")
public class HocHam {
    @Id
    private String id;

    @Indexed(unique = true)
    private String tenHocHam;

    private String tenHocHamEn;

    @Indexed(unique = true)
    private String tenVietTat;

    private String tenVietTatEn;

    private boolean trangThai;
}
