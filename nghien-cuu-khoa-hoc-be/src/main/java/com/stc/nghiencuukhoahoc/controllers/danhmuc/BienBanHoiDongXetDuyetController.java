package com.stc.nghiencuukhoahoc.controllers.danhmuc;

import com.stc.nghiencuukhoahoc.dtos.hoidongxetduyet.BienBanHoiDongXetDuyetDto;
import com.stc.nghiencuukhoahoc.dtos.hoidongxetduyet.PhieuDiemThanhVienHoiDongXetDuyetDto;
import com.stc.nghiencuukhoahoc.entities.BienBanHoiDongXetDuyet;
import com.stc.nghiencuukhoahoc.services.bienbanhoidongxetduyet.BienBanHoiDongXetDuyetService;
import com.stc.nghiencuukhoahoc.services.filestorage.FileStorageService;
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
 * Date: 4/23/2021
 * Time: 10:50 AM
 * Filename: BienBanHoiDongXetDuyetController
 */
@RestController
@RequestMapping("/rest/bien-ban-hoi-dong-xet-duyet")
public class BienBanHoiDongXetDuyetController {
    private final BienBanHoiDongXetDuyetService bienBanHoiDongXetDuyetService;

    private final FileStorageService fileStorageService;

    public BienBanHoiDongXetDuyetController(BienBanHoiDongXetDuyetService bienBanHoiDongXetDuyetService, FileStorageService fileStorageService) {
        this.bienBanHoiDongXetDuyetService = bienBanHoiDongXetDuyetService;
        this.fileStorageService = fileStorageService;
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    @GetMapping
    public ResponseEntity<List<BienBanHoiDongXetDuyet>> getAllBienBanHoiDongXetDuyet() {
        return new ResponseEntity<>(bienBanHoiDongXetDuyetService.getAll(), HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_TRUONG_DON_VI', 'ROLE_USER')")
    @GetMapping("/{id}")
    @ApiOperation(value = "Get biên bản hội đồng by id")
    public ResponseEntity<BienBanHoiDongXetDuyet>getBienBanHoiDong(@PathVariable String id){
        return new ResponseEntity<>(bienBanHoiDongXetDuyetService.getBienBanHoiDongXetDuyet(id), HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    @PostMapping("/hoi-dong/{hoiDongId}/de-tai/{deTaiId}")
    public ResponseEntity<BienBanHoiDongXetDuyet> addNew(@PathVariable String hoiDongId, @PathVariable String deTaiId) {
        BienBanHoiDongXetDuyet result = bienBanHoiDongXetDuyetService.addNew(deTaiId, hoiDongId);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<BienBanHoiDongXetDuyet> update(@PathVariable String id, @RequestBody BienBanHoiDongXetDuyetDto dto) {
        BienBanHoiDongXetDuyet result = bienBanHoiDongXetDuyetService.update(id, dto);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    @PostMapping("/{id}/phieu-diem-hoi-dong-xet-duyet")
    public ResponseEntity<BienBanHoiDongXetDuyet> addPhieuDiemHoiDongXetDuyet(@PathVariable String id, @RequestBody PhieuDiemThanhVienHoiDongXetDuyetDto dto){
        return new ResponseEntity<>(bienBanHoiDongXetDuyetService.uploadDanhGiaCuaHoiDongXetDuyetByBienBanHoiDong(id, dto), HttpStatus.OK);
    }

//    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    @GetMapping("/{id}/bien-ban-hop-hoi-dong-tuyen-chon")
    @ApiOperation(value = "Xuất biên bản hợp hồi đồng tuyển chọn")
    public ResponseEntity<Resource> xuatBieuMauBienBanHopHoiDongTuyenChon(@PathVariable String id) throws Exception {
        File file = bienBanHoiDongXetDuyetService.xuatBienBanHopHoiDongTuyenChon(id);
        Resource resource = fileStorageService.loadFile(file.getAbsolutePath());
        return ResponseEntity.ok()
                .header("filename", file.getName())
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getName() + "\"")
                .body(resource);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    @GetMapping("/bien-ban-theo-hoi-dong")
    @ApiOperation(value = "Get biên bản hội đồng xét duyệt by hội đồng paging")
    public ResponseEntity<Page<BienBanHoiDongXetDuyet>>getBienBanHoiDongByHoiDongIdPaging(
            @RequestParam(name = "search", required = false, defaultValue = "") String search,
            @RequestParam(name = "page", required = false, defaultValue = "${paging.default.page}") int page,
            @RequestParam(name = "size", required = false, defaultValue = "${paging.default.size}") int size,
            @RequestParam(name = "sort", required = false, defaultValue = "asc") String sort,
            @RequestParam(name = "column", required = false, defaultValue = "deTais.tenDeTai") String sortColumn,
            @RequestParam(name = "hoiDongId")String hoiDongId){
        Pageable pageable = PageUtils.createPageable(page, size, sort, sortColumn);
        return new ResponseEntity<>(bienBanHoiDongXetDuyetService.getBienBanHoiDongByHoiDongXetDuyet(search, hoiDongId, pageable), HttpStatus.OK);
    }


    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    @GetMapping("/de-tai/{deTaiId}")
    @ApiOperation(value = "Get biên bản hội đồng theo đề tài")
    public ResponseEntity<BienBanHoiDongXetDuyet>getBienBanHoiDongXetDuyetByDeTai(@PathVariable String deTaiId){
        return new ResponseEntity<>(bienBanHoiDongXetDuyetService.getBienBanHoiDongByDeTai(deTaiId), HttpStatus.OK);
    }

}
