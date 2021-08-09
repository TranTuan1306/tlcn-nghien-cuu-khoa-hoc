package com.stc.nghiencuukhoahoc.entities.danhmuc;

import com.stc.nghiencuukhoahoc.entities.ChuyenMucBaiViet;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

/**
 * Created by IntelliJ IDEA.
 * User: vlong
 * Date: 1/8/2021
 * Time: 10:23 AM
 * Filename: BaiViet
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document("bai-viet")
public class BaiViet {
    @Id
    private String id;
    @DBRef
    private ChuyenMucBaiViet chuyenMucBaiViet;

    private String tieuDe;

    private String tieuDeEn;

    private String noiDung;

    private String noiDungEn;

    private String fileAnhBia;

    private boolean trangThai;

    private Date ngayDang = new Date();

    private String createdBy;
}
