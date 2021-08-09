package com.stc.nghiencuukhoahoc.controllers.danhmuc;

import com.stc.nghiencuukhoahoc.dtos.SanPhamDto;
import com.stc.nghiencuukhoahoc.entities.danhmuc.HocHam;
import com.stc.nghiencuukhoahoc.entities.danhmuc.SanPham;
import com.stc.nghiencuukhoahoc.services.sanpham.SanPhamService;
import com.stc.nghiencuukhoahoc.utils.PageUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by IntelliJ IDEA.
 * User: thangtm
 * Date: 12/9/2020
 * Time: 10:41 AM
 * Filename: SanPhamController
 */
@RestController
@RequestMapping("/rest/san-pham")
public class SanPhamController {
    private final SanPhamService sanPhamService;

    public SanPhamController(SanPhamService sanPhamService) {
        this.sanPhamService = sanPhamService;
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER', 'ROLE_TRUONG_DON_VI')")
    @GetMapping
    public ResponseEntity<List<SanPham>> getAllSanPham() {
        return new ResponseEntity<>(sanPhamService.getAll(), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/paging")
    public ResponseEntity<Page<SanPham>> getPaging(
            @RequestParam(name = "search", required = false, defaultValue = "") String search,
            @RequestParam(name = "page", required = false, defaultValue = "${paging.default.page}") int page,
            @RequestParam(name = "size", required = false, defaultValue = "${paging.default.size}") int size,
            @RequestParam(name = "sort", required = false, defaultValue = "ASC") String sort,
            @RequestParam(name = "column", required = false, defaultValue = "ten") String sortColumn) {
        Pageable pageable = PageUtils.createPageable(page, size, sort, sortColumn);
        return new ResponseEntity<>(sanPhamService.getPaging(search, pageable), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping
    public ResponseEntity<SanPham> addNew(@RequestBody SanPhamDto dto) {
        return new ResponseEntity<>(sanPhamService.addNew(dto), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<SanPham> update(@PathVariable String id, @RequestBody SanPhamDto dto) {
        return new ResponseEntity<>(sanPhamService.update(id, dto), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<SanPham> delete(@PathVariable String id) {
        SanPham result = sanPhamService.delete(id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER', 'ROLE_TRUONG_DON_VI')")
    @GetMapping("/loai-san-pham/{loaiSanPham}")
    public ResponseEntity<List<SanPham>>getAllSanPhamByLoaiSanPhamAndTrangThaiTrue(@PathVariable String loaiSanPham){
        return new ResponseEntity<>(sanPhamService.getAllByLoaiSanPhamAndTrangThaiTrue(loaiSanPham), HttpStatus.OK);
    }
}
