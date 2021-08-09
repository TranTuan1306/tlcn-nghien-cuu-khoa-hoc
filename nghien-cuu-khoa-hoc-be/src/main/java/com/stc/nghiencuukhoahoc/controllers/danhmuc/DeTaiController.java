package com.stc.nghiencuukhoahoc.controllers.danhmuc;

import com.stc.nghiencuukhoahoc.dtos.ThoiGianQuyTrinhDto;
import com.stc.nghiencuukhoahoc.dtos.detai.*;
import com.stc.nghiencuukhoahoc.entities.DeTai;
import com.stc.nghiencuukhoahoc.entities.embeded.BaoCaoTienDo;
import com.stc.nghiencuukhoahoc.services.detai.DeTaiService;
import com.stc.nghiencuukhoahoc.services.fileservice.MyFileService;
import com.stc.nghiencuukhoahoc.services.filestorage.FileStorageService;
import com.stc.nghiencuukhoahoc.services.word.WordService;
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

import javax.validation.Valid;
import java.io.File;
import java.security.Principal;
import java.util.List;

/**
 * Created by IntelliJ IDEA.
 * User: thangtm
 * Date: 3/30/2021
 * Time: 3:53 PM
 * Filename: DeTaiController
 */
@RestController
@RequestMapping("/rest/de-tai")
public class DeTaiController {
    private final DeTaiService deTaiService;

    private final WordService wordService;

    private final FileStorageService fileStorageService;

    public DeTaiController(DeTaiService deTaiService, WordService wordService, FileStorageService fileStorageService) {
        this.deTaiService = deTaiService;
        this.wordService = wordService;
        this.fileStorageService = fileStorageService;
    }
//    @PreAuthorize("hasAnyRole( 'ROLE_USER')")
    @GetMapping("/{deTaiId}/de-xuat-de-tai")
    @ApiOperation(value = "Xuất biểu mẫu đề xuất đề tài")
    public ResponseEntity<Resource> xuatBieuMauDeXuatDeTai(@PathVariable String deTaiId) throws Exception {
        File file = deTaiService.xuatDeXuatDeTai(deTaiId);
        Resource resource = fileStorageService.loadFile(file.getAbsolutePath());
        return ResponseEntity.ok()
                .header("filename", file.getName())
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getName() + "\"")
                .body(resource);
    }

//    @PreAuthorize("hasAnyRole( 'ROLE_USER')")
    @GetMapping("/{deTaiId}/thuyet-minh-de-tai")
    @ApiOperation(value = "Xuất biểu mẫu thuyết minh đề tài")
    public ResponseEntity<Resource> xuatBieuMauThuyetMinhDeTai(@PathVariable String deTaiId) throws Exception {
        File file = deTaiService.xuatThuyetMinhDeTai(deTaiId);
        Resource resource = fileStorageService.loadFile(file.getAbsolutePath());
        return ResponseEntity.ok()
                .header("filename", file.getName())
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getName() + "\"")
                .body(resource);
    }




//    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    @GetMapping("/{deTaiId}/hop-dong-thuc-hien-de-tai")
    @ApiOperation(value = "Xuất biểu mẫu hợp đồng thực hiện đề tài")
    public ResponseEntity<Resource> xuatBieuMauHopDongThucHienDeTai(@PathVariable String deTaiId) throws Exception {
        File file = deTaiService.xuatHopDongThucHien(deTaiId);
        Resource resource = fileStorageService.loadFile(file.getAbsolutePath());
        return ResponseEntity.ok()
                .header("filename", file.getName())
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getName() + "\"")
                .body(resource);
    }

//    @PreAuthorize("hasAnyRole( 'ROLE_USER')")
    @GetMapping("/{deTaiId}/bo-sung-thuyet-minh")
    @ApiOperation(value = "Xuất biểu mẫu bổ sung thuyết minh đề tài")
    public ResponseEntity<Resource> xuatBieuMauBoSungThuyetMinh(@PathVariable String deTaiId) throws Exception {
        File file = deTaiService.xuatBoSungThuyetMinh(deTaiId);
        Resource resource = fileStorageService.loadFile(file.getAbsolutePath());
        return ResponseEntity.ok()
                .header("filename", file.getName())
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getName() + "\"")
                .body(resource);
    }

