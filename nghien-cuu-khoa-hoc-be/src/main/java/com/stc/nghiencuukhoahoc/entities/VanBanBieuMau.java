package com.stc.nghiencuukhoahoc.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Created by IntelliJ IDEA.
 * User: thangtm
 * Date: 1/7/2021
 * Time: 3:59 PM
 * Filename: VanBanBieuMau
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document("van-ban-bieu-mau")
public class VanBanBieuMau {
    @Id
    private String id;

    //enum loai bieu mau
    private String loai;

    private String tieuDe;

    private String tieuDeEn;

    private String fileDinhKem;

    private boolean trangThai;
}
