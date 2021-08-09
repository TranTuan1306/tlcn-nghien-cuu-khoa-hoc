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
 * Date: 12/8/2020
 * Time: 11:31 AM
 * Filename: KinhPhi
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document("kinh-phi")
public class KinhPhi {
    @Id
    private String id;

    private int soThuTu;

    private String noiDung;
}
