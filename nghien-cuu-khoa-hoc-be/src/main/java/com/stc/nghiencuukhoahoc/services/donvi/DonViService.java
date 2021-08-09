package com.stc.nghiencuukhoahoc.services.donvi;

import com.stc.nghiencuukhoahoc.entities.embeded.DonViEd;

import java.util.List;

/**
 * Created by IntelliJ IDEA.
 * User: thangtm
 * Date: 4/29/2021
 * Time: 10:40 AM
 * Filename: DonViService
 */
public interface DonViService {
    List<DonViEd> getAll();
    DonViEd getDonVi(String id);
}
