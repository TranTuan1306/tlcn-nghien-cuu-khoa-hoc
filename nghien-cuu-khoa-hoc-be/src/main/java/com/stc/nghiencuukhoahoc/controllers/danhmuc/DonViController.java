package com.stc.nghiencuukhoahoc.controllers.danhmuc;

import com.stc.nghiencuukhoahoc.dtos.hrm.DonVi;
import com.stc.nghiencuukhoahoc.entities.embeded.DonViEd;
import com.stc.nghiencuukhoahoc.services.donvi.DonViService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Created by IntelliJ IDEA.
 * User: thangtm
 * Date: 4/29/2021
 * Time: 10:56 AM
 * Filename: DonViController
 */
@RestController
@RequestMapping("/rest/don-vi")
public class DonViController {
    private final DonViService donViService;

    public DonViController(DonViService donViService) {
        this.donViService = donViService;
    }

    @GetMapping
    public ResponseEntity<List<DonViEd>> getAll() throws Exception {
        return new ResponseEntity<>(donViService.getAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DonViEd> getDonVi(@PathVariable String id){
        return new ResponseEntity<>(donViService.getDonVi(id), HttpStatus.OK);
    }
}
