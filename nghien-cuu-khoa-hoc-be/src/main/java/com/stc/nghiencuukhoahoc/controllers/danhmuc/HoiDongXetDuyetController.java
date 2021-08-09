package com.stc.nghiencuukhoahoc.controllers.danhmuc;

import com.stc.nghiencuukhoahoc.dtos.hoidongxetduyet.HoiDongXetDuyetDto;
import com.stc.nghiencuukhoahoc.entities.HoiDongXetDuyet;
import com.stc.nghiencuukhoahoc.services.filestorage.FileStorageService;
import com.stc.nghiencuukhoahoc.services.hoidongxetduyet.HoiDongXetDuyetService;
import com.stc.nghiencuukhoahoc.utils.PageUtils;
import io.swagger.annotations.ApiOperation;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.util.List;

/**
 * Created by IntelliJ IDEA.
 * User: thangtm
 * Date: 5/5/2021
 * Time: 9:23 AM
 * Filename: HoiDongXetDuyetController
 */
@RestController
@RequestMapping("/rest/hoi-dong-xet-duyet")
public class HoiDongXetDuyetController {
    private final HoiDongXetDuyetService hoiDongXetDuyetService;
    private final FileStorageService fileStorageService;

    public HoiDongXetDuyetController(HoiDongXetDuyetService hoiDongXetDuyetService, FileStorageService fileStorageService) {
        this.hoiDongXetDuyetService = hoiDongXetDuyetService;
        this.fileStorageService = fileStorageService;
    }
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    @GetMapping
    public ResponseEntity<List<HoiDongXetDuyet>> getAllHoiDongXetDuyet() {
        return new ResponseEntity<>(hoiDongXetDuyetService.getAll(), HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER', 'ROLE_TRUONG_DON_VI')")
    @GetMapping("/{hoiDongXetDuyetId}")
    @ApiOperation(value = "Get hội dồng xét duyệt by id")
    public ResponseEntity<HoiDongXetDuyet> getHoiDongXetDuyet(@PathVariable String hoiDongXetDuyetId){
        return new ResponseEntity<>(hoiDongXetDuyetService.getHoiDongXetDuyet(hoiDongXetDuyetId), HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    @GetMapping("/paging")
    public ResponseEntity<Page<HoiDongXetDuyet>> getPaging(
            @RequestParam(name = "search", required = false, defaultValue = "") String search,
            @RequestParam(name = "page", required = false, defaultValue = "${paging.default.page}") int page,
            @RequestParam(name = "size", required = false, defaultValue = "${paging.default.size}") int size,
            @RequestParam(name = "sort", required = false, defaultValue = "ASC") String sort,
            @RequestParam(name = "column", required = false, defaultValue = "ten") String sortColumn) {
        Pageable pageable = PageUtils.createPageable(page, size, sort, sortColumn);
        Page<HoiDongXetDuyet> result = hoiDongXetDuyetService.getPaging(search, pageable);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    @PostMapping
    public ResponseEntity<HoiDongXetDuyet> addNew(@RequestBody HoiDongXetDuyetDto dto) {
        HoiDongXetDuyet result = hoiDongXetDuyetService.addNew(dto);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    @PutMapping("/{hoiDongXetDuyetId}")
    public ResponseEntity<HoiDongXetDuyet> update(@PathVariable String hoiDongXetDuyetId, @RequestBody HoiDongXetDuyetDto dto) {
        HoiDongXetDuyet result = hoiDongXetDuyetService.update(hoiDongXetDuyetId, dto);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

//    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    @GetMapping("/{hoiDongXetDuyetId}/danh-gia-thuyet-minh-de-tai")
    @ApiOperation(value = "Xuất biểu mẫu đánh giá thuyết minh đề tài")
    public ResponseEntity<Resource> xuatBieuMauDanhGiaThuyetMinhDeTai(@PathVariable String hoiDongXetDuyetId, @RequestParam String deTaiId) throws Exception {
        File file = hoiDongXetDuyetService.xuatPhieuDanhGiaThuyetMinh(deTaiId, hoiDongXetDuyetId);
        Resource resource = fileStorageService.loadFile(file.getAbsolutePath());
        return ResponseEntity.ok()
                .header("filename", file.getName())
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getName() + "\"")
                .body(resource);
    }
}
