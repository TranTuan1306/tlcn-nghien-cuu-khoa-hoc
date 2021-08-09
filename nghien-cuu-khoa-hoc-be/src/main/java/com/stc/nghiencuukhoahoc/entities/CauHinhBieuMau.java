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
 * Date: 4/23/2021
 * Time: 2:33 PM
 * Filename: CauHinhBieuMauController
 */
@Getter
@Setter
@NoArgsConstructor
@Document("cau-hinh-bieu-mau")
public class CauHinhBieuMau {
    @Id
    private String id;

    private String tenBenA;

    private String chucVuBenA;

    private String thongTinTaiKhoanBenA;

    private String coQuanChuTri;

    private String donVi;
}
