package com.stc.nghiencuukhoahoc.controllers.danhmuc;

import com.stc.nghiencuukhoahoc.dtos.hoidongnghiemthu.*;
import com.stc.nghiencuukhoahoc.entities.HoiDongNghiemThu;
import com.stc.nghiencuukhoahoc.services.filestorage.FileStorageService;
import com.stc.nghiencuukhoahoc.services.hoidongnghiemthu.HoiDongNghiemThuService;
import com.stc.nghiencuukhoahoc.utils.EnumTrangThaiHoiDong;
import com.stc.nghiencuukhoahoc.utils.PageUtils;
import io.swagger.annotations.Api;
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
import java.security.Principal;
import java.util.List;

/**
 * Created by: IntelliJ IDEA
 * User: vlong
 * Date: 19/5/2021
 * Time: 1:46 PM
 * Filename: HoiDongNghiemThuController
 */
@RestController
@RequestMapping("/rest/hoi-dong-nghiem-thu")
public class HoiDongNghiemThuController {
    private final HoiDongNghiemThuService hoiDongNghiemThuService;

    private final FileStorageService fileStorageService;

    public HoiDongNghiemThuController(HoiDongNghiemThuService hoiDongNghiemThuService, FileStorageService fileStorageService){

        this.hoiDongNghiemThuService = hoiDongNghiemThuService;
        this.fileStorageService = fileStorageService;
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_TRUONG_DON_VI')")
    @PutMapping("/{hoiDongId}/de-xuat-thanh-vien")
    @ApiOperation(value = "Cập nhật thành viên hội đồng nghiệm thu")
    public ResponseEntity<HoiDongNghiemThu>updateDeXuatThanhVienHoiDongNghiemThu(@PathVariable String hoiDongId, @RequestBody List<ThanhVienHoiDongNghiemThuDto> dto){
        return new ResponseEntity<>(hoiDongNghiemThuService.updateDeXuatThanhVienHoiDongNghiemThu(hoiDongId, dto), HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_TRUONG_DON_VI')")
    @PutMapping("/{hoiDongId}/cap-nhat-thanh-vien")
    @ApiOperation(value = "Cập nhật thành viên hội đồng nghiệm thu")
    public ResponseEntity<HoiDongNghiemThu>updateThanhVienNghiemThu(@PathVariable String hoiDongId, @RequestBody List<ThanhVienHoiDongNghiemThuDto> dto){
        return new ResponseEntity<>(hoiDongNghiemThuService.updateThanhVienHoiDongNghiemThu(hoiDongId, dto), HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_TRUONG_DON_VI')")
    @PutMapping("/{hoiDongId}")
    @ApiOperation(value = "Cập nhật hội đồng nghiệm thu")
    public ResponseEntity<HoiDongNghiemThu>updateHoiDongNghiemThu(@PathVariable String hoiDongId, @RequestBody HoiDongNghiemThuDto dto){
        return new ResponseEntity<>(hoiDongNghiemThuService.updateHoiDongNghiemThu(hoiDongId, dto), HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER', 'ROLE_TRUONG_DON_VI')")
    @PostMapping("/{hoiDongId}/phieu-diem-nx-pb")
    @ApiOperation(value = "Upload phiếu nhận xét và phản biện của từng thành viên trong hội đồng")
    public ResponseEntity<HoiDongNghiemThu>uploadPhieuNhanXetVaPhanBien(@PathVariable String hoiDongId, @RequestBody NhanXetPhanBienDto nhanXetPhanBienDto){
        return new ResponseEntity<>(hoiDongNghiemThuService.uploadPhieuNhanXetVaPhanBienCuaThanhVienHoiDong(hoiDongId,nhanXetPhanBienDto),HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_TRUONG_DON_VI')")
    @PostMapping("/them-hoi-dong-theo-de-tai")
    @ApiOperation(value = "Thêm nhiều hội đồng với list đề tài id và chủ tịch - thư ký hội đồng")
    public ResponseEntity<String>themHoiDongsWithChuTichThuKyByListDeTai(@RequestBody ChuTichThuKyDeTaiDto dto){
        return new ResponseEntity<>(hoiDongNghiemThuService.createListHoiDongWithChuTichThuKyByListDeTai(dto), HttpStatus.OK);
    }

//    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER', 'ROLE_TRUONG_DON_VI')")
    @GetMapping("/{hoiDongId}/danh-sach-de-xuat")
    @ApiOperation(value = "Xuất danh sách đề xuất thành viên do TDV thực hiện")
    public ResponseEntity<Resource>xuatDeXuatThanhVienHoiDong(@PathVariable String hoiDongId) throws Exception{
        File file = hoiDongNghiemThuService.xuatDeXuatThanhVienHoiDongNghiemThu(hoiDongId);
        Resource resource = fileStorageService.loadFile(file.getAbsolutePath());
        return ResponseEntity.ok()
                .header("filename", file.getName())
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getName() + "\"")
                .body(resource);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER' ,'ROLE_TRUONG_DON_VI')")
    @GetMapping("/{hoiDongId}")
    @ApiOperation(value = "Get hội đồng nghiệm thu theo id")
    public ResponseEntity<HoiDongNghiemThu>getHoiDongNghiemThu(@PathVariable String hoiDongId){
        return new ResponseEntity<>(hoiDongNghiemThuService.getHoiDongNghiemThu(hoiDongId), HttpStatus.OK);
    }

//    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER', 'ROLE_TRUONG_DON_VI')")
    @GetMapping("/{hoiDongId}/phieu-danh-gia-nghiem-thu")
    @ApiOperation(value = "Xuất phiếu đánh giá nghiệm thu cho thành viên hội đồng")
    public ResponseEntity<Resource>xuatPhieuDanhGiaNghiemThu(@PathVariable String hoiDongId) throws Exception{
        File file = hoiDongNghiemThuService.xuatPhieuDanhGiaNghiemThu(hoiDongId);
        Resource resource = fileStorageService.loadFile(file.getAbsolutePath());
        return ResponseEntity.ok()
                .header("filename", file.getName())
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getName() + "\"")
                .body(resource);
    }

//    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER', 'ROLE_TRUONG_DON_VI')")
    @GetMapping("/{hoiDongId}/bien-ban-hoi-dong-nghiem-thu")
    @ApiOperation(value = "Xuất biên bản họp hội đồng nghiệm thu")
    public ResponseEntity<Resource>xuatBienBanHoiDongNghiemThu(@PathVariable String hoiDongId) throws Exception{
        File file = hoiDongNghiemThuService.xuatBienBanHopDongDanhGiaNghiemThu(hoiDongId);
        Resource resource = fileStorageService.loadFile(file.getAbsolutePath());
        return ResponseEntity.ok()
                .header("filename", file.getName())
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getName() + "\"")
                .body(resource);
    }

//    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER', 'ROLE_TRUONG_DON_VI')")
    @GetMapping("/{hoiDongId}/nhan-xet-phan-bien")
    @ApiOperation(value = "Xuất phiếu nhận xét phản biện hội đồng nghiệm thu")
    public ResponseEntity<Resource>xuatPhieuNhanXetPhanBien(@PathVariable String hoiDongId) throws Exception{
        File file = hoiDongNghiemThuService.xuatPhieuNhanXetPhanBienNghiemThu(hoiDongId);
        Resource resource = fileStorageService.loadFile(file.getAbsolutePath());
        return ResponseEntity.ok()
                .header("filename", file.getName())
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getName() + "\"")
                .body(resource);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_TRUONG_DON_VI')")
    @PostMapping("/{hoiDongId}/bien-ban-hop-hoi-dong")
    @ApiOperation(value = "Upload biên bản hội đồng nghiệm thu kèm theo điểm trung bình cuối")
    public ResponseEntity<HoiDongNghiemThu>uploadBienBanHoiDongNghiemThu(@PathVariable String hoiDongId, @RequestBody BienBanHoiDongDto dto){
        return new ResponseEntity<>(hoiDongNghiemThuService.uploadBienBanHoiDongNghiemThu(hoiDongId, dto), HttpStatus.OK);
    }


    @PreAuthorize("hasAnyRole('ROLE_TRUONG_DON_VI')")
    @GetMapping("/hoi-dong-theo-tdv")
    @ApiOperation(value = "Get hội đồng nghiệm thu by TDV paging")
    public ResponseEntity<Page<HoiDongNghiemThu>>getHoiDongNghiemThuByTDVPaging(
            @RequestParam String trangThaiDuyetHoiDong,
            @RequestParam(name = "search", required = false, defaultValue = "") String search,
            @RequestParam(name = "page", required = false, defaultValue = "${paging.default.page}") int page,
            @RequestParam(name = "size", required = false, defaultValue = "${paging.default.size}") int size,
            @RequestParam(name = "sort", required = false, defaultValue = "asc") String sort,
            @RequestParam(name = "column", required = false, defaultValue = "deTais.tenDeTai") String sortColumn,
            @RequestParam(name = "thoiGianQuyTrinhId")String thoiGianQuyTrinhId,
            Principal principal){
        Pageable pageable = PageUtils.createPageable(page, size, sort, sortColumn);
        return new ResponseEntity<>(hoiDongNghiemThuService.getHoiDongNghiemThuByTDVPaging(search, thoiGianQuyTrinhId, principal.getName(), trangThaiDuyetHoiDong, pageable), HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ROLE_USER')")
    @GetMapping("/hoi-dong-theo-cndt")
    @ApiOperation(value = "Get hội đồng nghiệm thu by CNDT paging")
    public ResponseEntity<Page<HoiDongNghiemThu>>getHoiDongNghiemThuByCNDTPaging(
            @RequestParam String trangThaiDuyetHoiDong,
            @RequestParam(name = "search", required = false, defaultValue = "") String search,
            @RequestParam(name = "page", required = false, defaultValue = "${paging.default.page}") int page,
            @RequestParam(name = "size", required = false, defaultValue = "${paging.default.size}") int size,
            @RequestParam(name = "sort", required = false, defaultValue = "asc") String sort,
            @RequestParam(name = "column", required = false, defaultValue = "deTais.tenDeTai") String sortColumn,
            @RequestParam(name = "thoiGianQuyTrinhId")String thoiGianQuyTrinhId,
            Principal principal){
        Pageable pageable = PageUtils.createPageable(page, size, sort, sortColumn);
        return new ResponseEntity<>(hoiDongNghiemThuService.getHoiDongNghiemThuByCNDT(search, thoiGianQuyTrinhId, principal.getName(), trangThaiDuyetHoiDong, pageable), HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    @GetMapping("/paging")
    @ApiOperation(value = "Get hội đồng nghiệm thu paging")
    public ResponseEntity<Page<HoiDongNghiemThu>>getHoiDongNghiemThuPaging(
            @RequestParam String trangThaiDuyetHoiDong,
            @RequestParam(name = "search", required = false, defaultValue = "") String search,
            @RequestParam(name = "page", required = false, defaultValue = "${paging.default.page}") int page,
            @RequestParam(name = "size", required = false, defaultValue = "${paging.default.size}") int size,
            @RequestParam(name = "sort", required = false, defaultValue = "asc") String sort,
            @RequestParam(name = "column", required = false, defaultValue = "deTais.tenDeTai") String sortColumn,
            @RequestParam(name = "thoiGianQuyTrinhId")String thoiGianQuyTrinhId){
        Pageable pageable = PageUtils.createPageable(page, size, sort, sortColumn);
        return new ResponseEntity<>(hoiDongNghiemThuService.getHoiDongNghiemThuPaging(search, thoiGianQuyTrinhId, trangThaiDuyetHoiDong ,pageable), HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_TRUONG_DON_VI')")
    @PostMapping("/{hoiDongId}/upload-de-xuat-thanh-vien")
    @ApiOperation(value = "Upload file đề xuất thành viên do admin upload")
    public ResponseEntity<HoiDongNghiemThu>uploadFileDeXuatThanhVien(@PathVariable String hoiDongId, @RequestParam String fileGioiThieuThanhVien){
        return new ResponseEntity<>(hoiDongNghiemThuService.uploadDeXuatThanhVienHoiDongNghiemThu(hoiDongId, fileGioiThieuThanhVien), HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_TRUONG_DON_VI')")
    @GetMapping("/de-tai/{deTaiId}")
    @ApiOperation(value = "Get hội đồng nghiệm thu by đề tài")
    public ResponseEntity<HoiDongNghiemThu>getHoiDongNghiemThuByDeTai(@PathVariable String deTaiId){
        return new ResponseEntity<>(hoiDongNghiemThuService.getHoiDongNghiemThuByDeTai(deTaiId), HttpStatus.OK);
    }
}
