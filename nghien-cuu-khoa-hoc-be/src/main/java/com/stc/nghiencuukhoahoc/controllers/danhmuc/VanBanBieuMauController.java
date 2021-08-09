package com.stc.nghiencuukhoahoc.controllers.danhmuc;
import com.stc.nghiencuukhoahoc.dtos.vanbanbieumau.VanBanBieuMauDto;
import com.stc.nghiencuukhoahoc.entities.VanBanBieuMau;
import com.stc.nghiencuukhoahoc.entities.danhmuc.BaiViet;
import com.stc.nghiencuukhoahoc.services.vanbanbieumau.VanBanBieuMauService;
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
 * Date: 7/7/2021
 * Time: 11:59 PM
 * Filename: VanBanBieuMauController
 */
@RestController
@RequestMapping("/rest/van-ban-bieu-mau")
public class VanBanBieuMauController {
    private final VanBanBieuMauService vanBanBieuMauService;

    public VanBanBieuMauController(VanBanBieuMauService vanBanBieuMauService) {
        this.vanBanBieuMauService = vanBanBieuMauService;
    }

    @GetMapping("/{vanBanId}")
    @ApiOperation(value = "Get văn bản biểu mẫu by vanBanId")
    public ResponseEntity<VanBanBieuMau> getVanBanBieuMau(@PathVariable String vanBanId){
        return new ResponseEntity<>(vanBanBieuMauService.getVanBanBieuMau(vanBanId), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping
    @ApiOperation(value = "Create văn bản biểu mẫu")
    public ResponseEntity<VanBanBieuMau> createVanBanBieuMau(@RequestBody VanBanBieuMauDto dto){
        return new ResponseEntity<>(vanBanBieuMauService.createVanBanBieuMau(dto), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/{vanBanId}")
    @ApiOperation(value = "Update bài viết by baiVietId")
    public ResponseEntity<VanBanBieuMau> updateVanBanBieuMau(@PathVariable String vanBanId, @RequestBody VanBanBieuMauDto dto){
        return new ResponseEntity<>(vanBanBieuMauService.updateVanBanBieuMau(vanBanId, dto), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{vanBanId}")
    @ApiOperation(value = "Đổi trạng thái văn bản biểu mẫu by vanBanId")
    public ResponseEntity<VanBanBieuMau> changeStatusVanBanBieuMau(@PathVariable String vanBanId){
        return new ResponseEntity<>(vanBanBieuMauService.changeStatus(vanBanId), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/paging")
    @ApiOperation(value = "Get all văn bản biểu mẫu paging")
    public ResponseEntity<Page<VanBanBieuMau>> getAllVanBanBieuMauPaging(
            @RequestParam(name = "search", required = false, defaultValue = "") String search,
            @RequestParam(name = "page", required = false, defaultValue = "${paging.default.page}") int page,
            @RequestParam(name = "size", required = false, defaultValue = "${paging.default.size}") int size,
            @RequestParam(name = "sort", required = false, defaultValue = "ASC") String sort,
            @RequestParam(name = "column", required = false, defaultValue = "tieuDe") String sortColumn){
        Pageable pageable = PageUtils.createPageable(page, size, sort, sortColumn);
        return new ResponseEntity<>(vanBanBieuMauService.getAllVanBanBieuMauPaging(search, pageable),HttpStatus.OK);
    }

    @GetMapping("/paging-active")
    @ApiOperation(value = "Get all văn bản biểu mẫu active paging")
    public ResponseEntity<Page<VanBanBieuMau>> getAllVanBanBieuMauActivePaging(
            @RequestParam(name = "search", required = false, defaultValue = "") String search,
            @RequestParam(name = "page", required = false, defaultValue = "${paging.default.page}") int page,
            @RequestParam(name = "size", required = false, defaultValue = "${paging.default.size}") int size,
            @RequestParam(name = "sort", required = false, defaultValue = "ASC") String sort,
            @RequestParam(name = "column", required = false, defaultValue = "tieuDe") String sortColumn){
        Pageable pageable = PageUtils.createPageable(page, size, sort, sortColumn);
        return new ResponseEntity<>(vanBanBieuMauService.getAllVanBanBieuMauActivePaging(search, pageable),HttpStatus.OK);
    }
}
