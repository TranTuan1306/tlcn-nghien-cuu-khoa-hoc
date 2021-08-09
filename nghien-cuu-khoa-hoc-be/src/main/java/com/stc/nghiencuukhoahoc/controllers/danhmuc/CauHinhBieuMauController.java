package com.stc.nghiencuukhoahoc.controllers.danhmuc;

import com.stc.nghiencuukhoahoc.dtos.CauHinhBieuMauDto;
import com.stc.nghiencuukhoahoc.entities.CauHinhBieuMau;
import com.stc.nghiencuukhoahoc.services.cauhinhbieumau.CauHinhBieuMauService;
import com.stc.nghiencuukhoahoc.utils.PageUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

/**
 * Created by IntelliJ IDEA.
 * User: thangtm
 * Date: 5/5/2021
 * Time: 2:56 PM
 * Filename: CauHinhBieuMauController
 */
@RestController
@RequestMapping("/rest/cau-hinh-bieu-mau")
public class CauHinhBieuMauController {
    private final CauHinhBieuMauService cauHinhBieuMauService;

    public CauHinhBieuMauController(CauHinhBieuMauService cauHinhBieuMauService) {
        this.cauHinhBieuMauService = cauHinhBieuMauService;
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER', 'ROLE_TRUONG_DON_VI')")
    @GetMapping
    public ResponseEntity<CauHinhBieuMau> getCauHinh() {
        return new ResponseEntity<>(cauHinhBieuMauService.getCauHinhCore(), HttpStatus.OK);
    }


    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping
    public ResponseEntity<CauHinhBieuMau> createCauHinh(@Valid @RequestBody CauHinhBieuMauDto dto) {
        return new ResponseEntity<>(cauHinhBieuMauService.create(dto), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<CauHinhBieuMau> updateCauHinh(@PathVariable String id, @Valid @RequestBody CauHinhBieuMauDto dto) {
        return new ResponseEntity<>(cauHinhBieuMauService.update(id, dto), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/paging")
    public ResponseEntity<Page<CauHinhBieuMau>> getAllCauHinhPaging(
            @RequestParam(name = "page", required = false, defaultValue = "${paging.default.page}") int page,
            @RequestParam(name = "size", required = false, defaultValue = "${paging.default.size}") int size,
            @RequestParam(name = "sort", required = false, defaultValue = "ASC") String sort,
            @RequestParam(name = "column", required = false, defaultValue = "tenBenA") String sortColumn) {
        Pageable pageable = PageUtils.createPageable(page, size, sort, sortColumn);
        return new ResponseEntity<>(cauHinhBieuMauService.getAllCauHinhBieuMau(pageable), HttpStatus.OK);
    }
}