//    @PreAuthorize("hasAnyRole( 'ROLE_USER')")
    @GetMapping("/{deTaiId}/bao-cao-tinh-hinh-thuc-hien")
    @ApiOperation(value = "Xuất biểu mẫu báo cáo tình hình thực hiện đề tài")
    public ResponseEntity<Resource> xuatBaoCaoTinhHinhThucHien(@PathVariable String deTaiId) throws Exception {
        File file = deTaiService.xuatTinhHinhThucHien(deTaiId);
        Resource resource = fileStorageService.loadFile(file.getAbsolutePath());
        return ResponseEntity.ok()
                .header("filename", file.getName())
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getName() + "\"")
                .body(resource);
    }

//    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    @GetMapping("/{deTaiId}/kiem-tra-tinh-hinh-thuc-hien")
    @ApiOperation(value = "Xuất biểu kiểm tra tình hình thực hiện đề tài")
    public ResponseEntity<Resource> xuatBienBanKiemTraTinhHinhThucHien(@PathVariable String deTaiId) throws Exception {
        File file = deTaiService.xuatBienBanKiemTraTinhHinhThucHien(deTaiId);
        Resource resource = fileStorageService.loadFile(file.getAbsolutePath());
        return ResponseEntity.ok()
                .header("filename", file.getName())
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getName() + "\"")
                .body(resource);
    }

//    @PreAuthorize("hasAnyRole( 'ROLE_USER')")
    @GetMapping("/{deTaiId}/thong-tin-ket-qua-nghien-cuu")
    @ApiOperation(value = "Xuất biểu kiểm thông tin kết quả nghiên cứu")
    public ResponseEntity<Resource> xuatThongTinKetQuaNghienCuu(@PathVariable String deTaiId) throws Exception {
        File file = deTaiService.xuatThongTinKetQua(deTaiId);
        Resource resource = fileStorageService.loadFile(file.getAbsolutePath());
        return ResponseEntity.ok()
                .header("filename", file.getName())
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getName() + "\"")
                .body(resource);
    }

//    @PreAuthorize("hasAnyRole( 'ROLE_USER')")
    @GetMapping("/{deTaiId}/giai-trinh-chinh-sua")
    @ApiOperation(value = "Xuất biểu mẫu giải trình chỉnh sửa ")
    public ResponseEntity<Resource> xuatGiaiTrinhChinhSua(@PathVariable String deTaiId) throws Exception {
        File file = deTaiService.xuatGiaiTrinhChinhSua(deTaiId);
        Resource resource = fileStorageService.loadFile(file.getAbsolutePath());
        return ResponseEntity.ok()
                .header("filename", file.getName())
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getName() + "\"")
                .body(resource);
    }

//    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    @GetMapping("/{deTaiId}/ban-giao-thiet-bi")
    @ApiOperation(value = "Xuất biểu mẫu bàn giao thiết bị ")
    public ResponseEntity<Resource> xuatBienBanBanGiaoThietBi(@PathVariable String deTaiId) throws Exception {
        File file = deTaiService.xuatBienBanBanGiaoThietBi(deTaiId);
        Resource resource = fileStorageService.loadFile(file.getAbsolutePath());
        return ResponseEntity.ok()
                .header("filename", file.getName())
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getName() + "\"")
                .body(resource);
    }

//    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    @GetMapping("/{deTaiId}/de-nghi-thanh-toan")
    @ApiOperation(value = "Xuất biểu mẫu đề nghị thanh toán ")
    public ResponseEntity<Resource> xuatDeNghiThanhToan(@PathVariable String deTaiId) throws Exception {
        File file = deTaiService.xuatDeNghiThanhToan(deTaiId);
        Resource resource = fileStorageService.loadFile(file.getAbsolutePath());
        return ResponseEntity.ok()
                .header("filename", file.getName())
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getName() + "\"")
                .body(resource);
    }

//    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    @GetMapping("/{deTaiId}/thanh-ly-hop-dong")
    @ApiOperation(value = "Xuất biểu mẫu thanh lý hợp đồng ")
    public ResponseEntity<Resource> xuatThanhLyHopDong(@PathVariable String deTaiId) throws Exception {
        File file = deTaiService.xuatThanhLiHopDong(deTaiId);
        Resource resource = fileStorageService.loadFile(file.getAbsolutePath());
        return ResponseEntity.ok()
                .header("filename", file.getName())
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getName() + "\"")
                .body(resource);
    }

    /***
     * @uthor: vlong
     * @createdDate: 17/5/21 2:54PM
     * @param deTaiId
     * @param donXinHuyDto
     * @return: Resource
     * @throws Exception
     */

