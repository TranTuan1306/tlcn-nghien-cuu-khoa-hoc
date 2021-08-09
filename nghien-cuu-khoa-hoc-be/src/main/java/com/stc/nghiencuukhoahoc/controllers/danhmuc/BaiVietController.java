package com.stc.nghiencuukhoahoc.controllers.danhmuc;

import com.stc.nghiencuukhoahoc.dtos.baiviet.BaiVietDto;
import com.stc.nghiencuukhoahoc.entities.danhmuc.BaiViet;
import com.stc.nghiencuukhoahoc.services.baiviet.BaiVietService;
import com.stc.nghiencuukhoahoc.utils.PageUtils;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

/**
 * Created by IntelliJ IDEA.
 * User: vlong
 * Date: 7/6/2021
 * Time: 10:25 AM
 * Filename: CauHinhEmailController
 */
@RestController
@RequestMapping("/rest/bai-viet")
public class BaiVietController {
    private final BaiVietService baiVietService;

    public BaiVietController(BaiVietService baiVietService) {
        this.baiVietService = baiVietService;
    }

    @GetMapping("/{baiVietId}")
    @ApiOperation(value = "Get bài viết by baiVietId")
    public ResponseEntity<BaiViet> getBaiViet(@PathVariable String baiVietId){
        return new ResponseEntity<>(baiVietService.getBaiViet(baiVietId), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping
    @ApiOperation(value = "Create bài viết")
    public ResponseEntity<BaiViet> createBaiViet(@RequestBody BaiVietDto dto, Principal principal){
        return new ResponseEntity<>(baiVietService.createBaiViet(principal.getName(), dto), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/{baiVietId}")
    @ApiOperation(value = "Update bài viết by baiVietId")
    public ResponseEntity<BaiViet> updateBaiViet(@PathVariable String baiVietId, @RequestBody BaiVietDto dto){
        return new ResponseEntity<>(baiVietService.updateBaiViet(baiVietId, dto), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{baiVietId}")
    @ApiOperation(value = "Delete bài viết by baiVietId")
    public ResponseEntity<String> deleteBaiViet(@PathVariable String baiVietId){
        return new ResponseEntity<>(baiVietService.deleteBaiViet(baiVietId), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/{baiVietId}/change-status")
    @ApiOperation(value = "Đổi trạng thái bài viết by baiVietId")
    public ResponseEntity<BaiViet> changeStatusBaiViet(@PathVariable String baiVietId){
        return new ResponseEntity<>(baiVietService.changeStatus(baiVietId), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/paging")
    @ApiOperation(value = "Get all bài viết paging")
    public ResponseEntity<Page<BaiViet>> getAllBaiVietPaging(
            @RequestParam(name = "search", required = false, defaultValue = "") String search,
            @RequestParam(name = "page", required = false, defaultValue = "${paging.default.page}") int page,
            @RequestParam(name = "size", required = false, defaultValue = "${paging.default.size}") int size,
            @RequestParam(name = "sort", required = false, defaultValue = "ASC") String sort,
            @RequestParam(name = "column", required = false, defaultValue = "tieuDe") String sortColumn){
        Pageable pageable = PageUtils.createPageable(page, size, sort, sortColumn);
        return new ResponseEntity<>(baiVietService.getAllBaiVietPaging(search, pageable),HttpStatus.OK);
    }

    @GetMapping("/paging-active")
    @ApiOperation(value = "Get all bài viết active paging")
    public ResponseEntity<Page<BaiViet>> getAllBaiVietActivePaging(
            @RequestParam(name = "search", required = false, defaultValue = "") String search,
            @RequestParam(name = "page", required = false, defaultValue = "${paging.default.page}") int page,
            @RequestParam(name = "size", required = false, defaultValue = "${paging.default.size}") int size,
            @RequestParam(name = "sort", required = false, defaultValue = "ASC") String sort,
            @RequestParam(name = "column", required = false, defaultValue = "tieuDe") String sortColumn){
        Pageable pageable = PageUtils.createPageable(page, size, sort, sortColumn);
        return new ResponseEntity<>(baiVietService.getAllBaiVietActivePaging(search, pageable), HttpStatus.OK);
    }

    @GetMapping("/pageing-active/chuyen-muc")
    @ApiOperation(value = "Get all bài viết active by chuyên mục bài viết paging")
    public ResponseEntity<Page<BaiViet>> getAllBaiVietActiveByChuyenMucBaiVietPaging(
            @RequestParam(name = "chuyenMucBaiVietId") String chuyenMucBaiVietId,
            @RequestParam(name = "search", required = false, defaultValue = "") String search,
            @RequestParam(name = "page", required = false, defaultValue = "${paging.default.page}") int page,
            @RequestParam(name = "size", required = false, defaultValue = "${paging.default.size}") int size,
            @RequestParam(name = "sort", required = false, defaultValue = "ASC") String sort,
            @RequestParam(name = "column", required = false, defaultValue = "tieuDe") String sortColumn){
        Pageable pageable = PageUtils.createPageable(page, size, sort, sortColumn);
        return new ResponseEntity<>(baiVietService.getAllBaiVietByChuyenMucBaiVietIdActivePaging(search, chuyenMucBaiVietId,pageable), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/paging/chuyen-muc")
    @ApiOperation(value = "Get all bài viết by chuyên mục bài viết paging")
    public ResponseEntity<Page<BaiViet>> getAllBaiVietByChuyenMucBaiVietPaging(
            @RequestParam(name = "chuyenMucBaiVietId") String chuyenMucBaiVietId,
            @RequestParam(name = "search", required = false, defaultValue = "") String search,
            @RequestParam(name = "page", required = false, defaultValue = "${paging.default.page}") int page,
            @RequestParam(name = "size", required = false, defaultValue = "${paging.default.size}") int size,
            @RequestParam(name = "sort", required = false, defaultValue = "ASC") String sort,
            @RequestParam(name = "column", required = false, defaultValue = "tieuDe") String sortColumn){
        Pageable pageable = PageUtils.createPageable(page, size, sort, sortColumn);
        return new ResponseEntity<>(baiVietService.getAllBaiVietByChuyenMucBaiVietIdPaging(search, chuyenMucBaiVietId,pageable), HttpStatus.OK);
    }

}
