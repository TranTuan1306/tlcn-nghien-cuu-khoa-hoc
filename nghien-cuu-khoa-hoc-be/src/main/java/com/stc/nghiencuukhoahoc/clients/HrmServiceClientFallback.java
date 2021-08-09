package com.stc.nghiencuukhoahoc.clients;

import com.stc.nghiencuukhoahoc.dtos.hrm.DonVi;
import com.stc.nghiencuukhoahoc.dtos.hrm.NhanVien;
import feign.hystrix.FallbackFactory;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Intellij IDEA.
 * User: thanhannguyen.
 * Date: 10/16/19.
 * Time: 15:01.
 * Filename: HrmServiceClientFallback.
 */
@Component("hrm-core")
@Slf4j
public class HrmServiceClientFallback implements FallbackFactory<HrmServiceClient> {
    @Override
    public HrmServiceClient create(Throwable throwable) {
        log.error("hrm-core service", throwable.getMessage());
        return new HrmServiceClient() {
            @Override
            public NhanVien getNhanVienByEmail(String email) {
                return null;
            }

            @Override
            public DonVi getDonViById(String id) {
                return null;
            }

            @Override
            public List<DonVi> getAllDonVi() {
                return null;
            }

            @Override
            public List<NhanVien> getNhanVienByDonViId(String donViId) {
                return new ArrayList<>();
            }

            @Override
            public NhanVien getTruongDonViByIdDonVi(String donViId) {
                return null;
            }
        };
    }
}
