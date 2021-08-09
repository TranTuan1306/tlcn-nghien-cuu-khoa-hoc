package com.stc.nghiencuukhoahoc.entities.danhmuc;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

/**
 * Created by IntelliJ IDEA.
 * User: thangtm
 * Date: 1/7/2021
 * Time: 3:49 PM
 * Filename: LoaiKinhPhi
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document("loai-kinh-phi")
public class LoaiKinhPhi {
    @Id
    private String id;

    private String tenLoaiKinhPhi;

    private String tenLoaiKinhPhiEn;

    // list các field name trong phụ lục tương ứng, Ví dụ: noiDungChi, duKienKetQua,...
    private List<String> fieldNames;

    private boolean trangThai;
}
