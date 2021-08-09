package com.stc.nghiencuukhoahoc.controllers.danhmuc;

import com.stc.nghiencuukhoahoc.dtos.CauHinhEmailDto;
import com.stc.nghiencuukhoahoc.entities.CauHinhEmail;
import com.stc.nghiencuukhoahoc.services.cauhinhemail.CauHinhEmailService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

/**
 * Created by IntelliJ IDEA.
 * User: thangtm
 * Date: 5/5/2021
 * Time: 3:01 PM
 * Filename: CauHinhEmailController
 */
@RestController
@RequestMapping("/rest/cau-hinh-email")
///@PreAuthorize("hasRole('ADMIN')")
public class CauHinhEmailController {
    private final CauHinhEmailService cauHinhEmailService;

    public CauHinhEmailController(CauHinhEmailService cauHinhEmailService) {
        this.cauHinhEmailService = cauHinhEmailService;
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER', 'ROLE_TRUONG_DON_VI')")
    @GetMapping
    public ResponseEntity<CauHinhEmail> getCauHinh() {
        return new ResponseEntity<>(cauHinhEmailService.getCauHinhCore(), HttpStatus.OK);
    }


    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping
    public ResponseEntity<CauHinhEmail> createCauHinh(@Valid @RequestBody CauHinhEmailDto dto) {
        return new ResponseEntity<>(cauHinhEmailService.create(dto), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<CauHinhEmail> updateCauHinh(@PathVariable String id, @Valid @RequestBody CauHinhEmailDto dto) {
        return new ResponseEntity<>(cauHinhEmailService.update(id, dto), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/paging")
    public ResponseEntity<Page<CauHinhEmail>> getAllCauHinhPaging(
            @RequestParam(name = "page", required = false, defaultValue = "${paging.default.page}") int page,
            @RequestParam(name = "size", required = false, defaultValue = "${paging.default.size}") int size,
            @RequestParam(name = "sort", required = false, defaultValue = "ASC") String sort,
            @RequestParam(name = "column", required = false, defaultValue = "emailGuiThu") String sortColumn) {
        return new ResponseEntity<>(cauHinhEmailService.getAllCauHinhPaging(page, size, sort, sortColumn), HttpStatus.OK);
    }
}
