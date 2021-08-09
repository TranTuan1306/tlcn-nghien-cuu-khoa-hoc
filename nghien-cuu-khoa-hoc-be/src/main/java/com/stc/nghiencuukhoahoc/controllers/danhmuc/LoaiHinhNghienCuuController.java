package com.stc.nghiencuukhoahoc.controllers.danhmuc;

import com.stc.nghiencuukhoahoc.dtos.loaihinhnghiencuu.LoaiHinhNghienCuuDto;
import com.stc.nghiencuukhoahoc.entities.LoaiHinhNghienCuu;
import com.stc.nghiencuukhoahoc.services.loaihinhnghiencuu.LoaiHinhNghienCuuService;
import com.stc.nghiencuukhoahoc.utils.PageUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rest/loai-hinh-nghien-cuu")
public class LoaiHinhNghienCuuController {
    private final LoaiHinhNghienCuuService loaiHinhNghienCuuService;

    public LoaiHinhNghienCuuController(LoaiHinhNghienCuuService loaiHinhNghienCuuService) {
        this.loaiHinhNghienCuuService = loaiHinhNghienCuuService;
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER', 'ROLE_TRUONG_DON_VI')")
    @GetMapping
    public ResponseEntity<List<LoaiHinhNghienCuu>> getAllLoaiHinhNghienCuuActive() {
        return new ResponseEntity<>(loaiHinhNghienCuuService.getAllActive(), HttpStatus.OK);
    }


    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/paging")
    public ResponseEntity<Page<LoaiHinhNghienCuu>> getPaging(
            @RequestParam(name = "search", required = false, defaultValue = "") String search,
            @RequestParam(name = "page", required = false, defaultValue = "${paging.default.page}") int page,
            @RequestParam(name = "size", required = false, defaultValue = "${paging.default.size}") int size,
            @RequestParam(name = "sort", required = false, defaultValue = "ASC") String sort,
            @RequestParam(name = "column", required = false, defaultValue = "ten") String sortColumn) {
        Pageable pageable = PageUtils.createPageable(page, size, sort, sortColumn);
        Page<LoaiHinhNghienCuu> result = loaiHinhNghienCuuService.getPaging( search, pageable);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping
    public ResponseEntity<LoaiHinhNghienCuu> addNew(@RequestBody LoaiHinhNghienCuuDto dto) {
        LoaiHinhNghienCuu result = loaiHinhNghienCuuService.addNew(dto);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<LoaiHinhNghienCuu> update(@PathVariable String id, @RequestBody LoaiHinhNghienCuuDto dto) {
        LoaiHinhNghienCuu result = loaiHinhNghienCuuService.update(id, dto);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<LoaiHinhNghienCuu> delete(@PathVariable String id) {
        LoaiHinhNghienCuu result = loaiHinhNghienCuuService.changeStatus(id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
