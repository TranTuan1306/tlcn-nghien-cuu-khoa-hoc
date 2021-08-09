package com.stc.nghiencuukhoahoc.services.donvi;

import com.stc.nghiencuukhoahoc.clients.HrmServiceClient;
import com.stc.nghiencuukhoahoc.dtos.hrm.DonVi;
import com.stc.nghiencuukhoahoc.dtos.mapper.Mapper;
import com.stc.nghiencuukhoahoc.entities.embeded.DonViEd;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by IntelliJ IDEA.
 * User: thangtm
 * Date: 4/29/2021
 * Time: 10:40 AM
 * Filename: DonViServiceImpl
 */
@Service
@Slf4j
public class DonViServiceImpl implements DonViService{
    private final HrmServiceClient hrmServiceClient;

    public DonViServiceImpl(HrmServiceClient hrmServiceClient) {
        this.hrmServiceClient = hrmServiceClient;
    }

    @Override
    public List<DonViEd> getAll() {
        List<DonViEd> donViEds = new ArrayList<>();
        hrmServiceClient.getAllDonVi().forEach(donVi -> {
            donViEds.add(Mapper.convertDonVi(donVi));
        });
        return donViEds;
    }

    @Override
    public DonViEd getDonVi(String id) {
        DonVi donVi = hrmServiceClient.getDonViById(id);
        return Mapper.convertDonVi(donVi);
    }
}
