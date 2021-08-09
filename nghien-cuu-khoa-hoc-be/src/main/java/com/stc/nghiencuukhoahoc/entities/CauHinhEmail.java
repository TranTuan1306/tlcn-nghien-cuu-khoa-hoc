package com.stc.nghiencuukhoahoc.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Created by: IntelliJ IDEA
 * User      : thangpx
 * Date      : 3/2/20
 * Time      : 6:53 AM
 * Filename  : CauHinhEmailController
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document("cau-hinh-email")
public class CauHinhEmail {
    @Id
    private String id;

    private String emailGuiThu;

    private String emailNhanThu;

    private String passEmailGuiThu;

}
