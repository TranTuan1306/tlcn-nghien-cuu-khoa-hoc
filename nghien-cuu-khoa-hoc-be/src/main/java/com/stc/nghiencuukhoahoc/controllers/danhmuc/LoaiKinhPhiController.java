package com.stc.nghiencuukhoahoc.controllers.danhmuc;

import com.netflix.ribbon.proxy.annotation.Http;
import com.stc.nghiencuukhoahoc.dtos.LoaiKinhPhiDto;
import com.stc.nghiencuukhoahoc.entities.danhmuc.LoaiKinhPhi;
import com.stc.nghiencuukhoahoc.services.loaikinhphi.LoaiKinhPhiService;
import com.stc.nghiencuukhoahoc.utils.PageUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.ws.rs.Path;
import java.util.List;

/**
 * Created by IntelliJ IDEA.
 * User: thangtm
 * Date: 3/10/2021
 * Time: 10:36 AM
 * Filename: LoaiKinhPhiController
 */
@RestController
@RequestMapping("/rest/loai-kinh-phi")
public class LoaiKinhPhiController {
    private final LoaiKinhPhiService loaiKinhPhiService;

    public LoaiKinhPhiController(LoaiKinhPhiService loaiKinhPhiService) {
        this.loaiKinhPhiService = loaiKinhPhiService;
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER', 'ROLE_TRUONG_DON_VI')")
    @GetMapping("/active")
    public ResponseEntity<List<LoaiKinhPhi>> getAllLoaiKinhPhiActive() {
        return new ResponseEntity<>(loaiKinhPhiService.getAllLoaiKinhPhiByTrangThaiTrue(), HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER', 'ROLE_TRUONG_DON_VI')")
    @GetMapping("/{id}")
    public ResponseEntity<LoaiKinhPhi>getLoaiKinhPhi(@PathVariable String id){
        return new ResponseEntity<>(loaiKinhPhiService.getLoaiKinhPhi(id), HttpStatus.OK);
    }
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/paging")
    public ResponseEntity<Page<LoaiKinhPhi>> getPaging(
            @RequestParam(name = "search", required = false, defaultValue = "") String search,
            @RequestParam(name = "page", required = false, defaultValue = "${paging.default.page}") int page,
            @RequestParam(name = "size", required = false, defaultValue = "${paging.default.size}") int size,
            @RequestParam(name = "sort", required = false, defaultValue = "ASC") String sort,
            @RequestParam(name = "column", required = false, defaultValue = "ten") String sortColumn) {
        Pageable pageable = PageUtils.createPageable(page, size, sort, sortColumn);
        Page<LoaiKinhPhi> result = loaiKinhPhiService.getPaging( search, pageable);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping
    public ResponseEntity<LoaiKinhPhi> addNew(@RequestBody LoaiKinhPhiDto dto) {
        LoaiKinhPhi result = loaiKinhPhiService.addNew(dto);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<LoaiKinhPhi> update(@PathVariable String id, @RequestBody LoaiKinhPhiDto dto) {
        LoaiKinhPhi result = loaiKinhPhiService.update(id, dto);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<LoaiKinhPhi> changeStatus(@PathVariable String id){
        return new ResponseEntity<>(loaiKinhPhiService.changeStatus(id), HttpStatus.OK);
    }
}
