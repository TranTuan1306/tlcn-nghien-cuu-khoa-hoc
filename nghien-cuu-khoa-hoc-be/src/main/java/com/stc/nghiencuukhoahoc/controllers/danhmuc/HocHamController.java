package com.stc.nghiencuukhoahoc.controllers.danhmuc;

import com.stc.nghiencuukhoahoc.dtos.hocham.HocHamDto;
import com.stc.nghiencuukhoahoc.entities.danhmuc.HocHam;
import com.stc.nghiencuukhoahoc.services.hocham.HocHamService;
import com.stc.nghiencuukhoahoc.utils.PageUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rest/hoc-ham")
public class HocHamController {
    private final HocHamService hocHamService;

    public HocHamController(HocHamService hocHamService) {
        this.hocHamService = hocHamService;
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER', 'ROLE_TRUONG_DON_VI')")
    @GetMapping
    public ResponseEntity<List<HocHam>> getAllHocHamActive() {
        return new ResponseEntity<>(hocHamService.getAllHocHamActive(), HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER', 'ROLE_TRUONG_DON_VI')")
    @GetMapping("/{id}")
    public ResponseEntity<HocHam>getHocHam(@PathVariable String id){
        return new ResponseEntity<>(hocHamService.getHocHam(id), HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER', 'ROLE_TRUONG_DON_VI')")
    @GetMapping("/ten-hoc-ham/{ten}")
    public ResponseEntity<HocHam>getHocHamByTen(@PathVariable String ten){
        return new ResponseEntity<>(hocHamService.getHocHamByTen(ten), HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    @GetMapping("/paging")
    public ResponseEntity<Page<HocHam>> getPaging(
            @RequestParam(name = "search", required = false, defaultValue = "") String search,
            @RequestParam(name = "page", required = false, defaultValue = "${paging.default.page}") int page,
            @RequestParam(name = "size", required = false, defaultValue = "${paging.default.size}") int size,
            @RequestParam(name = "sort", required = false, defaultValue = "ASC") String sort,
            @RequestParam(name = "column", required = false, defaultValue = "ten") String sortColumn) {
        Pageable pageable = PageUtils.createPageable(page, size, sort, sortColumn);
        Page<HocHam> result = hocHamService.getPaging( search, pageable);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    @PostMapping
    public ResponseEntity<HocHam> addNew(@RequestBody HocHamDto dto) {
        HocHam result = hocHamService.addNew(dto);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<HocHam> update(@PathVariable String id, @RequestBody HocHamDto dto) {
        HocHam result = hocHamService.update(id, dto);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<HocHam> delete(@PathVariable String id) {
        HocHam result = hocHamService.changeStatus(id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
