package com.stc.nghiencuukhoahoc.controllers.danhmuc;

import com.stc.nghiencuukhoahoc.dtos.ChuyenMucBaiVietDto;
import com.stc.nghiencuukhoahoc.entities.ChuyenMucBaiViet;
import com.stc.nghiencuukhoahoc.services.chuyenmucbaiviet.ChuyenMucBaiVietService;
import com.stc.nghiencuukhoahoc.utils.PageUtils;
import io.swagger.annotations.ApiOperation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

/**
 * Created by IntelliJ IDEA.
 * User: vlong
 * Date: 6/5/2021
 * Time: 3:01 PM
 * Filename: ChuyenMucBaiVietController
 */
@RestController
@RequestMapping("/rest/chuyen-muc-bai-viet")
public class ChuyenMucBaiVietController {
    private final ChuyenMucBaiVietService chuyenMucBaiVietService;

    public ChuyenMucBaiVietController(ChuyenMucBaiVietService chuyenMucBaiVietService) {
        this.chuyenMucBaiVietService = chuyenMucBaiVietService;
    }

    @GetMapping("/{chuyenMucId}")
    @ApiOperation(value = "Get chuyên mục by chuyên mục id")
    public ResponseEntity<ChuyenMucBaiViet>getChuyenMuc(@PathVariable String chuyenMucId){
        return new ResponseEntity<>(chuyenMucBaiVietService.getChuyenMucBaiViet(chuyenMucId), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/paging")
    @ApiOperation(value = "Get paging chuyên mục bài viết")
    public ResponseEntity<Page<ChuyenMucBaiViet>>getPaging(
            @RequestParam(name = "search", required = false, defaultValue = "") String search,
            @RequestParam(name = "page", required = false, defaultValue = "${paging.default.page}") int page,
            @RequestParam(name = "size", required = false, defaultValue = "${paging.default.size}") int size,
            @RequestParam(name = "sort", required = false, defaultValue = "ASC") String sort,
            @RequestParam(name = "column", required = false, defaultValue = "tenChuyenMuc") String sortColumn){
        Pageable pageable = PageUtils.createPageable(page, size, sort, sortColumn);
        return new ResponseEntity<>(chuyenMucBaiVietService.getChuyenMucBaiVietPaging(search, pageable), HttpStatus.OK);
    }

    @GetMapping("/paging-active")
    @ApiOperation(value = "Get paging chuyên mục bài viết active")
    public ResponseEntity<Page<ChuyenMucBaiViet>>getPagingActive(
            @RequestParam(name = "search", required = false, defaultValue = "") String search,
            @RequestParam(name = "page", required = false, defaultValue = "${paging.default.page}") int page,
            @RequestParam(name = "size", required = false, defaultValue = "${paging.default.size}") int size,
            @RequestParam(name = "sort", required = false, defaultValue = "ASC") String sort,
            @RequestParam(name = "column", required = false, defaultValue = "tenChuyenMuc") String sortColumn){
        Pageable pageable = PageUtils.createPageable(page, size, sort, sortColumn);
        return new ResponseEntity<>(chuyenMucBaiVietService.getChuyenMucBaiVietActive(search, pageable), HttpStatus.OK);
    }


    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping
    @ApiOperation(value = "Create chuyên mục bài viết")
    public ResponseEntity<ChuyenMucBaiViet>createChuyenMuc(@RequestBody ChuyenMucBaiVietDto dto){
        return new ResponseEntity<>(chuyenMucBaiVietService.addChuyenMucBaiViet(dto), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/{chuyenMucId}")
    @ApiOperation(value = "Update chuyên mục bài viết")
    public ResponseEntity<ChuyenMucBaiViet>updateChuyenMucBaiViet(@PathVariable String chuyenMucId, @RequestBody ChuyenMucBaiVietDto dto){
        return new ResponseEntity<>(chuyenMucBaiVietService.updateChuyenMucBaiViet(chuyenMucId, dto), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{chuyenMucId}")
    @ApiOperation(value = "Change status chuyên mục bài viết")
    public ResponseEntity<ChuyenMucBaiViet>changeStatusChuyenMucBaiViet(@PathVariable String chuyenMucId){
        return new ResponseEntity<>(chuyenMucBaiVietService.changeStatusChuyenMucBaiViet(chuyenMucId), HttpStatus.OK);
    }
}
