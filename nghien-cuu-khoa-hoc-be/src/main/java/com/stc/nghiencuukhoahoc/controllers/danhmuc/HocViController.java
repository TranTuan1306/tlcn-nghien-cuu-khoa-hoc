package com.stc.nghiencuukhoahoc.controllers.danhmuc;

import com.netflix.ribbon.proxy.annotation.Http;
import com.stc.nghiencuukhoahoc.dtos.hocvi.HocViDto;
import com.stc.nghiencuukhoahoc.entities.danhmuc.HocVi;
import com.stc.nghiencuukhoahoc.services.hocvi.HocViService;
import com.stc.nghiencuukhoahoc.utils.PageUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.ws.rs.Path;
import java.util.List;

@RestController
@RequestMapping("/rest/hoc-vi")
public class HocViController {
    private final HocViService hocViService;

    public HocViController(HocViService hocViService) {
        this.hocViService = hocViService;
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER', 'ROLE_TRUONG_DON_VI')")
    @GetMapping
    public ResponseEntity<List<HocVi>> getAllActive() {
        return new ResponseEntity<>(hocViService.getAllActive(), HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER', 'ROLE_TRUONG_DON_VI')")
    @GetMapping("/{id}")
    public ResponseEntity<HocVi> getHocVi(@PathVariable String id){
        return new ResponseEntity<>(hocViService.getHocVi(id), HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    @GetMapping("/ten-hoc-vi/{ten}")
    public ResponseEntity<HocVi> getHocViByTenHocVi(@PathVariable String ten){
        return new ResponseEntity<>(hocViService.getHocViByTenHocVi(ten), HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    @GetMapping("/paging")
    public ResponseEntity<Page<HocVi>> getPaging(
            @RequestParam(name = "search", required = false, defaultValue = "") String search,
            @RequestParam(name = "page", required = false, defaultValue = "${paging.default.page}") int page,
            @RequestParam(name = "size", required = false, defaultValue = "${paging.default.size}") int size,
            @RequestParam(name = "sort", required = false, defaultValue = "ASC") String sort,
            @RequestParam(name = "column", required = false, defaultValue = "ten") String sortColumn) {
        Pageable pageable = PageUtils.createPageable(page, size, sort, sortColumn);
        Page<HocVi> result = hocViService.getPaging( search, pageable);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    @PostMapping
    public ResponseEntity<HocVi> addNew(@RequestBody HocViDto dto) {
        HocVi result = hocViService.addNew(dto);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<HocVi> update(@PathVariable String id, @RequestBody HocViDto dto) {
        HocVi result = hocViService.update(id, dto);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<HocVi> delete(@PathVariable String id) {
        HocVi result = hocViService.changeStatus(id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
