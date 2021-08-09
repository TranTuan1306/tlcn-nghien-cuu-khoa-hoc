package com.stc.nghiencuukhoahoc.entities.danhmuc;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Created by IntelliJ IDEA.
 * User: vlong
 * Date: 7/6/2021
 * Time: 04:50 PM
 * Filename: Banner
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Document("banner")
public class Banner {
    @Id
    private String id;

    private String thuTu;

    private String tieuDe;

    private String tieuDeEn;

    private String lienKetNgoai;

    private boolean trangThai;

    private String fileBanner;
}
