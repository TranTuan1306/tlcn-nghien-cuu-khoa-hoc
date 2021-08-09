package com.stc.nghiencuukhoahoc.clients;

import com.stc.nghiencuukhoahoc.dtos.hrm.DonVi;
import com.stc.nghiencuukhoahoc.dtos.hrm.NhanVien;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;

/**
 * Created by Intellij IDEA.
 * User: thanhannguyen.
 * Date: 10/16/19.
 * Time: 15:00.
 * Filename: HrmServiceClient.
 */
@FeignClient(name = "hrm-core", fallbackFactory = HrmServiceClientFallback.class,
        url = "http://35.240.186.121:8080/hrm-core")
public interface HrmServiceClient {

    @RequestMapping(method = RequestMethod.GET, value = "/core/nhan-vien/email/{email}")
    NhanVien getNhanVienByEmail(@PathVariable String email);

    @RequestMapping(method = RequestMethod.GET, value = "/core/don-vi/{id}")
    DonVi getDonViById(@PathVariable("id") String id);

    @RequestMapping(method = RequestMethod.GET, value = "/core/don-vi")
    List<DonVi> getAllDonVi();

    @RequestMapping(method = RequestMethod.GET, value = "/core/nhan-vien/don-vi/{donViId}")
    List<NhanVien> getNhanVienByDonViId(@PathVariable String donViId);

    @RequestMapping(method = RequestMethod.GET, value = "/core/nhan-vien/don-vi/truong-don-vi/{donViId}")
    NhanVien getTruongDonViByIdDonVi(@PathVariable("donViId") String donViId);
}
