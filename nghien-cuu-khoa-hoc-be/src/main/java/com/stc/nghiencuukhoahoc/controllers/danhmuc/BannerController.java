package com.stc.nghiencuukhoahoc.controllers.danhmuc;

import com.stc.nghiencuukhoahoc.dtos.BannerDto;
import com.stc.nghiencuukhoahoc.entities.danhmuc.Banner;
import com.stc.nghiencuukhoahoc.services.banner.BannerService;
import com.stc.nghiencuukhoahoc.utils.PageUtils;
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
 * Date: 7/10/2021
 * Time: 12:25 AM
 * Filename: BannerController
 */

@RestController
@RequestMapping("/rest/banner")
public class BannerController {
    private final BannerService bannerService;

    public BannerController(BannerService bannerService) {
        this.bannerService = bannerService;
    }

    @GetMapping("/{bannerId}")
    @ApiOperation(value = "Get banner by bannerId")
    public ResponseEntity<Banner> getBanner(@PathVariable String bannerId){
        return new ResponseEntity<>(bannerService.getBanner(bannerId), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping
    @ApiOperation(value = "Create Banner")
    public ResponseEntity<Banner> createBanner(@RequestBody BannerDto dto, Principal principal){
        return new ResponseEntity<>(bannerService.createBanner(dto), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/{bannerId}")
    @ApiOperation(value = "Update banner by bannerId")
    public ResponseEntity<Banner> updateBanner(@PathVariable String bannerId, @RequestBody BannerDto dto){
        return new ResponseEntity<>(bannerService.updateBanner(bannerId, dto), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{bannerId}")
    @ApiOperation(value = "Delete banner by bannerId")
    public ResponseEntity<String> deleteBanner(@PathVariable String bannerId){
        return new ResponseEntity<>(bannerService.deleteBanner(bannerId), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/{bannerId}/change-status")
    @ApiOperation(value = "Đổi trạng thái banner by bannerId")
    public ResponseEntity<Banner> changeStatusBanner(@PathVariable String bannerId){
        return new ResponseEntity<>(bannerService.changeStatus(bannerId), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/paging")
    @ApiOperation(value = "Get all banner paging")
    public ResponseEntity<Page<Banner>> getAllBannerPaging(
            @RequestParam(name = "search", required = false, defaultValue = "") String search,
            @RequestParam(name = "page", required = false, defaultValue = "${paging.default.page}") int page,
            @RequestParam(name = "size", required = false, defaultValue = "${paging.default.size}") int size,
            @RequestParam(name = "sort", required = false, defaultValue = "ASC") String sort,
            @RequestParam(name = "column", required = false, defaultValue = "tieuDe") String sortColumn){
        Pageable pageable = PageUtils.createPageable(page, size, sort, sortColumn);
        return new ResponseEntity<>(bannerService.getAllBannerPaging(search, pageable),HttpStatus.OK);
    }

    @GetMapping("/paging-active")
    @ApiOperation(value = "Get all banner active paging")
    public ResponseEntity<Page<Banner>> getAllBannerActivePaging(
            @RequestParam(name = "search", required = false, defaultValue = "") String search,
            @RequestParam(name = "page", required = false, defaultValue = "${paging.default.page}") int page,
            @RequestParam(name = "size", required = false, defaultValue = "${paging.default.size}") int size,
            @RequestParam(name = "sort", required = false, defaultValue = "ASC") String sort,
            @RequestParam(name = "column", required = false, defaultValue = "tieuDe") String sortColumn){
        Pageable pageable = PageUtils.createPageable(page, size, sort, sortColumn);
        return new ResponseEntity<>(bannerService.getAllBannerActive(search, pageable),HttpStatus.OK);
    }
}
