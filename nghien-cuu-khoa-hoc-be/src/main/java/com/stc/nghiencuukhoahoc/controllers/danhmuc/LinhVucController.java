package com.stc.nghiencuukhoahoc.controllers.danhmuc;

import com.stc.nghiencuukhoahoc.dtos.linhvuc.LinhVucDto;
import com.stc.nghiencuukhoahoc.entities.danhmuc.LinhVuc;
import com.stc.nghiencuukhoahoc.services.linhvuc.LinhVucService;
import com.stc.nghiencuukhoahoc.utils.PageUtils;
import io.swagger.annotations.ApiOperation;
import org.checkerframework.checker.units.qual.A;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rest/linh-vuc")
public class LinhVucController {
    private final LinhVucService linhVucService;

    public LinhVucController(LinhVucService linhVucService) {
        this.linhVucService = linhVucService;
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER', 'ROLE_TRUONG_DON_VI')")
    @GetMapping
    public ResponseEntity<List<LinhVuc>> getAllLinhVucActive() {
        return new ResponseEntity<>(linhVucService.getAllActive(), HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER', 'ROLE_TRUONG_DON_VI')")
    @GetMapping("/{linhVucId}")
    @ApiOperation(value = "Get lĩnh vực by id")
    public ResponseEntity<LinhVuc>getLinhVuc(@PathVariable String linhVucId){
        return new ResponseEntity<>(linhVucService.getLinhVuc(linhVucId), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/paging")
    public ResponseEntity<Page<LinhVuc>> getPaging(
            @RequestParam(name = "search", required = false, defaultValue = "") String search,
            @RequestParam(name = "page", required = false, defaultValue = "${paging.default.page}") int page,
            @RequestParam(name = "size", required = false, defaultValue = "${paging.default.size}") int size,
            @RequestParam(name = "sort", required = false, defaultValue = "ASC") String sort,
            @RequestParam(name = "column", required = false, defaultValue = "ten") String sortColumn) {
        Pageable pageable = PageUtils.createPageable(page, size, sort, sortColumn);
        Page<LinhVuc> result = linhVucService.getPaging( search, pageable);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping
    public ResponseEntity<LinhVuc> addNew(@RequestBody LinhVucDto dto) {
        LinhVuc result = linhVucService.addNew(dto);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<LinhVuc> update(@PathVariable String id, @RequestBody LinhVucDto dto) {
        LinhVuc result = linhVucService.update(id, dto);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<LinhVuc> delete(@PathVariable String id) {
        LinhVuc result = linhVucService.changeStatus(id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
