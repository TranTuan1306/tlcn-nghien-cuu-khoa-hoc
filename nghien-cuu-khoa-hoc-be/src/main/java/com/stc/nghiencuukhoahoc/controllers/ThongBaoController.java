package com.stc.nghiencuukhoahoc.controllers;

import com.stc.nghiencuukhoahoc.entities.ThongBao;
import com.stc.nghiencuukhoahoc.services.thongbao.ThongBaoService;
import com.stc.nghiencuukhoahoc.utils.PageUtils;
import io.swagger.annotations.ApiOperation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;


/**
 * Created by IntelliJ IDEA.
 * User: vlong
 * Date: 7/3/2021
 * Time: 10:26 AM
 * Filename: ThongBaoController
 */

@RestController
@RequestMapping("/rest/thong-bao")
public class ThongBaoController {
    private final ThongBaoService thongBaoService;

    public ThongBaoController(ThongBaoService thongBaoService) {
        this.thongBaoService = thongBaoService;
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/paging")
    @ApiOperation(value = "Get thông báo paging")
    public ResponseEntity<Page<ThongBao>> getPaging(
            @RequestParam(name = "search", required = false, defaultValue = "") String search,
            @RequestParam(name = "page", required = false, defaultValue = "${paging.default.page}") int page,
            @RequestParam(name = "size", required = false, defaultValue = "${paging.default.size}") int size,
            @RequestParam(name = "sort", required = false, defaultValue = "ASC") String sort,
            @RequestParam(name = "column", required = false, defaultValue = "ten") String sortColumn) {
        Pageable pageable = PageUtils.createPageable(page, size, sort, sortColumn);
        Page<ThongBao> result = thongBaoService.getAllThongBaoPaging(search, pageable);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_TRUONG_DON_VI')")
    @PostMapping("/change-status")
    @ApiOperation(value = "Cập nhật trạng thái cho thông báo")
    public ResponseEntity<List<ThongBao>> changeStatus(@RequestBody List<String> thongBaoIds){
        return new ResponseEntity<>(thongBaoService.changeTrangThaiThongBao(thongBaoIds),HttpStatus.OK);
    }
}
