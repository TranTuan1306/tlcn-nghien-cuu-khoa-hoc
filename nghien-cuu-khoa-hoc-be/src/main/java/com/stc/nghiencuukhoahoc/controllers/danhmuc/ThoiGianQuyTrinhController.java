package com.stc.nghiencuukhoahoc.controllers.danhmuc;

import com.stc.nghiencuukhoahoc.dtos.ThoiGianQuyTrinhDto;
import com.stc.nghiencuukhoahoc.dtos.hocham.HocHamDto;
import com.stc.nghiencuukhoahoc.entities.ThoiGianQuyTrinh;
import com.stc.nghiencuukhoahoc.entities.danhmuc.HocHam;
import com.stc.nghiencuukhoahoc.services.thoigianquytrinh.ThoiGianQuyTrinhService;
import com.stc.nghiencuukhoahoc.utils.PageUtils;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.checkerframework.checker.units.qual.A;
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
 * Date: 3/10/2021
 * Time: 4:44 PM
 * Filename: ThoiGianQuyTrinhController
 */
@RestController
@RequestMapping("/rest/thoi-gian-quy-trinh")
public class ThoiGianQuyTrinhController {
    private final ThoiGianQuyTrinhService thoiGianQuyTrinhService;

    public ThoiGianQuyTrinhController(ThoiGianQuyTrinhService thoiGianQuyTrinhService) {
        this.thoiGianQuyTrinhService = thoiGianQuyTrinhService;
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER', 'ROLE_TRUONG_DON_VI')")
    @GetMapping("/active")
    @ApiOperation(value = "Get list thời gian active")
    public ResponseEntity<List<ThoiGianQuyTrinh>> getListActive() {
        return new ResponseEntity<>(thoiGianQuyTrinhService.getListActive(), HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER', 'ROLE_TRUONG_DON_VI')")
    @GetMapping("/{thoiGianId}")
    public ResponseEntity<ThoiGianQuyTrinh> getThoiGianQuyTrinh(@PathVariable String thoiGianId){
        return new ResponseEntity<>(thoiGianQuyTrinhService.getThoiGianQuyTrinh(thoiGianId), HttpStatus.OK);
    }


    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER', 'ROLE_TRUONG_DON_VI')")
    @GetMapping("/paging")
    @ApiOperation(value = "Get thời gian quy trình paging")
    public ResponseEntity<Page<ThoiGianQuyTrinh>> getPaging(
            @RequestParam(name = "search", required = false, defaultValue = "") String search,
            @RequestParam(name = "page", required = false, defaultValue = "${paging.default.page}") int page,
            @RequestParam(name = "size", required = false, defaultValue = "${paging.default.size}") int size,
            @RequestParam(name = "sort", required = false, defaultValue = "ASC") String sort,
            @RequestParam(name = "column", required = false, defaultValue = "namHoc") String sortColumn) {
        Pageable pageable = PageUtils.createPageable(page, size, sort, sortColumn);
        Page<ThoiGianQuyTrinh> result = thoiGianQuyTrinhService.getPaging(search, pageable);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping
    @ApiOperation(value = "Add thời gian quy trình")
    public ResponseEntity<ThoiGianQuyTrinh> addNew(@RequestBody ThoiGianQuyTrinhDto dto) {
        ThoiGianQuyTrinh result = thoiGianQuyTrinhService.addNew(dto);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/{id}")
    @ApiOperation(value = "Update thời gian quy trình")
    public ResponseEntity<ThoiGianQuyTrinh> update(@PathVariable String id, @RequestBody ThoiGianQuyTrinhDto dto) {
        ThoiGianQuyTrinh result = thoiGianQuyTrinhService.update(id, dto);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{id}")
    @ApiOperation(value = "Change status thời gian quy trình")
    public ResponseEntity<ThoiGianQuyTrinh> delete(@PathVariable String id) {
        ThoiGianQuyTrinh result = thoiGianQuyTrinhService.changeStatus(id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