//    @PreAuthorize("hasAnyRole( 'ROLE_USER')")
    @PostMapping("/{deTaiId}/xin-huy-de-tai")
    @ApiOperation(value = "Xuất biểu mẫu đơn xin hủy đề tàu")
    public ResponseEntity<Resource> xuatBieuMauDonXinHuyDeTai(@PathVariable String deTaiId, @Valid @RequestBody DonXinHuyDto donXinHuyDto) throws Exception {
        File file = deTaiService.xuatDonXinHuy(deTaiId, donXinHuyDto);
        Resource resource = fileStorageService.loadFile(file.getAbsolutePath());
        return ResponseEntity.ok()
                    .header("filename", file.getName())
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getName() + "\"")
                    .body(resource);
    }


    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER', 'ROLE_TRUONG_DON_VI')")
    @GetMapping("/paging")
    @ApiOperation(value = "Get all đề tài paging")
    public ResponseEntity<Page<DeTai>> getByTrangThaiDeTaiPaging(
            @RequestParam(name = "search", required = false, defaultValue = "") String search,
            @RequestParam(name = "page", required = false, defaultValue = "${paging.default.page}") int page,
            @RequestParam(name = "size", required = false, defaultValue = "${paging.default.size}") int size,
            @RequestParam(name = "sort", required = false, defaultValue = "ASC") String sort,
            @RequestParam(name = "column", required = false, defaultValue = "ten") String sortColumn,
            @RequestParam String trangThaiDeTai) {
        Pageable pageable = PageUtils.createPageable(page, size, sort, sortColumn);
        Page<DeTai> result = deTaiService.getByTrangThaiDeTaiPaging(search, trangThaiDeTai, pageable);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER', 'ROLE_TRUONG_DON_VI')")
    @GetMapping("/don-vi-va-trang-thai-paging")
    @ApiOperation(value = "Get đề tài với đơn vị và trang thái paging")
    public ResponseEntity<Page<DeTai>> getByTruongDonViVaTrangThaiDeTaiPaging(
            @RequestParam(name = "search", required = false, defaultValue = "") String search,
            @RequestParam(name = "page", required = false, defaultValue = "${paging.default.page}") int page,
            @RequestParam(name = "size", required = false, defaultValue = "${paging.default.size}") int size,
            @RequestParam(name = "sort", required = false, defaultValue = "ASC") String sort,
            @RequestParam(name = "column", required = false, defaultValue = "ten") String sortColumn,
            @RequestParam String trangThaiDeTai,
            Principal principal) {
        Pageable pageable = PageUtils.createPageable(page, size, sort, sortColumn);
        Page<DeTai> result = deTaiService.getDeTaiByTruongDonViVaTrangThaiDeTai(search, principal.getName(), trangThaiDeTai, pageable);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole( 'ROLE_USER')")
    @PostMapping("/chu-nhiem")
    @ApiOperation(value = "Get đề tài với chủ nhiệm và thời gian quy trình paging")
    public ResponseEntity<Page<DeTai>> getChuNhiemPaging(
            @RequestBody DeTaiByThoiGianTrangThaiDto dto,
            @RequestParam(name = "search", required = false, defaultValue = "") String search,
            @RequestParam(name = "page", required = false, defaultValue = "${paging.default.page}") int page,
            @RequestParam(name = "size", required = false, defaultValue = "${paging.default.size}") int size,
            @RequestParam(name = "sort", required = false, defaultValue = "ASC") String sort,
            @RequestParam(name = "column", required = false, defaultValue = "ten") String sortColumn,
            Principal principal) {
        Pageable pageable = PageUtils.createPageable(page, size, sort, sortColumn);
        Page<DeTai> result = deTaiService.getByChuNhiemPaging(principal.getName(), search, dto ,pageable);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    @GetMapping("/chua-co-hoi-dong")
    @ApiOperation(value = "Get đề tài chưa có hội đồng paging")
    public ResponseEntity<Page<DeTai>> getDeTaiChuaCoHoiDongPaging(
            @RequestParam(name = "search", required = false, defaultValue = "") String search,
            @RequestParam(name = "page", required = false, defaultValue = "${paging.default.page}") int page,
            @RequestParam(name = "size", required = false, defaultValue = "${paging.default.size}") int size,
            @RequestParam(name = "sort", required = false, defaultValue = "ASC") String sort,
            @RequestParam(name = "column", required = false, defaultValue = "ten") String sortColumn) {
        Pageable pageable = PageUtils.createPageable(page, size, sort, sortColumn);
        Page<DeTai> result = deTaiService.getDeTaiChuaCoHoiDongXetDuyet(search, pageable);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER', 'ROLE_TRUONG_DON_VI')")
    @PostMapping("/thoi-gian-quy-trinh-va-trang-thai")
    @ApiOperation(value = "Get đề tài by thời gian quy trình và trạng thái")
    public ResponseEntity<Page<DeTai>> getDeTaiByThoiGianQuyTrinhVaTrangThai(
            @RequestBody DeTaiByThoiGianTrangThaiDto dto,
            @RequestParam(name = "search", required = false, defaultValue = "") String search,
            @RequestParam(name = "page", required = false, defaultValue = "${paging.default.page}") int page,
            @RequestParam(name = "size", required = false, defaultValue = "${paging.default.size}") int size,
            @RequestParam(name = "sort", required = false, defaultValue = "ASC") String sort,
            @RequestParam(name = "column", required = false, defaultValue = "ten") String sortColumn){
        Pageable pageable = PageUtils.createPageable(page, size, sort, sortColumn);
        return new ResponseEntity<>(deTaiService.getByThoiGianQuyTrinhVaTrangThai(search, dto, pageable), HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole( 'ROLE_USER')")
    @PostMapping
    public ResponseEntity<DeTai> addNew(@RequestBody DeTaiDto dto, Principal principal) {
        DeTai result = deTaiService.addNew(dto, principal);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole( 'ROLE_TRUONG_DON_VI')")
    @PostMapping("/{deTaiId}/mail-yeu-cau-chinh-sua-khoa")
    public ResponseEntity<DeTai> mailYeuCauChinhSuaKhoa(@PathVariable String deTaiId, @RequestBody YeuCauChinhSuaDto dto) {
        return new ResponseEntity<>(deTaiService.mailYeuCauChinhSuaKhoa(deTaiId, dto), HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    @PostMapping("/{deTaiId}/mail-yeu-cau-chinh-sua-khcn")
    public ResponseEntity<DeTai> mailYeuCauChinhSuaKHCN(@PathVariable String deTaiId, @RequestBody YeuCauChinhSuaDto dto) {
        return new ResponseEntity<>(deTaiService.mailYeuCauChinhSuaKHCN(deTaiId, dto), HttpStatus.OK);
    }


    @PreAuthorize("hasAnyRole('ROLE_USER')")
    @PutMapping("/{id}")
    public ResponseEntity<DeTai> update(@PathVariable String id, @RequestBody DeTaiDto dto) {
        DeTai result = deTaiService.update(id, dto);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole( 'ROLE_USER')")
    @PutMapping("/{id}/de-xuat")
    public ResponseEntity<DeTai>updateDeXuatDeTai(@PathVariable String id, @RequestBody DeTaiDto dto){
        return new ResponseEntity<>(deTaiService.updateDeXuatDeTai(id, dto), HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole( 'ROLE_USER')")
    @PutMapping("/{id}/huy")
    public ResponseEntity<DeTai> cndtHuy(@PathVariable String id) {
        DeTai result = deTaiService.cndtHuyDeTai(id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole( 'ROLE_TRUONG_DON_VI')")
    @PutMapping("/{id}/tdv-duyet")
    public ResponseEntity<DeTai> truongDonViDuyet(@PathVariable String id) {
        DeTai result = deTaiService.truongDonViDuyet(id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    @PutMapping("/{id}/khcn-duyet")
    public ResponseEntity<DeTai> khoaHocCongNgheDuyet(@PathVariable String id) {
        DeTai result = deTaiService.khoaHocCongNgheDuyet(id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER', 'ROLE_TRUONG_DON_VI')")
    @GetMapping("/{id}")
    @ApiOperation(value = "Get thông tin đề tài")
    public ResponseEntity<DeTai> getDeTaiById(@PathVariable String id){
        return new ResponseEntity<>(deTaiService.getDeTai(id), HttpStatus.OK);
    }

    /***
     * @uthor: vlong
     * @createdDate: 14/5/21
     * @param deTaiId
     * @body dto
     * @return
     */
    @PreAuthorize("hasAnyRole( 'ROLE_USER')")
    @PostMapping("/{deTaiId}/bao-cao-tien-do")
    @ApiOperation(value = "Thêm báo cáo tiến độ do chủ nhiệm đề tài thực hiện")
    public ResponseEntity<DeTai> addBaoCaoTienDo(@PathVariable String deTaiId, @RequestBody BaoCaoTienDoDto dto) {
        return new ResponseEntity<>(deTaiService.addTinhHinhThucHien(deTaiId, dto), HttpStatus.OK);
    }

    /***
     * @uthor: vlong
     * @createdDate: 14/5/21
     * @param deTaiId
     * @body dto
     * @return
     */
    @PreAuthorize("hasAnyRole( 'ROLE_USER')")
    @PutMapping("/{deTaiId}/bao-cao-tien-do")
    @ApiOperation(value = "Thêm báo cáo tiến độ do chủ nhiệm đề tài thực hiện")
    public ResponseEntity<DeTai> updateBaoCaoTienDo(@PathVariable String deTaiId, @RequestBody BaoCaoTienDoDto dto) {
        return new ResponseEntity<>(deTaiService.updateTinhHinhThucHien(deTaiId, dto), HttpStatus.OK);
    }





    /***
     * @uthor: vlong
     * @createdDate: 18/5/21 3:23 PM
     * @param deTaiId
     * @param thongTinKetQuaDto
     * @return
     */
    @PreAuthorize("hasAnyRole( 'ROLE_USER')")
    @PutMapping("/{deTaiId}/thong-tin-ket-qua-nghien-cuu")
    @ApiOperation(value = "Cập nhật thông tin kết quả nghiên cứu do chủ nhiệm đề tài thực hiện (BM10 - BM11)")
    public ResponseEntity<DeTai> updateThongTinKetQuaNghienCuu(@PathVariable String deTaiId, @RequestBody ThongTinKetQuaDto thongTinKetQuaDto){
        return new ResponseEntity<>(deTaiService.updateThongTinKetQuaNghienCuu(deTaiId, thongTinKetQuaDto), HttpStatus.OK);
    }


    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    @PutMapping("/{deTaiId}/thoi-gian-quy-trinh")
    @ApiOperation(value = "Thay đổi thời gian quy trình cho đề tài")
    public ResponseEntity<DeTai> changeThoiGianQuyTrinh(@PathVariable String deTaiId, @RequestBody ThoiGianQuyTrinhDto dto){
        return new ResponseEntity<>(deTaiService.changeThoiGianQuyTrinh(deTaiId, dto), HttpStatus.OK);
    }

    /***
     * @author: vlong
     * @param dto
     * @param search
     * @param page
     * @param size
     * @param sort
     * @param sortColumn
     * @return
     */
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER', 'ROLE_TRUONG_DON_VI')")
    @PostMapping("/list-id")
    @ApiOperation(value = "Get đề tài paging by list id")
    public ResponseEntity<Page<DeTai>> getDeTaiByListId(
            @RequestBody ListDeTaiIdDto dto,
            @RequestParam(name = "search", required = false, defaultValue = "") String search,
            @RequestParam(name = "page", required = false, defaultValue = "${paging.default.page}") int page,
            @RequestParam(name = "size", required = false, defaultValue = "${paging.default.size}") int size,
            @RequestParam(name = "sort", required = false, defaultValue = "ASC") String sort,
            @RequestParam(name = "column", required = false, defaultValue = "ten") String sortColumn){
        Pageable pageable = PageUtils.createPageable(page, size, sort, sortColumn);
        return new ResponseEntity<>(deTaiService.getDeTaIByListId(search, dto.getDeTaiIds(), pageable), HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    @PostMapping("/{deTaiId}/chung-minh-giai-trinh-chinh-sua")
    @ApiOperation(value = "Upload chứng mình giải trình chỉnh sửa báo cáo tổng kết đề tài nghiên cứu khoa học")
    public ResponseEntity<DeTai> uploadChungMinhGiaiTrinhChinhSua(@PathVariable String deTaiId, @RequestParam String fileId){
        return new ResponseEntity<>(deTaiService.uploadGiaiTrinhChinhSua(deTaiId, fileId), HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    @PostMapping("/{deTaiId}/bien-ban-kiem-tra-tien-do")
    @ApiOperation(value = "Upload biên bản kiểm tra tình hình thực hiện đề tài")
    public ResponseEntity<DeTai>uploadBienBanKiemTraTinhHinhThucHien(@PathVariable String deTaiId, @RequestParam (name = "fileId", required = true)String fileId){
        return new ResponseEntity<>(deTaiService.uploadBienBanKiemTraTinhHinhThucHien(deTaiId, fileId), HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    @PostMapping("/{deTaiId}/chung-minh-hop-dong")
    @ApiOperation(value = "Upload chứng minh hợp đồng đã ký")
    public ResponseEntity<DeTai> uploadChungMinhHopDong(@PathVariable String deTaiId, @RequestParam (name = "fileId", required = true)String fileId) {
        return new ResponseEntity<>(deTaiService.uploadHopDongThucHien(deTaiId, fileId), HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    @PostMapping("/{deTaiId}/chung-minh-ban-giao-thiet-bi")
    @ApiOperation(value = "Upload chứng minh bàn giao thiết bị")
    public ResponseEntity<DeTai>uploadBienBanBanGiaoThietBi(@PathVariable String deTaiId, @RequestParam (name = "fileId", required = true)String fileId){
        return new ResponseEntity<>(deTaiService.uploadBienBanBanGiaoThietBi(deTaiId, fileId), HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    @PostMapping("/{deTaiId}/chung-minh-de-nghi-thanh-toan")
    @ApiOperation(value = "Upload chứng minh đề nghị thanh toán")
    public ResponseEntity<DeTai>uploadDeNghiThanhToan(@PathVariable String deTaiId, @RequestParam (name = "fileId", required = true)String fileId){
        return new ResponseEntity<>(deTaiService.uploadDeNghiThanhToan(deTaiId, fileId), HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    @PostMapping("/{deTaiId}/chung-minh-thanh-ly-hop-dong")
    @ApiOperation(value = "Upload chứng minh thanh lý hợp đồng")
    public ResponseEntity<DeTai>uploadThanhLiHopDong(@PathVariable String deTaiId, @RequestParam (name = "fileId", required = true)String fileId){
        return new ResponseEntity<>(deTaiService.uploadThanhLiHopDong(deTaiId, fileId), HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    @PostMapping("/{deTaiId}/chung-minh-tinh-hinh-thuc-hien")
    @ApiOperation(value = "Upload chứng minh báo cáo tình hình thực hiện")
    public ResponseEntity<DeTai>uploadBaoCaoTienDo(@PathVariable String deTaiId, @RequestParam (name = "fileId", required = true)String fileId){
        return new ResponseEntity<>(deTaiService.uploadTinhHinhThucHien(deTaiId, fileId), HttpStatus.OK);
    }
    /***
     * @uthor: vlong
     * @createdDate: 14/5/21
     * @param deTaiId
     * @param fileId
     * @return
     */
    @PreAuthorize("hasAnyRole('ROLE_ADMIN' , 'ROLE_TRUONG_DON_VI')")
    @PostMapping("/{deTaiId}/chung-minh-bo-sung-thuyet-minh")
    @ApiOperation(value = "Upload chứng minh bổ sung thuyết minh do chủ nhiệm đề tài thực hiện")
    public ResponseEntity<DeTai> uploadChungMinhBoSungThuyetMinh(@PathVariable String deTaiId, @RequestParam String fileId) {
        return new ResponseEntity<>(deTaiService.uploadBoSungThuyetMinh(deTaiId, fileId), HttpStatus.OK);
    }

    /***
     * @uthor: vlong
     * @createdDate: 18/5/21
     * @param deTaiId
     * @param dto
     * @return
     */
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_TRUONG_DON_VI')")
    @PostMapping("/{deTaiId}/chung-minh-xin-huy")
    @ApiOperation(value = "Upload chứng minh xin hủy do trưởng đơn vị, KHCN thực hiện")
    public ResponseEntity<DeTai> uploadChungMinhXinHuy(@PathVariable String deTaiId, @RequestBody UploadXinHuyDto dto){
        return new ResponseEntity<>(deTaiService.uploadDonXinHuy(deTaiId, dto), HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole( 'ROLE_USER')")
    @PostMapping("/{deTaiId}/them-ma-so")
    @ApiOperation(value = "Thêm mã số đề tài sau khi đã đạt xét duyệt")
    public ResponseEntity<DeTai> addMaSoDeTai(@PathVariable String deTaiId,
                                              @RequestParam (name = "maSo")String maSo){
        return new ResponseEntity<>(deTaiService.addMaSoDeTaiSauKhiDuyet(deTaiId, maSo), HttpStatus.OK);
    }
}
