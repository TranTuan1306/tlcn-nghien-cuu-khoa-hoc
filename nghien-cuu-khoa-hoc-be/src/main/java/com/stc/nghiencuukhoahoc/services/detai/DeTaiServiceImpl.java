package com.stc.nghiencuukhoahoc.services.detai;

import com.stc.nghiencuukhoahoc.clients.HrmServiceClient;
import com.stc.nghiencuukhoahoc.dtos.ThoiGianQuyTrinhDto;
import com.stc.nghiencuukhoahoc.dtos.detai.*;
import com.stc.nghiencuukhoahoc.dtos.hrm.DonVi;
import com.stc.nghiencuukhoahoc.dtos.hrm.NhanVien;
import com.stc.nghiencuukhoahoc.dtos.mapper.Mapper;
import com.stc.nghiencuukhoahoc.dtos.thongbao.ThongBaoDto;
import com.stc.nghiencuukhoahoc.entities.*;
import com.stc.nghiencuukhoahoc.entities.danhmuc.LinhVuc;
import com.stc.nghiencuukhoahoc.entities.danhmuc.LoaiKinhPhi;
import com.stc.nghiencuukhoahoc.entities.danhmuc.SanPham;
import com.stc.nghiencuukhoahoc.entities.embeded.*;
import com.stc.nghiencuukhoahoc.entities.embeded.BM07.ChiTietSanPhamBM07;
import com.stc.nghiencuukhoahoc.entities.embeded.BM07.ChiTietSanPhamKhacBM07;
import com.stc.nghiencuukhoahoc.exceptions.InvalidException;
import com.stc.nghiencuukhoahoc.exceptions.NotFoundException;
import com.stc.nghiencuukhoahoc.repositories.*;
import com.stc.nghiencuukhoahoc.services.cauhinhbieumau.CauHinhBieuMauService;
import com.stc.nghiencuukhoahoc.services.email.EmailService;
import com.stc.nghiencuukhoahoc.services.fileservice.MyFileService;
import com.stc.nghiencuukhoahoc.services.linhvuc.LinhVucService;
import com.stc.nghiencuukhoahoc.services.loaihinhnghiencuu.LoaiHinhNghienCuuService;
import com.stc.nghiencuukhoahoc.services.nhanvien.NhanVienService;
import com.stc.nghiencuukhoahoc.services.sanpham.SanPhamService;
import com.stc.nghiencuukhoahoc.services.thoigianquytrinh.ThoiGianQuyTrinhService;
import com.stc.nghiencuukhoahoc.services.thongbao.ThongBaoService;
import com.stc.nghiencuukhoahoc.services.word.WordService;
import com.stc.nghiencuukhoahoc.utils.EnumTrangThaiDeTai;
import com.stc.vietnamstringutils.VietnameseStringUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import java.io.File;
import java.security.Principal;
import java.util.*;

/**
 * Created by IntelliJ IDEA.
 * User: thangtm
 * Date: 3/11/2021
 * Time: 10:22 AM
 * Filename: DeTaiServiceImpl
 */
@Service
@Slf4j
public class DeTaiServiceImpl implements DeTaiService {
    private final DeTaiRepository deTaiRepository;

    private final LinhVucRepository linhVucRepository;

    private final LinhVucService linhVucService;

    private final LoaiHinhNghienCuuRepository loaiHinhNghienCuuRepository;

    private final ThoiGianQuyTrinhRepository thoiGianQuyTrinhRepository;

    private final SanPhamRepository sanPhamRepository;

    private final LoaiKinhPhiRepository loaiKinhPhiRepository;

    private final HoiDongXetDuyetRepository hoiDongXetDuyetRepository;

    private final WordService wordService;

    private final VietnameseStringUtils vietnameseStringUtils;

    private final HrmServiceClient hrmServiceClient;

    private final EmailService emailService;

    private final MyFileService myFileService;

    private final ThoiGianQuyTrinhService thoiGianQuyTrinhService;

    private final CauHinhBieuMauService cauHinhBieuMauService;

    private final NhanVienService nhanVienService;

    private final SanPhamService sanPhamService;

    private final LoaiHinhNghienCuuService loaiHinhNghienCuuService;

    private final ThongBaoService thongBaoService;


    public DeTaiServiceImpl(DeTaiRepository deTaiRepository, LinhVucRepository linhVucRepository, LinhVucService linhVucService, LoaiHinhNghienCuuRepository loaiHinhNghienCuuRepository, ThoiGianQuyTrinhRepository thoiGianQuyTrinhRepository, SanPhamRepository sanPhamRepository, LoaiKinhPhiRepository loaiKinhPhiRepository, HoiDongXetDuyetRepository hoiDongXetDuyetRepository, WordService wordService, VietnameseStringUtils vietnameseStringUtils, HrmServiceClient hrmServiceClient, EmailService emailService, MyFileService myFileService, ThoiGianQuyTrinhService thoiGianQuyTrinhService, CauHinhBieuMauService cauHinhBieuMauService, NhanVienService nhanVienService, SanPhamService sanPhamService, LoaiHinhNghienCuuService loaiHinhNghienCuuService, ThongBaoService thongBaoService) {
        this.deTaiRepository = deTaiRepository;
        this.linhVucRepository = linhVucRepository;
        this.linhVucService = linhVucService;
        this.loaiHinhNghienCuuRepository = loaiHinhNghienCuuRepository;
        this.thoiGianQuyTrinhRepository = thoiGianQuyTrinhRepository;
        this.sanPhamRepository = sanPhamRepository;
        this.loaiKinhPhiRepository = loaiKinhPhiRepository;
        this.hoiDongXetDuyetRepository = hoiDongXetDuyetRepository;
        this.wordService = wordService;
        this.vietnameseStringUtils = vietnameseStringUtils;
        this.hrmServiceClient = hrmServiceClient;
        this.emailService = emailService;
        this.myFileService = myFileService;
        this.thoiGianQuyTrinhService = thoiGianQuyTrinhService;
        this.cauHinhBieuMauService = cauHinhBieuMauService;
        this.nhanVienService = nhanVienService;
        this.sanPhamService = sanPhamService;
        this.loaiHinhNghienCuuService = loaiHinhNghienCuuService;
        this.thongBaoService = thongBaoService;
    }

    @Override
    public List<DeTai> getAll() {
        try {
            return deTaiRepository.findAll();
        } catch (Exception e) {
            throw new InvalidException("???? c?? l???i trong qu?? tr??nh l???y ????? t??i!");
        }
    }

    @Override
    public Page<DeTai> getByTrangThaiDeTaiPaging(String search, String trangThaiDeTai, Pageable pageable) {
        return deTaiRepository.getAllDeTaiByTrangThaiPaging(vietnameseStringUtils.makeSearchRegex(search), trangThaiDeTai, pageable);
    }

    @Override
    public Page<DeTai> getByChuNhiemPaging(String emailChuNhiem, String search, DeTaiByThoiGianTrangThaiDto dto, Pageable pageable) {
        if(ObjectUtils.isEmpty(dto.getTrangThaiDeTais())){
            return deTaiRepository.getDeTaisByEmailChuNhiemThoiGianQuyTrinhAll(emailChuNhiem, dto.getThoiGianQuyTrinhId(), vietnameseStringUtils.makeSearchRegex(search), pageable);
        }
        return deTaiRepository.getDeTaisByEmailChuNhiemThoiGianQuyTrinh(emailChuNhiem, dto.getThoiGianQuyTrinhId(), vietnameseStringUtils.makeSearchRegex(search), dto.getTrangThaiDeTais(), pageable);
    }

    @Override
    public Page<DeTai> getDeTaiChuaCoHoiDongXetDuyet(String search, Pageable pageable) {
            ThoiGianQuyTrinh thoiGianQuyTrinhActive = thoiGianQuyTrinhService.getListActive().get(0);
            List<String> deTaiCoHoiDongs = new ArrayList<>();
            List<HoiDongXetDuyet> hoiDongXetDuyets = hoiDongXetDuyetRepository.getListDeTaiCoHoiDongXetDuyetTheoThoiGianQuyTrinh(thoiGianQuyTrinhActive.getId());
            hoiDongXetDuyets.stream().map(HoiDongXetDuyet::getDeTaiIds).forEach(deTaiCoHoiDongs::addAll);
            Page<DeTai> deTaiChuaCoHoiDongXetDuyet = deTaiRepository.getDeTaiChuaCoHoiDongXetDuyetTheoThoiGianQuyTrinh(search, EnumTrangThaiDeTai.DAT_KHCN.name(), thoiGianQuyTrinhActive.getId(), deTaiCoHoiDongs, pageable);
            return deTaiChuaCoHoiDongXetDuyet;
    }

    @Override
    public Page<DeTai> getDeTaiByTruongDonViVaTrangThaiDeTai(String search, String email, String trangThaiDeTai, Pageable pageable) {
        try {
            NhanVienEd nhanVienEd = nhanVienService.getByEmail(email);
            Page<DeTai> deTais = deTaiRepository.getByDonViIdAndTrangThaiDeTai(vietnameseStringUtils.makeSearchRegex(search), nhanVienEd.getDonViId(), trangThaiDeTai, pageable);
            return deTais;
        } catch (Exception e) {
            throw new InvalidException("???? c?? l???i trong qu?? tr??nh l???y ????? t??i!");
        }
    }

    @Override
    public DeTai addNew(DeTaiDto dto, Principal principal) {
            DeTai deTai = new DeTai();
            if(ObjectUtils.isEmpty(dto.getTenDeTai())){
                throw new InvalidException( "T??n ????? t??i kh??ng b??? tr???ng");
            }
            if(ObjectUtils.isEmpty(dto.getTenDeTaiEn())){
                throw new InvalidException("T??n ????? t??i ti???ng anh kh??ng b??? tr???ng");
            }
            if(ObjectUtils.isEmpty(dto.getLinhVucNghienCuuId())){
                throw new InvalidException("L??nh v???c kh??ng b??? tr???ng");
            }
            if(ObjectUtils.isEmpty(dto.getTinhCapThiet())){
                throw new InvalidException("T??nh c???p thi???t kh??ng b??? tr???ng");
            }
            if(ObjectUtils.isEmpty(dto.getMucTieu())){
                throw new InvalidException("M???c ti??u kh??ng b??? tr???ng");
            }
            if(ObjectUtils.isEmpty(dto.getMucTieuEn())){
                throw new InvalidException("M???c ti??u ti???ng anh kh??ng b??? tr???ng");
            }
            if(ObjectUtils.isEmpty(dto.getNoiDungChinh())){
                throw new InvalidException("N???i dung ch??nh kh??ng b??? tr???ng");
            }
            if(ObjectUtils.isEmpty(dto.getSanPhamDuKien())){
                throw new InvalidException("S???n ph???m d??? ki???n kh??ng b??? tr???ng");
            }
            if(ObjectUtils.isEmpty(dto.getHieuQuaDuKien())){
                throw new InvalidException("Hi???u qu??? d??? ki???n kh??ng b??? tr???ng");
            }
            if(ObjectUtils.isEmpty(dto.getNhuCauKinhPhiDuKien())){
                throw new InvalidException("Nhu c???u kinh ph?? d??? ki???n kh??ng b??? tr???ng");
            }
            if(ObjectUtils.isEmpty(dto.getThoiGianNghienCuuDuKien())){
                throw new InvalidException("Th???i gian nghi??n c???u d??? ki???n kh??ng b??? tr???ng");
            }
            NhanVien nhanVien = hrmServiceClient.getNhanVienByEmail(principal.getName());
            deTai.setChuNhiemDeTai(Mapper.convertNhanVien(nhanVien));
            deTai.setTenDeTai(dto.getTenDeTai());
            deTai.setTenDeTaiEn(dto.getTenDeTaiEn());
            if (dto.getLinhVucNghienCuuId() != null) {
                LinhVuc linhVuc = linhVucRepository.findByIdAndTrangThaiIsTrue(dto.getLinhVucNghienCuuId())
                        .orElseThrow(() -> new NotFoundException(String.format("Kh??ng t??m th???y l??nh v???c v???i id: %s", dto.getLinhVucNghienCuuId())));
                deTai.setLinhVucNghienCuu(linhVuc);
            }
            deTai.setTinhCapThiet(dto.getTinhCapThiet());
            deTai.setMucTieu(dto.getMucTieu());
            deTai.setMucTieuEn(dto.getMucTieuEn());
            deTai.setNoiDungChinh(dto.getNoiDungChinh());
            if (dto.getSanPhamDuKien() != null) {
                deTai.setSanPhamDuKien(getSanPhamDuKienFromDto(dto.getSanPhamDuKien()));
            }
            deTai.setHieuQuaDuKien(dto.getHieuQuaDuKien());
            deTai.setThoiGianNghienCuuDuKien(dto.getThoiGianNghienCuuDuKien());
            deTai.setNhuCauKinhPhiDuKien(dto.getNhuCauKinhPhiDuKien());

            if(thoiGianQuyTrinhService.getListActive().isEmpty()) {
                throw new InvalidException("Th???i gian quy tr??nh hi???n kh??ng c?? active");
            }
            deTai.setThoiGianQuyTrinh(thoiGianQuyTrinhService.getListActive().get(0));
            deTai.setTrangThaiDeTai(EnumTrangThaiDeTai.MOI_DANG_KY.name());
            deTaiRepository.save(deTai);
            return deTai;
    }

    @Override
    public DeTai mailYeuCauChinhSuaKhoa(String deTaiId, YeuCauChinhSuaDto dto) {
        DeTai deTai = getDeTai(deTaiId);
        if(ObjectUtils.isEmpty(dto.getNoiDungChinhSua())){
            throw new InvalidException("N???i dung ch???nh s???a kh??ng b??? tr???ng");
        }
        if(ObjectUtils.isEmpty(dto.getKinhPhiPhanBo())){
            throw new InvalidException("Kinh ph?? ph??n b??? kh??ng b??? tr???ng");
        }
        DonVi donVi = hrmServiceClient.getDonViById(deTai.getDonViId());

        Map<String, Object> model = new HashMap<>();
        String subject = "Y??u c???u ch???nh s???a ????? t??i nghi??n c???u khoa h???c t??? " + donVi.getTenDonVi();
        model.put("thongbao", subject);
        model.put("cndt", deTai.getChuNhiemDeTai().getHoTen());
        model.put("nguoiyeucau", "Tr?????ng ????n v???");
        model.put("detai", deTai.getTenDeTai());
        model.put("noidung", dto.getNoiDungChinhSua());
        emailService.sendTextMail(deTai.getChuNhiemDeTai().getEmail(), subject, "mail-yeu-cau-chinh-sua.ftl", model, dto.getNoiDungChinhSua());
        deTai.setKinhPhiDuocPhanBo(dto.getKinhPhiPhanBo());
        deTai.setTrangThaiDeTai(EnumTrangThaiDeTai.YEU_CAU_CHINH_SUA_KHOA.name());
        deTaiRepository.save(deTai);
        return deTai;
    }

    @Override
    public DeTai mailYeuCauChinhSuaKHCN(String deTaiId, YeuCauChinhSuaDto dto) {
        DeTai deTai = getDeTai(deTaiId);
        if(ObjectUtils.isEmpty(dto.getNoiDungChinhSua())){
            throw new InvalidException("N???i dung ch???nh s???a kh??ng b??? tr???ng");
        }
        if(ObjectUtils.isEmpty(dto.getKinhPhiPhanBo())){
            throw new InvalidException("Kinh ph?? ph??n b??? kh??ng b??? tr???ng");
        }
        Map<String, Object> model = new HashMap<>();
        String subject = "Y??u c???u ch???nh s???a ????? t??i nghi??n c???u khoa h???c t??? Ph??ng Khoa h???c C??ng ngh???";
        model.put("thongbao", subject);
        model.put("cndt", deTai.getChuNhiemDeTai().getHoTen());
        model.put("nguoiyeucau", "Ph??ng Khoa h???c C??ng Ngh???");
        model.put("detai", deTai.getTenDeTai());
        model.put("noidung", dto.getNoiDungChinhSua());
        emailService.sendTextMail(deTai.getChuNhiemDeTai().getEmail(), subject, "mail-yeu-cau-chinh-sua.ftl", model, dto.getNoiDungChinhSua());
        deTai.setKinhPhiDuocPhanBo(dto.getKinhPhiPhanBo());
        deTai.setTrangThaiDeTai(EnumTrangThaiDeTai.YEU_CAU_CHINH_SUA_KHCN.name());
        deTaiRepository.save(deTai);
        return deTai;
    }

    @Override
    public DeTai uploadHopDongThucHien(String deTaiId, String fileKyHopDongId) {
        MyFile file = myFileService.getFileInfo(fileKyHopDongId);
        DeTai deTai = getDeTai(deTaiId);
        if(!deTai.getTrangThaiDeTai().equals(EnumTrangThaiDeTai.DAT_XET_DUYET.name()) && !deTai.getTrangThaiDeTai().equals(EnumTrangThaiDeTai.KY_HOP_DONG.name())){
            throw new InvalidException("????? t??i kh??ng th??? k?? h???p ?????ng n???a");
        }
        if(ObjectUtils.isEmpty(deTai.getMaSo())){
            throw new InvalidException("????? t??i ch??a nh???p m?? s??? ????? t??i");
        }
        List<String> fileKyHopDongs = deTai.getFileKyHopDongs();
        fileKyHopDongs.add(fileKyHopDongId);
        deTai.setFileKyHopDongs(fileKyHopDongs);
        deTai.setTrangThaiDeTai(EnumTrangThaiDeTai.KY_HOP_DONG.name());
        deTaiRepository.save(deTai);
        return deTai;
    }

    @Override
    public DeTai update(String deTaiId, DeTaiDto dto) {
            DeTai deTai = getDeTai(deTaiId);
            if(deTai.getTrangThaiDeTai().equals(EnumTrangThaiDeTai.DAT_KHCN.name())){
                throw new InvalidException("????? t??i ???? qua gia ??o???n ki???m tra ????nh gi?? kh??ng c???p nh???t l???i");
            }

            if(ObjectUtils.isEmpty(dto.getTenDeTai())){
                throw new InvalidException( "T??n ????? t??i kh??ng b??? tr???ng");
            }
            if(ObjectUtils.isEmpty(dto.getTenDeTaiEn())){
                throw new InvalidException("T??n ????? t??i ti???ng anh kh??ng b??? tr???ng");
            }
            if(ObjectUtils.isEmpty(dto.getLinhVucNghienCuuId())){
                throw new InvalidException("L??nh v???c kh??ng b??? tr???ng");
            }
            if(ObjectUtils.isEmpty(dto.getLoaiHinhNghienCuuId())){
                throw new InvalidException("Lo???i h??nh nghi??n c???u kh??ng ????? tr???ng");
            }
            if(ObjectUtils.isEmpty(dto.getTinhCapThiet())){
                throw new InvalidException("T??nh c???p thi???t kh??ng b??? tr???ng");
            }
            if(ObjectUtils.isEmpty(dto.getMucTieu())){
                throw new InvalidException("M???c ti??u kh??ng b??? tr???ng");
            }
            if(ObjectUtils.isEmpty(dto.getMucTieuEn())){
                throw new InvalidException("M???c ti??u ti???ng anh kh??ng b??? tr???ng");
            }
            if(ObjectUtils.isEmpty(dto.getNoiDungChinh())){
                throw new InvalidException("N???i dung ch??nh kh??ng b??? tr???ng");
            }
            if(ObjectUtils.isEmpty(dto.getSanPhamDuKien())){
                throw new InvalidException("S???n ph???m d??? ki???n kh??ng b??? tr???ng");
            }
            if(ObjectUtils.isEmpty(dto.getHieuQuaDuKien())){
                throw new InvalidException("Hi???u qu??? d??? ki???n kh??ng b??? tr???ng");
            }
            if(ObjectUtils.isEmpty(dto.getNhuCauKinhPhiDuKien())){
                throw new InvalidException("Nhu c???u kinh ph?? d??? ki???n kh??ng b??? tr???ng");
            }
            if(ObjectUtils.isEmpty(dto.getThoiGianNghienCuuDuKien())){
                throw new InvalidException("Th???i gian nghi??n c???u d??? ki???n kh??ng b??? tr???ng");
            }
            if(ObjectUtils.isEmpty(dto.getKinhPhiDuKien())){
                throw new InvalidException("Kinh ph?? d??? ki???n kh??ng b??? tr???ng");
            }
            if(ObjectUtils.isEmpty(dto.getDoiTuongNghienCuu())){
                throw new InvalidException("?????i t?????ng nghi??n c???u kh??ng b??? tr???ng");
            }
            if(ObjectUtils.isEmpty(dto.getPhamViNghienCuu())){
                throw new InvalidException("Ph???m vi nghi??n c???u kh??ng b??? tr???ng");
            }
            if(ObjectUtils.isEmpty(dto.getCachTiepCan())){
                throw new InvalidException("C??ch ti???p c???n kh??ng ????? tr???ng");
            }
            if(ObjectUtils.isEmpty(dto.getNoiDungNghienCuu())){
                throw new InvalidException("N???i dung nghi??n c???u kh??ng ????? tr???ng");
            }
            if(ObjectUtils.isEmpty(dto.getTienDoThucHiens())){
                throw new InvalidException("Ti???n ????? th???c hi???n kh??ng ????? tr???ng");
            }
            if(ObjectUtils.isEmpty(dto.getPhuongPhapNghienCuu())){
                throw new InvalidException("Ph????ng ph??p nghi??n c???u kh??ng ????? tr???ng");
            }
            if(ObjectUtils.isEmpty(dto.getThanhVienCungThamGias())){
                throw new InvalidException("Th??nh vi??n c??ng tham gia kh??ng ????? tr???ng");
            }
            if(ObjectUtils.isEmpty(dto.getHieuQua())){
                throw new InvalidException("Hi???u qu??? kh??ng ????? tr???ng");
            }
            if(ObjectUtils.isEmpty(dto.getChuyenGiaoVaUngDung())){
                throw new InvalidException("Chuy???n giao v?? ???ng d???ng kh??ng ????? tr???ng");
            }
            if(ObjectUtils.isEmpty(dto.getChiTietKinhPhiDuKiens())){
                throw new InvalidException("Chi ti???t kinh ph?? d??? ki???n kh??ng ????? tr???ng");
            }
            if(ObjectUtils.isEmpty(dto.getKinhPhiDuocPhanBo())){
                throw new InvalidException("Kinh ph?? ???????c ph??n b??? kh??ng ????? tr???ng");
            }
            if(ObjectUtils.isEmpty(dto.getTongQuanTinhHinhNghienCuu())){
                throw new InvalidException("T???ng quan t??nh h??nh nghi??n c???u kh??ng ????? tr???ng");
            }
            if(ObjectUtils.isEmpty(dto.getDonViId())){
                throw new InvalidException("????n v??? kh??ng ????? tr???ng");
            }
            deTai.setTenDeTai(dto.getTenDeTai());
            deTai.setTenDeTaiEn(dto.getTenDeTaiEn());
            deTai.setMaSoTheoLinhVucNghienCuu(dto.getMaSoTheoLinhVucNghienCuu());
            deTai.setMaSoTheoMucTieuNghienCuu(dto.getMaSoTheoMucTieuNghienCuu());
            LinhVuc linhVuc = linhVucService.getLinhVucCore(dto.getLinhVucNghienCuuId());
            deTai.setLinhVucNghienCuu(linhVuc);
            LoaiHinhNghienCuu loaiHinhNghienCuu = loaiHinhNghienCuuService.getLoaiHinhNghienCuuCore(dto.getLoaiHinhNghienCuuId());
            deTai.setLoaiHinhNghienCuu(loaiHinhNghienCuu);
            deTai.setTinhCapThiet(dto.getTinhCapThiet());
            deTai.setMucTieu(dto.getMucTieu());
            deTai.setMucTieuEn(dto.getMucTieuEn());
            deTai.setNoiDungChinh(dto.getNoiDungChinh());
            deTai.setSanPhamDuKien(getSanPhamDuKienFromDto(dto.getSanPhamDuKien()));
            deTai.setHieuQuaDuKien(dto.getHieuQuaDuKien());
            deTai.setThoiGianNghienCuuDuKien(dto.getThoiGianNghienCuuDuKien());
            deTai.setNhuCauKinhPhiDuKien(dto.getNhuCauKinhPhiDuKien());
            deTai.setKinhPhiDuKien(getKinhPhiDuKienFromDto(dto.getKinhPhiDuKien()));
            deTai.setDoiTuongNghienCuu(dto.getDoiTuongNghienCuu());
            deTai.setPhamViNghienCuu(dto.getPhamViNghienCuu());
            deTai.setCachTiepCan(dto.getCachTiepCan());
            deTai.setNoiDungNghienCuu(dto.getNoiDungNghienCuu());

            List<TienDoThucHien> tienDoThucHiens = new ArrayList<>();
            for (TienDoThucHienDto tienDoThucHienDto : dto.getTienDoThucHiens()) {
                tienDoThucHiens.add(getTienDoThucHienFromDto(tienDoThucHienDto));
            }
            deTai.setTienDoThucHiens(tienDoThucHiens);

            deTai.setPhuongPhapNghienCuu(dto.getPhuongPhapNghienCuu());

            List<ThanhVienCungThamGia> thanhVienCungThamGias = new ArrayList<>();
            for (ThanhVienCungThamGiaDto thanhVienCungThamGiaDto : dto.getThanhVienCungThamGias()) {
                thanhVienCungThamGias.add(getThanhVienCungThamGiaFromDto(thanhVienCungThamGiaDto));
            }
            deTai.setThanhVienCungThamGias(thanhVienCungThamGias);
            if (dto.getDonViPhoiHops() != null) {
                List<DonViPhoiHop> donViPhoiHops = new ArrayList<>();
                for (DonViPhoiHopDto donViPhoiHopDto : dto.getDonViPhoiHops()) {
                    donViPhoiHops.add(getDonViPhoiHopFromDto(donViPhoiHopDto));
                }
                deTai.setDonViPhoiHops(donViPhoiHops);
            }
            if (dto.getSanPhamKhoaHocs() != null) {
                List<ChiTietSanPham> sanPhamKhoaHocs = new ArrayList<>();
                for (ChiTietSanPhamDto chiTietSanPhamDto : dto.getSanPhamKhoaHocs()) {
                    sanPhamKhoaHocs.add(getChiTietSanPhamFromDto(chiTietSanPhamDto));
                }
                deTai.setSanPhamKhoaHocs(sanPhamKhoaHocs);
            }
            if (dto.getSanPhamDaoTaos() != null) {
                List<ChiTietSanPham> sanPhamDaoTaos = new ArrayList<>();
                for (ChiTietSanPhamDto chiTietSanPhamDto : dto.getSanPhamDaoTaos()) {
                    sanPhamDaoTaos.add(getChiTietSanPhamFromDto(chiTietSanPhamDto));
                }
                deTai.setSanPhamDaoTaos(sanPhamDaoTaos);
            }
            if (dto.getSanPhamUngDungs() != null) {
                List<ChiTietSanPham> sanPhamUngDungs = new ArrayList<>();
                for (ChiTietSanPhamDto chiTietSanPhamDto : dto.getSanPhamUngDungs()) {
                    sanPhamUngDungs.add(getChiTietSanPhamFromDto(chiTietSanPhamDto));
                }
                deTai.setSanPhamUngDungs(sanPhamUngDungs);
            }
            if (dto.getSanPhamKhacs() != null) {
                List<ChiTietSanPhamKhac> chiTietSanPhamKhacs = new ArrayList<>();
                for (ChiTietSanPhamKhacDto chiTietSanPhamKhacDto : dto.getSanPhamKhacs()) {
                    chiTietSanPhamKhacs.add(getChiTietSanPhamKhacFromDto(chiTietSanPhamKhacDto));
                }
                deTai.setSanPhamKhacs(chiTietSanPhamKhacs);
            }
            deTai.setHieuQua(dto.getHieuQua());
            deTai.setChuyenGiaoVaUngDung(dto.getChuyenGiaoVaUngDung());
            List<ChiTietKinhPhiDuKien> chiTietKinhPhiDuKiens = new ArrayList<>();
            for (ChiTietKinhPhiDuKienDto chiTietKinhPhiDuKienDto : dto.getChiTietKinhPhiDuKiens()) {
                chiTietKinhPhiDuKiens.add(getChiTietKinhPhiDuKienFromDto(chiTietKinhPhiDuKienDto));
            }
            deTai.setChiTietKinhPhiDuKiens(chiTietKinhPhiDuKiens);
            deTai.setKinhPhiDuocPhanBo(deTai.getKinhPhiDuKien().getTongKinhPhi());
            if(thoiGianQuyTrinhService.getListActive().isEmpty()) {
                throw new InvalidException("Th???i gian quy tr??nh hi???n kh??ng c?? active");
            }
            deTai.setThoiGianQuyTrinh(thoiGianQuyTrinhService.getListActive().get(0));
            if (deTai.getTrangThaiDeTai().equals(EnumTrangThaiDeTai.YEU_CAU_CHINH_SUA_KHOA.name())) {
                deTai.setTrangThaiDeTai(EnumTrangThaiDeTai.DA_CHINH_SUA_KHOA.name());
            }
            if (deTai.getTrangThaiDeTai().equals(EnumTrangThaiDeTai.YEU_CAU_CHINH_SUA_KHCN.name())) {
                deTai.setTrangThaiDeTai(EnumTrangThaiDeTai.DA_CHINH_SUA_KHCN.name());
            }
            deTai.setTongQuanTinhHinhNghienCuu(getTongQuanTinhHinhNghienCuuFromDto(dto.getTongQuanTinhHinhNghienCuu()));
            deTai.setDonViId(dto.getDonViId());
            deTaiRepository.save(deTai);
            return deTai;
    }

    @Override
    public DeTai cndtHuyDeTai(String deTaiId) {
        DeTai deTai = getDeTai(deTaiId);
        deTai.setTrangThaiDeTai(EnumTrangThaiDeTai.HUY.name());
        deTaiRepository.save(deTai);
        return deTai;
    }

    @Override
    public DeTai truongDonViDuyet(String deTaiId) {
        DeTai deTai = getDeTai(deTaiId);
        deTai.setTrangThaiDeTai(EnumTrangThaiDeTai.DAT_KHOA.name());
        deTai.setKinhPhiDuocPhanBo(deTai.getKinhPhiDuKien().getTongKinhPhi());
        deTaiRepository.save(deTai);
        return deTai;
    }

    @Override
    public DeTai khoaHocCongNgheDuyet(String deTaiId) {
        DeTai deTai = getDeTai(deTaiId);
        deTai.setTrangThaiDeTai(EnumTrangThaiDeTai.DAT_KHCN.name());
        deTai.setKinhPhiDuocPhanBo(deTai.getKinhPhiDuKien().getTongKinhPhi());
        deTaiRepository.save(deTai);
        return deTai;
    }

    @Override
    public DeTai getDeTai(String deTaiId) {
        return deTaiRepository.findById(deTaiId).orElseThrow(
                () -> new NotFoundException(String.format("Kh??ng t??m th???y ????? t??i v???i id: %s", deTaiId)));
    }

    @Override
    public DeTai updateDeXuatDeTai(String deTaiId, DeTaiDto dto) {
        DeTai deTai = getDeTai(deTaiId);
        if(ObjectUtils.isEmpty(dto.getTenDeTai())){
            throw new InvalidException("T??n ????? t??i kh??ng ????? tr???ng");
        }
        if(ObjectUtils.isEmpty(dto.getTenDeTaiEn())){
            throw new InvalidException("T??n ????? t??i ti???ng anh kh??ng ????? tr???ng");
        }
        if(ObjectUtils.isEmpty(dto.getLinhVucNghienCuuId())){
            throw new InvalidException("L??nh v???c kh??ng ???????c b??? tr???ng");
        }
        LinhVuc linhVuc = linhVucService.getLinhVuc(dto.getLinhVucNghienCuuId());
        if(ObjectUtils.isEmpty(dto.getTinhCapThiet())){
            throw new InvalidException("T??nh c??p thi???t kh??ng b??? tr???ng");
        }
        if(ObjectUtils.isEmpty(dto.getMucTieu())){
            throw new InvalidException("M???c ti??u kh??ng b??? tr???ng");
        }
        if(ObjectUtils.isEmpty(dto.getMucTieuEn())){
            throw new InvalidException("M???c ti??u ti???ng anh kh??ng b??? tr???ng");
        }
        if(ObjectUtils.isEmpty(dto.getNoiDungChinh())){
            throw new InvalidException("N???i dung ch??nh kh??ng b??? tr???ng");
        }
        if(ObjectUtils.isEmpty(dto.getSanPhamDuKien())){
            throw new InvalidException("S???n ph???m d??? ki???n kh??ng b??? tr???ng");
        }
        if(ObjectUtils.isEmpty(dto.getHieuQuaDuKien())){
            throw new InvalidException("Hi???u qu??? d??? ki???n kh??ng b??? tr???ng");
        }
        if(ObjectUtils.isEmpty(dto.getNhuCauKinhPhiDuKien())){
            throw new InvalidException("Nhu c???u kinh ph?? d??? ki???n kh??ng b??? tr???ng");
        }
        if(ObjectUtils.isEmpty(dto.getThoiGianNghienCuuDuKien())){
            throw new InvalidException("Th???i gian nghi??n c???u d??? ki???n kh??ng b??? tr???ng");
        }
        deTai.setTenDeTai(dto.getTenDeTai());
        deTai.setTenDeTaiEn(dto.getTenDeTaiEn());
        deTai.setLinhVucNghienCuu(linhVuc);
        deTai.setTinhCapThiet(dto.getTinhCapThiet());
        deTai.setMucTieu(dto.getMucTieu());
        deTai.setMucTieuEn(dto.getMucTieuEn());
        deTai.setNoiDungChinh(dto.getNoiDungChinh());
        deTai.setSanPhamDuKien(getSanPhamDuKienFromDto(dto.getSanPhamDuKien()));
        deTai.setHieuQuaDuKien(dto.getHieuQuaDuKien());
        deTai.setNhuCauKinhPhiDuKien(dto.getNhuCauKinhPhiDuKien());
        deTai.setThoiGianNghienCuuDuKien(dto.getThoiGianNghienCuuDuKien());
        deTaiRepository.save(deTai);
        return deTai;
    }

    @Override
    public DeTai uploadBoSungThuyetMinh(String deTaiId, String fileId) {
        DeTai deTai = getDeTai(deTaiId);
        MyFile myFile = myFileService.getFileInfo(fileId);
        List<String> fileBoSungThuyetMinhs = deTai.getFileBoSungThuyetMinhs();
        fileBoSungThuyetMinhs.add(fileId);
        deTai.setFileBoSungThuyetMinhs(fileBoSungThuyetMinhs);
        deTaiRepository.save(deTai);
        return deTai;
    }

    @Override
    public File xuatBoSungThuyetMinh(String deTaiId) throws Exception{
        DeTai deTai = getDeTai(deTaiId);
        return wordService.xuatBoSungThuyetMinhDeTai(deTai);
    }


    @Override
    public DeTai addTinhHinhThucHien(String deTaiId, BaoCaoTienDoDto dto) {
        DeTai deTai = getDeTai(deTaiId);
        BaoCaoTienDo baoCaoTienDo = new BaoCaoTienDo();
        if (ObjectUtils.isEmpty(dto.getNoiDungBM07s())) {
            throw new InvalidException("N???i dung nghi??n c???u kh??ng b??? tr???ng");
        }

        if (ObjectUtils.isEmpty(dto.getKinhPhiDaChi())) {
            throw new InvalidException("Kinh ph?? ???? chi kh??ng ????? tr???ng");
        }
        if (ObjectUtils.isEmpty(dto.getKinhPhiDaQuyetToan())) {
            throw new InvalidException("Kinh ph?? ???? quy???t to??n kh??ng ????? tr???ng");
        }
        if (ObjectUtils.isEmpty(dto.getTuDanhGia())) {
            throw new InvalidException("T??? ????nh gi?? kh??ng ????? tr???ng");
        }
        if (ObjectUtils.isEmpty(dto.getDuKienKetQua())) {
            throw new InvalidException("D??? ki???n k???t qu??? kh??ng ????? tr???ng");
        }
        if (ObjectUtils.isEmpty(dto.getKinhPhiThucHien())) {
            throw new InvalidException("Kinh ph?? th???c hi???n");
        }
        if (ObjectUtils.isEmpty(dto.isThoiGianNghiemThuDuKien())) {
            throw new InvalidException("Th???i gian nghi???m thu d??? ki???n kh??ng ????? tr???ng");
        }
        if (ObjectUtils.isEmpty(dto.getKienNghi())) {
            throw new InvalidException("Ki???n ngh??? kh??ng ????? tr???ng");
        }
        if(ObjectUtils.isEmpty(dto.getNoiDungNghienCuu())){
            throw new InvalidException("N???i dung nghi??n c???u kh??ng ????? tr???ng");
        }

        if (dto.getSanPhamKhoaHocBM07s() != null) {
            List<ChiTietSanPhamBM07> sanPhamKhoaHocBM07s = new ArrayList<>();
            for (ChiTietSanPhamBM07Dto chiTietSanPhamBM07Dto : dto.getSanPhamKhoaHocBM07s()) {
                sanPhamKhoaHocBM07s.add(getChiTietSanPhamBM07FromDto(chiTietSanPhamBM07Dto));
            }
            baoCaoTienDo.setSanPhamKhoaHocBM07s(sanPhamKhoaHocBM07s);
        }
        if (dto.getSanPhamDaoTaoBM07s() != null) {
            List<ChiTietSanPhamBM07> sanPhamDaoTaoBM07s = new ArrayList<>();
            for (ChiTietSanPhamBM07Dto chiTietSanPhamBM07Dto : dto.getSanPhamDaoTaoBM07s()) {
                sanPhamDaoTaoBM07s.add(getChiTietSanPhamBM07FromDto(chiTietSanPhamBM07Dto));
            }
            baoCaoTienDo.setSanPhamDaoTaoBM07s(sanPhamDaoTaoBM07s);
        }
        if (dto.getSanPhamUngDungBM07s() != null) {
            List<ChiTietSanPhamBM07> sanPhamUngDungBM07s = new ArrayList<>();
            for (ChiTietSanPhamBM07Dto chiTietSanPhamBM07Dto : dto.getSanPhamUngDungBM07s()) {
                sanPhamUngDungBM07s.add(getChiTietSanPhamBM07FromDto(chiTietSanPhamBM07Dto));
            }
            baoCaoTienDo.setSanPhamUngDungBM07s(sanPhamUngDungBM07s);
        }
        if (dto.getSanPhamKhacBM07s() != null) {
            List<ChiTietSanPhamKhacBM07> sanPhamKhacBM07s = new ArrayList<>();
            for (ChiTietSanPhamKhacBM07Dto chiTietSanPhamKhacBM07Dto : dto.getSanPhamKhacBM07s()) {
                sanPhamKhacBM07s.add(getChiTietSanPhamKhacBM07FromDto(chiTietSanPhamKhacBM07Dto));
            }
            baoCaoTienDo.setSanPhamKhacBM07s(sanPhamKhacBM07s);
        }

        baoCaoTienDo.setNoiDungBM07s(dto.getNoiDungBM07s());
        baoCaoTienDo.setKinhPhiDaChi(dto.getKinhPhiDaChi());
        baoCaoTienDo.setKinhPhiDaQuyetToan(dto.getKinhPhiDaQuyetToan());
        baoCaoTienDo.setKinhPhiThucHien(dto.getKinhPhiThucHien());
        baoCaoTienDo.setTuDanhGia(dto.getTuDanhGia());
        baoCaoTienDo.setDuKienKetQua(dto.getDuKienKetQua());
        baoCaoTienDo.setThoiGianNghiemThuDuKien(dto.isThoiGianNghiemThuDuKien());
        baoCaoTienDo.setKienNghi(dto.getKienNghi());
        baoCaoTienDo.setNoiDungNghienCuu(dto.getNoiDungNghienCuu());

        List<BaoCaoTienDo> baoCaoTienDos = deTai.getBaoCaoTienDos();
        baoCaoTienDos.add(baoCaoTienDo);
        deTai.setBaoCaoTienDos(baoCaoTienDos);
        deTaiRepository.save(deTai);
        return deTai;
    }

    @Override
    public DeTai updateTinhHinhThucHien(String deTaiId, BaoCaoTienDoDto dto) {
        DeTai deTai = getDeTai(deTaiId);
        if (ObjectUtils.isEmpty(dto.getNoiDungBM07s())) {
            throw new InvalidException("N???i dung nghi??n c???u kh??ng b??? tr???ng");
        }

        if (ObjectUtils.isEmpty(dto.getKinhPhiDaChi())) {
            throw new InvalidException("Kinh ph?? ???? chi kh??ng ????? tr???ng");
        }
        if (ObjectUtils.isEmpty(dto.getKinhPhiDaQuyetToan())) {
            throw new InvalidException("Kinh ph?? ???? quy???t to??n kh??ng ????? tr???ng");
        }
        if (ObjectUtils.isEmpty(dto.getTuDanhGia())) {
            throw new InvalidException("T??? ????nh gi?? kh??ng ????? tr???ng");
        }
        if (ObjectUtils.isEmpty(dto.getDuKienKetQua())) {
            throw new InvalidException("D??? ki???n k???t qu??? kh??ng ????? tr???ng");
        }
        if (ObjectUtils.isEmpty(dto.getKinhPhiThucHien())) {
            throw new InvalidException("Kinh ph?? th???c hi???n");
        }
        if (ObjectUtils.isEmpty(dto.isThoiGianNghiemThuDuKien())) {
            throw new InvalidException("Th???i gian nghi???m thu d??? ki???n kh??ng ????? tr???ng");
        }
        if (ObjectUtils.isEmpty(dto.getKienNghi())) {
            throw new InvalidException("Ki???n ngh??? kh??ng ????? tr???ng");
        }
        if(ObjectUtils.isEmpty(dto.getNoiDungNghienCuu())){
            throw new InvalidException("N???i dung nghi??n c???u kh??ng ????? tr???ng");
        }

        List<BaoCaoTienDo> baoCaoTienDos = deTai.getBaoCaoTienDos();

        if(baoCaoTienDos.get(baoCaoTienDos.size() -1).getFileBaoCaoTienDos().size() == 0){
            BaoCaoTienDo baoCaoLast =  baoCaoTienDos.get(baoCaoTienDos.size() -1);
            if (dto.getSanPhamKhoaHocBM07s() != null) {
                List<ChiTietSanPhamBM07> sanPhamKhoaHocBM07s = new ArrayList<>();
                for (ChiTietSanPhamBM07Dto chiTietSanPhamBM07Dto : dto.getSanPhamKhoaHocBM07s()) {
                    sanPhamKhoaHocBM07s.add(getChiTietSanPhamBM07FromDto(chiTietSanPhamBM07Dto));
                }
                baoCaoLast.setSanPhamKhoaHocBM07s(sanPhamKhoaHocBM07s);
            }
            if (dto.getSanPhamDaoTaoBM07s() != null) {
                List<ChiTietSanPhamBM07> sanPhamDaoTaoBM07s = new ArrayList<>();
                for (ChiTietSanPhamBM07Dto chiTietSanPhamBM07Dto : dto.getSanPhamDaoTaoBM07s()) {
                    sanPhamDaoTaoBM07s.add(getChiTietSanPhamBM07FromDto(chiTietSanPhamBM07Dto));
                }
                baoCaoLast.setSanPhamDaoTaoBM07s(sanPhamDaoTaoBM07s);
            }
            if (dto.getSanPhamUngDungBM07s() != null) {
                List<ChiTietSanPhamBM07> sanPhamUngDungBM07s = new ArrayList<>();
                for (ChiTietSanPhamBM07Dto chiTietSanPhamBM07Dto : dto.getSanPhamUngDungBM07s()) {
                    sanPhamUngDungBM07s.add(getChiTietSanPhamBM07FromDto(chiTietSanPhamBM07Dto));
                }
                baoCaoLast.setSanPhamUngDungBM07s(sanPhamUngDungBM07s);
            }
            if (dto.getSanPhamKhacBM07s() != null) {
                List<ChiTietSanPhamKhacBM07> sanPhamKhacBM07s = new ArrayList<>();
                for (ChiTietSanPhamKhacBM07Dto chiTietSanPhamKhacBM07Dto : dto.getSanPhamKhacBM07s()) {
                    sanPhamKhacBM07s.add(getChiTietSanPhamKhacBM07FromDto(chiTietSanPhamKhacBM07Dto));
                }
                baoCaoLast.setSanPhamKhacBM07s(sanPhamKhacBM07s);
            }

            baoCaoLast.setNoiDungBM07s(dto.getNoiDungBM07s());
            baoCaoLast.setKinhPhiDaChi(dto.getKinhPhiDaChi());
            baoCaoLast.setKinhPhiDaQuyetToan(dto.getKinhPhiDaQuyetToan());
            baoCaoLast.setKinhPhiThucHien(dto.getKinhPhiThucHien());
            baoCaoLast.setTuDanhGia(dto.getTuDanhGia());
            baoCaoLast.setDuKienKetQua(dto.getDuKienKetQua());
            baoCaoLast.setThoiGianNghiemThuDuKien(dto.isThoiGianNghiemThuDuKien());
            baoCaoLast.setKienNghi(dto.getKienNghi());
            baoCaoLast.setNoiDungNghienCuu(dto.getNoiDungNghienCuu());
        }else{
            throw new InvalidException("B??o c??o ti???n ????? ???? c?? minh ch???ng");
        }
        deTai.setBaoCaoTienDos(baoCaoTienDos);
        deTaiRepository.save(deTai);
        return deTai;
    }

    @Override
    public DeTai uploadTinhHinhThucHien(String deTaiId, String fileId) {
        DeTai deTai = getDeTai(deTaiId);
        MyFile myFile = myFileService.getFileInfo(fileId);
        int size = deTai.getBaoCaoTienDos().size();
        List<BaoCaoTienDo> baoCaoTienDos = deTai.getBaoCaoTienDos();
        List<String>fileBaoCaoTienDos = baoCaoTienDos.get(size -1).getFileBaoCaoTienDos();
        fileBaoCaoTienDos.add(fileId);
        baoCaoTienDos.get(size -1).setFileBaoCaoTienDos(fileBaoCaoTienDos);
        deTai.setBaoCaoTienDos(baoCaoTienDos);
        deTaiRepository.save(deTai);
        return deTai;
    }


    @Override
    public File xuatTinhHinhThucHien(String deTaiId) throws Exception {
        DeTai deTai = getDeTai(deTaiId);
        return wordService.xuatBaoCaoTinhHinhThucHien(deTai);
    }

    @Override
    public File xuatDonXinHuy(String deTaiId, DonXinHuyDto donXinHuyDto) throws Exception{
        if(ObjectUtils.isEmpty(donXinHuyDto)){
            throw new InvalidException("????n xin h???y kh??ng ???????c b??? tr???ng");
        }
        DeTai deTai = getDeTai(deTaiId);
        if(deTai.getTrangThaiDeTai().equals(EnumTrangThaiDeTai.HUY.name())){
            throw new InvalidException("????? t??i n??y ???? ???????c duy???t h???y r???i");
        }
        if(deTai.getTrangThaiDeTai().equals(EnumTrangThaiDeTai.XIN_HUY.name())){
            throw new InvalidException("????? t??i n??y ??ang duy???t xin h???y r???i");
        }
        List<DonXinHuy>donXinHuys = new ArrayList<DonXinHuy>();
        if(deTai.getDonXinHuys() != null) {
            donXinHuys = deTai.getDonXinHuys();
        }

        DonXinHuy donXinHuy = new DonXinHuy();
        donXinHuy.setLyDo(donXinHuyDto.getLyDo());
        donXinHuy.setSoTienDaTamUng(donXinHuyDto.getSoTienDaTamUng());
        donXinHuy.setThoiGianTamUng(donXinHuyDto.getThoiGianTamUng());
        File file = wordService.xuatDonXinHuy(deTai, donXinHuy);
        donXinHuys.add(donXinHuy);
        deTai.setTrangThaiDeTai(EnumTrangThaiDeTai.XIN_HUY.name());
        deTai.setDonXinHuys(donXinHuys);
        deTaiRepository.save(deTai);

        ThongBaoDto dto = new ThongBaoDto();
        String tenThongBao = "????? t??i c?? m?? s???: " + deTai.getMaSo() +" xin h???y";
        String tenThongBaoEn = "Project with code: "+ deTai.getMaSo() + "has requested to cancel";
        dto.setTenThongBao(tenThongBao);
        dto.setTenThongBaoEn(tenThongBaoEn);
        dto.setDeTaiId(deTaiId);
        ThongBao thongBao = thongBaoService.createThongBao(dto);
        return file;
    }

    @Override
    public File xuatThongTinKetQua(String deTaiId) throws Exception{
        DeTai deTai = getDeTai(deTaiId);
        return wordService.xuatThongTinKetQuaNghienCuu(deTai);
    }

    @Override
    public DeTai uploadDonXinHuy(String deTaiId,UploadXinHuyDto dto) {
        DeTai deTai = getDeTai(deTaiId);
        if(deTai.getTrangThaiDeTai().equals(EnumTrangThaiDeTai.HUY.name())){
            throw new InvalidException("????? t??i n??y ???? ???????c h???y");
        }
        if(deTai.getTrangThaiDeTai().equals(EnumTrangThaiDeTai.XIN_HUY.name())) {
            if (dto.isDuyet() == true) {
                MyFile myFile = myFileService.getFileInfo(dto.getFileId());
                List<DonXinHuy> donXinHuys = deTai.getDonXinHuys();
                int size = donXinHuys.size();
                List<String> fileDonXinHuys = donXinHuys.get(size - 1).getFileDonXinHuys();
                fileDonXinHuys.add(dto.getFileId());
                donXinHuys.get(size - 1).setFileDonXinHuys(fileDonXinHuys);
                deTai.setDonXinHuys(donXinHuys);
                deTai.setTrangThaiDeTai(EnumTrangThaiDeTai.HUY.name());
            } else {
                String email = deTai.getChuNhiemDeTai().getEmail();
                String subject = "Y??u c???u xin h???y ????? t??i " + deTai.getTenDeTai() + " kh??ng ???????c duy???t";
                Map<String, Object> model = new HashMap<>();
                model.put("thongbao", subject);
                model.put("cndt", deTai.getChuNhiemDeTai().getHoTen());
                model.put("nguoiyeucau", "Tr?????ng ph??ng khoa h???c c??ng ngh???");
                model.put("detai", deTai.getTenDeTai());
                model.put("noidung", dto.getNoiDungEmailKhongDuyet());
                emailService.sendTextMail(email, subject, "mail-yeu-cau-chinh-sua.ftl", model, dto.getNoiDungEmailKhongDuyet());
                deTai.setTrangThaiDeTai(EnumTrangThaiDeTai.KY_HOP_DONG.name());
            }
        }else {
            throw new InvalidException("????? t??i hi???n t???i ch??a xin h???y");
        }
        deTaiRepository.save(deTai);
        return deTai;
    }

    @Override
    public DeTai updateThongTinKetQuaNghienCuu(String deTaiId, ThongTinKetQuaDto thongTinKetQuaDto) {
        DeTai deTai = getDeTai(deTaiId);
        ThongTinKetQua thongTinKetQua = new ThongTinKetQua();
        if(ObjectUtils.isEmpty(thongTinKetQuaDto.getHieuQuaPhuongThucChuyenGiao())){
            throw new InvalidException("Hi???u qu??? ph????ng th???c chuy???n giao kh??ng ???????c b??? tr???ng");
        }
        thongTinKetQua.setHieuQuaPhuongThucChuyenGiao(thongTinKetQuaDto.getHieuQuaPhuongThucChuyenGiao());
        if(ObjectUtils.isEmpty(thongTinKetQuaDto.getHieuQuaPhuongThucChuyenGiaoEn())){
            throw new InvalidException("Hi???u qu??? ph????ng th???c chuy???n giao ti???ng anh kh??ng ???????c b??? tr???ng");
        }
        thongTinKetQua.setHieuQuaPhuongThucChuyenGiaoEn(thongTinKetQuaDto.getHieuQuaPhuongThucChuyenGiaoEn());

        if (thongTinKetQuaDto.getSanPhamKhoaHocs() != null) {
            List<ChiTietSanPhamBM07> sanPhamKhoaHocBM07s = new ArrayList<>();
            for (ChiTietSanPhamBM07Dto chiTietSanPhamBM07Dto : thongTinKetQuaDto.getSanPhamKhoaHocs()) {
                sanPhamKhoaHocBM07s.add(getChiTietSanPhamBM07FromDto(chiTietSanPhamBM07Dto));
            }
            thongTinKetQua.setSanPhamKhoaHocs(sanPhamKhoaHocBM07s);
        }
        if (thongTinKetQuaDto.getSanPhamDaoTaos() != null) {
            List<ChiTietSanPhamBM07> sanPhamDaoTaoBM07s = new ArrayList<>();
            for (ChiTietSanPhamBM07Dto chiTietSanPhamBM07Dto : thongTinKetQuaDto.getSanPhamDaoTaos()) {
                sanPhamDaoTaoBM07s.add(getChiTietSanPhamBM07FromDto(chiTietSanPhamBM07Dto));
            }
            thongTinKetQua.setSanPhamDaoTaos(sanPhamDaoTaoBM07s);
        }
        if (thongTinKetQuaDto.getSanPhamUngDungs() != null) {
            List<ChiTietSanPhamBM07> sanPhamUngDungBM07s = new ArrayList<>();
            for (ChiTietSanPhamBM07Dto chiTietSanPhamBM07Dto : thongTinKetQuaDto.getSanPhamUngDungs()) {
                sanPhamUngDungBM07s.add(getChiTietSanPhamBM07FromDto(chiTietSanPhamBM07Dto));
            }
            thongTinKetQua.setSanPhamUngDungs(sanPhamUngDungBM07s);
        }
        if (thongTinKetQuaDto.getSanPhamKhacs() != null) {
            List<ChiTietSanPhamKhacBM07> sanPhamKhacBM07s = new ArrayList<>();
            for (ChiTietSanPhamKhacBM07Dto chiTietSanPhamKhacBM07Dto : thongTinKetQuaDto.getSanPhamKhacs()) {
                sanPhamKhacBM07s.add(getChiTietSanPhamKhacBM07FromDto(chiTietSanPhamKhacBM07Dto));
            }
            thongTinKetQua.setSanPhamKhacs(sanPhamKhacBM07s);
        }
        if(ObjectUtils.isEmpty(thongTinKetQuaDto.getTinhMoi())){
            throw new InvalidException("T??nh m???i kh??ng ????? tr???ng");
        }
        thongTinKetQua.setTinhMoi(thongTinKetQuaDto.getTinhMoi());

        if(ObjectUtils.isEmpty(thongTinKetQuaDto.getTinhMoiEn())){
            throw new InvalidException("T??nh m???i (ti???ng anh) kh??ng ????? tr???ng");
        }
        thongTinKetQua.setTinhMoiEn(thongTinKetQuaDto.getTinhMoiEn());
        if(ObjectUtils.isEmpty(thongTinKetQuaDto.getKetQuaNghienCuu())){
            throw new InvalidException("K???t qu??? nghi??n c???u kh??ng ????? tr???ng");
        }
        thongTinKetQua.setKetQuaNghienCuu(thongTinKetQuaDto.getKetQuaNghienCuu());
        if(ObjectUtils.isEmpty(thongTinKetQuaDto.getKetQuaNghienCuuEn())){
            throw new InvalidException("K???t qu??? nghi??n c???u (ti???ng anh) kh??ng ????? tr???ng");
        }
        thongTinKetQua.setKetQuaNghienCuuEn(thongTinKetQuaDto.getKetQuaNghienCuuEn());
        deTai.setThongTinKetQua(thongTinKetQua);
        deTaiRepository.save(deTai);
        return deTai;
    }



//    @Override
//    public DeTai updateGiaiTrinhChinhSua(String deTaiId, List<GiaiTrinhChinhSuaDto> giaiTrinhChinhSuaDtos) {
//        DeTai deTai = getDeTai(deTaiId);
//        List<GiaiTrinhChinhSua> giaiTrinhChinhSuas = new ArrayList<GiaiTrinhChinhSua>();
//        for(GiaiTrinhChinhSuaDto giaiTrinhChinhSuaDto : giaiTrinhChinhSuaDtos){
//            if(ObjectUtils.isEmpty(giaiTrinhChinhSuaDto.getNoiDungGopY())){
//                throw new InvalidException("N???i dung g??p ?? kh??ng ???????c b??? tr???ng");
//            }
//            if(ObjectUtils.isEmpty(giaiTrinhChinhSuaDto.getKetQuaChinhSuaBoSung())){
//                throw new InvalidException("K???t qu??? ch???nh s???a b??? sung kh??ng ???????c b??? tr???ng");
//            }
//            GiaiTrinhChinhSua giaiTrinhChinhSua = new GiaiTrinhChinhSua();
//            giaiTrinhChinhSua.setNoiDungGopY(giaiTrinhChinhSuaDto.getNoiDungGopY());
//            giaiTrinhChinhSua.setKetQuaChinhSuaBoSung(giaiTrinhChinhSuaDto.getKetQuaChinhSuaBoSung());
//            giaiTrinhChinhSua.setGhiChu(giaiTrinhChinhSuaDto.getGhiChu());
//            giaiTrinhChinhSuas.add(giaiTrinhChinhSua);
//        }
//        deTai.setGiaiTrinhChinhSuas(giaiTrinhChinhSuas);
//        deTaiRepository.save(deTai);
//        return deTai;
//    }

    @Override
    public DeTai uploadGiaiTrinhChinhSua(String deTaiId, String fileId) {
        DeTai deTai = getDeTai(deTaiId);
        MyFile myFile = myFileService.getFileInfo(fileId);
        List<String> fileGiaiTrinhChinhSuas = deTai.getFileGiaiTrinhChinhSuas();
        fileGiaiTrinhChinhSuas.add(fileId);
        deTai.setFileGiaiTrinhChinhSuas(fileGiaiTrinhChinhSuas);
        deTaiRepository.save(deTai);
        return deTai;
    }

    @Override
    public File xuatGiaiTrinhChinhSua(String deTaiId) throws Exception {
        DeTai deTai = getDeTai(deTaiId);
        return wordService.xuatGiaiTrinhChinhSua(deTai);
    }

    @Override
    public DeTai uploadBienBanBanGiaoThietBi(String deTaiId, String fileId) {
        DeTai deTai = getDeTai(deTaiId);
        MyFile myFile = myFileService.getFileInfo(fileId);
        List<String> fileBanGiaoThietBis = deTai.getFileBanGiaoThietBis();
        fileBanGiaoThietBis.add(fileId);
        deTai.setFileBanGiaoThietBis(fileBanGiaoThietBis);
        deTaiRepository.save(deTai);
        return deTai;
    }

    @Override
    public File xuatBienBanBanGiaoThietBi(String deTaiId) throws Exception {
        DeTai deTai = getDeTai(deTaiId);
        return wordService.xuatBienBanBanGiaoThietBi(deTai);
    }

    @Override
    public DeTai uploadDeNghiThanhToan(String deTaiId, String fileId) {
        DeTai deTai = getDeTai(deTaiId);
        MyFile myFile = myFileService.getFileInfo(fileId);
        List<String> fileDeNghiThanhToans = deTai.getFileDeNghiThanhToans();
        fileDeNghiThanhToans.add(fileId);
        deTai.setFileDeNghiThanhToans(fileDeNghiThanhToans);
        deTaiRepository.save(deTai);
        return deTai;
    }

    @Override
    public File xuatDeNghiThanhToan(String deTaiId) throws Exception {
        DeTai deTai = getDeTai(deTaiId);
        return wordService.xuatDeNghiThanhToan(deTai);
    }

    @Override
    public DeTai uploadThanhLiHopDong(String deTaiId, String fileId) {
        DeTai deTai = getDeTai(deTaiId);
        MyFile myFile = myFileService.getFileInfo(fileId);
        List<String> fileThanhLiHopDongs = deTai.getFileThanhLyHopDongs();
        fileThanhLiHopDongs.add(fileId);
        deTai.setFileThanhLyHopDongs(fileThanhLiHopDongs);
        deTai.setTrangThaiDeTai(EnumTrangThaiDeTai.DA_THANH_LY.name());
        deTaiRepository.save(deTai);
        return deTai;
    }

    @Override
    public File xuatThanhLiHopDong(String deTaiId) throws  Exception{
        DeTai deTai = getDeTai(deTaiId);
        return wordService.xuatThanhLiHopDong(deTai);
    }

    @Override
    public Page<DeTai> getByThoiGianQuyTrinhVaTrangThai(String search, DeTaiByThoiGianTrangThaiDto dto, Pageable pageable) {
        return deTaiRepository.getDeTaiByThoiGianQuyTrinhAndTrangThaiDeTaiPaging(vietnameseStringUtils.makeSearchRegex(search), dto.getThoiGianQuyTrinhId(), dto.getTrangThaiDeTais(), pageable);
    }

    @Override
    public DeTai addMaSoDeTaiSauKhiDuyet(String deTaiId, String maSoDeTai) {
        DeTai deTai = getDeTai(deTaiId);
        if(deTai.getTrangThaiDeTai().equals(EnumTrangThaiDeTai.DAT_XET_DUYET.name())){
            deTai.setMaSo(maSoDeTai);
        }else throw new InvalidException("????? t??i kh??ng ?????t x??t duy???t h???i ?????ng");
        deTaiRepository.save(deTai);
        return deTai;
    }

    @Override
    public DeTai changeThoiGianQuyTrinh(String deTaiId, ThoiGianQuyTrinhDto dto) {
        DeTai deTai = getDeTai(deTaiId);
        if(ObjectUtils.isEmpty(dto.getBatDauDangKy())){
            throw new InvalidException("Th???i gian b???t ?????u ????ng k?? kh??ng ????? tr???ng");
        }
        if(ObjectUtils.isEmpty(dto.getBatDauHuongDan())){
            throw new InvalidException("Th???i gian b???t ?????u h?????ng d???n kh??ng ????? tr???ng");
        }
        if(ObjectUtils.isEmpty(dto.getBatDauKiemTraDanhGia())){
            throw new InvalidException("Th???i gian b???t ?????u ki???m tra ????nh gi?? kh??ng ????? tr???ng");
        }
        if(ObjectUtils.isEmpty(dto.getBatDauKyHopDong())){
            throw new InvalidException("Th???i gian b???t ?????u k?? h???p ?????ng kh??ng ????? tr???ng");
        }
        if(ObjectUtils.isEmpty(dto.getBatDauNghiemThu1())){
            throw new InvalidException("Th???i gian b???t ?????u nghi???m thu l???n 1 kh??ng ????? tr???ng");
        }
        if(ObjectUtils.isEmpty(dto.getBatDauNghiemThu2())){
            throw new InvalidException("Th???i gian b???t ?????u b???t ?????u nghi???m thu l???n 2 kh??ng ????? tr???ng");
        }
        if(ObjectUtils.isEmpty(dto.getBatDauThanhQuyetToan())){
            throw new InvalidException("Th???i gian b???t ?????u thanh quy???t to??n kh??ng ????? tr???ng");
        }
        if(ObjectUtils.isEmpty(dto.getBatDauThucHien())){
            throw new InvalidException("Th???i gian b???t ?????u th???c hi???n ????? t??i kh??ng ????? tr???ng");
        }
        if(ObjectUtils.isEmpty(dto.getBatDauXetDuyet())){
            throw new InvalidException("Th???i gian b???t ?????u x??t duy???t kh??ng ????? tr???ng");
        }
        if(ObjectUtils.isEmpty(dto.getKetThucDangKy())){
            throw new InvalidException("Th???i gian k???t th??c ????ng k?? kh??ng ????? tr???ng");
        }
        if(ObjectUtils.isEmpty(dto.getKetThucHuongDan())){
            throw new InvalidException("Th???i gian k???t th??c h?????ng d???n kh??ng ????? tr???ng");
        }
        if(ObjectUtils.isEmpty(dto.getKetThucKiemTraDanhGia())){
            throw new InvalidException("Th???i gian k???t th??c ki???m tra ????nh gi?? kh??ng ????? tr???ng");
        }
        if(ObjectUtils.isEmpty(dto.getKetThucKyHopDong())){
            throw new InvalidException("Th???i gian k???t th??c k?? h???p ?????ng kh??ng ????? tr???ng");
        }
        if(ObjectUtils.isEmpty(dto.getKetThucNghiemThu1())){
            throw new InvalidException("Th???i gian k???t th??c nghi???m thu ?????t 1 kh??ng ????? tr???ng");
        }
        if(ObjectUtils.isEmpty(dto.getKetThucNghiemThu2())){
            throw new InvalidException("Th???i gian k???t th??c nghi???m thu ?????t 2 kh??ng ????? tr???ng");
        }
        if(ObjectUtils.isEmpty(dto.getKetThucThanhQuyetToan())){
            throw new InvalidException("Th???i gian k???t th??c thanh quy???t to??n kh??ng ????? tr???ng");
        }
        if(ObjectUtils.isEmpty(dto.getKetThucThucHien())){
            throw new InvalidException("Th???i gian k???t th??c th???c hi???n kh??ng ????? tr???ng");
        }
        if(ObjectUtils.isEmpty(dto.getKetThucXetDuyet())){
            throw new InvalidException("Th???i gian k???t th??c x??t duy???t kh??ng ????? tr???ng");
        }
        if(ObjectUtils.isEmpty(dto.getNamHoc())){
            throw new InvalidException("N??m h???c kh??ng ????? tr???ng");
        }
        if(ObjectUtils.isEmpty(dto.getYeuCauBoSungThuyetMinh())){
            throw new InvalidException("Th???i gian y??u c???u b??? sung thuy???t minh kh??ng ????? tr???ng");
        }
        ThoiGianQuyTrinh thoiGianQuyTrinh = deTai.getThoiGianQuyTrinh();
        thoiGianQuyTrinh.setNamHoc(dto.getNamHoc());
        thoiGianQuyTrinh.setBatDauHuongDan(dto.getBatDauHuongDan());
        thoiGianQuyTrinh.setKetThucHuongDan(dto.getKetThucHuongDan());
        thoiGianQuyTrinh.setBatDauDangKy(dto.getBatDauDangKy());
        thoiGianQuyTrinh.setKetThucDangKy(dto.getKetThucDangKy());
        thoiGianQuyTrinh.setBatDauKiemTraDanhGia(dto.getBatDauKiemTraDanhGia());
        thoiGianQuyTrinh.setKetThucKiemTraDanhGia(dto.getKetThucKiemTraDanhGia());
        thoiGianQuyTrinh.setBatDauXetDuyet(dto.getBatDauXetDuyet());
        thoiGianQuyTrinh.setKetThucXetDuyet(dto.getKetThucXetDuyet());
        thoiGianQuyTrinh.setBatDauKyHopDong(dto.getBatDauKyHopDong());
        thoiGianQuyTrinh.setKetThucKyHopDong(dto.getKetThucKyHopDong());
        thoiGianQuyTrinh.setBatDauThucHien(dto.getBatDauThucHien());
        thoiGianQuyTrinh.setYeuCauBoSungThuyetMinh(dto.getYeuCauBoSungThuyetMinh());
        thoiGianQuyTrinh.setKetThucThucHien(dto.getKetThucThucHien());
        thoiGianQuyTrinh.setBatDauNghiemThu1(dto.getBatDauNghiemThu1());
        thoiGianQuyTrinh.setKetThucNghiemThu1(dto.getKetThucNghiemThu1());
        thoiGianQuyTrinh.setBatDauNghiemThu2(dto.getBatDauNghiemThu2());
        thoiGianQuyTrinh.setKetThucNghiemThu2(dto.getKetThucNghiemThu2());
        thoiGianQuyTrinh.setBatDauThanhQuyetToan(dto.getBatDauThanhQuyetToan());
        thoiGianQuyTrinh.setKetThucThanhQuyetToan(dto.getKetThucThanhQuyetToan());
        deTai.setThoiGianQuyTrinh(thoiGianQuyTrinh);
        deTaiRepository.save(deTai);
        return deTai;
    }

    @Override
    public DeTai uploadBienBanKiemTraTinhHinhThucHien(String deTaiId, String fileId) {
        DeTai deTai = getDeTai(deTaiId);
        MyFile myFile = myFileService.getFileInfo(fileId);
        List<String> fileBienBanKiemTraThucHiens = deTai.getFileBienBanKiemTraThucHiens();
        fileBienBanKiemTraThucHiens.add(fileId);
        deTai.setFileBienBanKiemTraThucHiens(fileBienBanKiemTraThucHiens);
        deTaiRepository.save(deTai);
        return deTai;
    }

    @Override
    public File xuatBienBanKiemTraTinhHinhThucHien(String deTaiId) throws Exception {
        DeTai deTai = getDeTai(deTaiId);
        return wordService.xuatKiemTraTinhHinhThucHien(deTai);
    }

    @Override
    public Page<DeTai> getDeTaIByListId(String search, List<String> deTaiIds, Pageable pageable) {
        return deTaiRepository.getDeTaiByListId(vietnameseStringUtils.makeSearchRegex(search), deTaiIds, pageable);
    }


    @Override
    public File xuatDeXuatDeTai(String deTaiId) throws Exception{
        DeTai deTai = getDeTai(deTaiId);
        return wordService.xuatDeXuatDeTai(deTai);
    }


    @Override
    public File xuatThuyetMinhDeTai(String deTaiId) throws Exception{
        DeTai deTai = getDeTai(deTaiId);
        return wordService.xuatThuyetMinhDeTai(deTai);
    }

    @Override
    public File xuatHopDongThucHien(String deTaiId) throws Exception{
        DeTai deTai = getDeTai(deTaiId);
        if(!deTai.getTrangThaiDeTai().equals(EnumTrangThaiDeTai.DAT_XET_DUYET.name()) && !deTai.getTrangThaiDeTai().equals(EnumTrangThaiDeTai.KY_HOP_DONG.name())){
            throw new InvalidException("????? t??i ch??a ?????t x??t duy???t kh??ng th??? xu???t file h???p ?????ng");
        }
        CauHinhBieuMau cauHinhBieuMau = cauHinhBieuMauService.getCauHinhCore();
        return wordService.xuatHopDongThucHienDeTai(deTai, cauHinhBieuMau);
    }

    private SanPhamDuKien getSanPhamDuKienFromDto(SanPhamDuKienDto dto) {
        SanPhamDuKien sanPhamDuKien = new SanPhamDuKien();
        sanPhamDuKien.setSanPhamKhoaHoc(dto.getSanPhamKhoaHoc());
        sanPhamDuKien.setSanPhamDaoTao(dto.getSanPhamDaoTao());
        sanPhamDuKien.setSanPhamUngDung(dto.getSanPhamUngDung());
        sanPhamDuKien.setSanPhamKhac(dto.getSanPhamKhac());
        return sanPhamDuKien;
    }

    private KinhPhiDuKien getKinhPhiDuKienFromDto(KinhPhiDuKienDto dto) {
        KinhPhiDuKien kinhPhiDuKien = new KinhPhiDuKien();
        kinhPhiDuKien.setTongKinhPhi(dto.getTongKinhPhi());
        kinhPhiDuKien.setNganSachNhaNuoc(dto.getNganSachNhaNuoc());
        kinhPhiDuKien.setNguonKinhPhiKhac(dto.getNguonKinhPhiKhac());
        return kinhPhiDuKien;
    }

    private TienDoThucHien getTienDoThucHienFromDto(TienDoThucHienDto dto) {
        TienDoThucHien tienDoThucHien = new TienDoThucHien();
        tienDoThucHien.setNoiDung(dto.getNoiDung());
        tienDoThucHien.setSanPham(dto.getSanPham());
        tienDoThucHien.setThoiGian(dto.getThoiGian());
        tienDoThucHien.setNguoiThucHien(dto.getNguoiThucHien());
        return tienDoThucHien;
    }

    private ThanhVienCungThamGia getThanhVienCungThamGiaFromDto(ThanhVienCungThamGiaDto dto) {
        ThanhVienCungThamGia thanhVienCungThamGia = new ThanhVienCungThamGia();
        thanhVienCungThamGia.setHoTen(dto.getHoTen());
        thanhVienCungThamGia.setDonViCongTac(dto.getDonViCongTac());
        LinhVuc linhVuc = linhVucRepository.findByIdAndTrangThaiIsTrue(dto.getLinhVucId())
                .orElseThrow(() -> new NotFoundException(String.format("Kh??ng t??m th???y l??nh v???c v???i id: %s", dto.getLinhVucId())));
        thanhVienCungThamGia.setLinhVucChuyenMon(linhVuc);
        thanhVienCungThamGia.setNoiDungDuocGiaos(dto.getNoiDungDuocGiaos());
        return thanhVienCungThamGia;
    }

    private DonViPhoiHop getDonViPhoiHopFromDto(DonViPhoiHopDto dto) {
        DonViPhoiHop donViPhoiHop = new DonViPhoiHop();
        donViPhoiHop.setTenDonVi(dto.getTenDonVi());
        donViPhoiHop.setNoiDungPhoiHop(dto.getNoiDungPhoiHop());
        donViPhoiHop.setDaiDienDonVi(dto.getDaiDienDonVi());
        return donViPhoiHop;
    }

    private ChiTietSanPham getChiTietSanPhamFromDto(ChiTietSanPhamDto dto) {
        ChiTietSanPham chiTietSanPham = new ChiTietSanPham();
        SanPham sanPham = sanPhamRepository.findByIdAndTrangThaiIsTrue(dto.getSanPhamId())
                .orElseThrow(() -> new NotFoundException(String.format("Kh??ng t??m th???y s???n ph???m v???i id: %s", dto.getSanPhamId())));
        chiTietSanPham.setSanPham(sanPham);
        chiTietSanPham.setSoLuong(dto.getSoLuong());
        chiTietSanPham.setYeuCauKhoaHocDatDuoc(dto.getYeuCauKhoaHocDatDuoc());
        return chiTietSanPham;
    }

    private ChiTietSanPhamBM07 getChiTietSanPhamBM07FromDto(ChiTietSanPhamBM07Dto dto) {
        ChiTietSanPhamBM07 chiTietSanPhamBM07 = new ChiTietSanPhamBM07();
        SanPham sanPham = sanPhamService.getSanPham(dto.getSanPhamId());
        chiTietSanPhamBM07.setSanPhamTheoThuyetMinh(sanPham);
        chiTietSanPhamBM07.setSanPhamDaDatDuoc(dto.getSanPhamDaDatDuoc());
        chiTietSanPhamBM07.setTuDanhGia(dto.getTuDanhGia());
        return chiTietSanPhamBM07;
    }

    private ChiTietSanPhamKhacBM07 getChiTietSanPhamKhacBM07FromDto(ChiTietSanPhamKhacBM07Dto dto) {
        ChiTietSanPhamKhacBM07 chiTietSanPhamKhacBM07 = new ChiTietSanPhamKhacBM07();
        chiTietSanPhamKhacBM07.setSanPhamTheoThuyetMinh(dto.getSanPham());
        chiTietSanPhamKhacBM07.setSanPhamTheoThuyetMinhEn(dto.getSanPhamEn());
        chiTietSanPhamKhacBM07.setSanPhamDaDatDuoc(dto.getSanPhamDaDatDuoc());
        chiTietSanPhamKhacBM07.setTuDanhGia(dto.getTuDanhGia());
        return chiTietSanPhamKhacBM07;
    }

    private GiaiTrinhChinhSua getGiaiTrinhChinhSuaFromDto(GiaiTrinhChinhSuaDto dto) {
        GiaiTrinhChinhSua giaiTrinhChinhSua = new GiaiTrinhChinhSua();
        giaiTrinhChinhSua.setNoiDungGopY(dto.getNoiDungGopY());
        giaiTrinhChinhSua.setKetQuaChinhSuaBoSung(dto.getKetQuaChinhSuaBoSung());
        giaiTrinhChinhSua.setGhiChu(dto.getGhiChu());
        return giaiTrinhChinhSua;
    }

    private ChiTietSanPhamKhac getChiTietSanPhamKhacFromDto(ChiTietSanPhamKhacDto dto) {
        ChiTietSanPhamKhac chiTietSanPhamKhac = new ChiTietSanPhamKhac();
        chiTietSanPhamKhac.setSanPham(dto.getSanPham());
        chiTietSanPhamKhac.setSanPhamEn(dto.getSanPhamEn());
        chiTietSanPhamKhac.setSoLuong(dto.getSoLuong());
        chiTietSanPhamKhac.setYeuCauKhoaHocDatDuoc(dto.getYeuCauKhoaHocDatDuoc());
        return chiTietSanPhamKhac;
    }

    private ChiTietKhoanChi getChiTietKhoanChiFromDto(ChiTietKhoanChiDto dto) {
        ChiTietKhoanChi chiTietKhoanChi = new ChiTietKhoanChi();
        chiTietKhoanChi.setNoiDungChi(dto.getNoiDungChi());
        chiTietKhoanChi.setDuKienKetQua(dto.getDuKienKetQua());
        chiTietKhoanChi.setThoiGian(dto.getThoiGian());
        chiTietKhoanChi.setDonViTinh(dto.getDonViTinh());
        chiTietKhoanChi.setSoLuong(dto.getSoLuong());
        chiTietKhoanChi.setDonGia(dto.getDonGia());
        chiTietKhoanChi.setThanhTien(dto.getThanhTien());
        chiTietKhoanChi.setTongKinhPhi(dto.getTongKinhPhi());
        chiTietKhoanChi.setNganSachNhaNuoc(dto.getNganSachNhaNuoc());
        chiTietKhoanChi.setNguonKinhPhiKhac(dto.getNguonKinhPhiKhac());
        chiTietKhoanChi.setGhiChu(dto.getGhiChu());
        return chiTietKhoanChi;
    }

    private ChiTietKinhPhiDuKien getChiTietKinhPhiDuKienFromDto(ChiTietKinhPhiDuKienDto dto) {
        ChiTietKinhPhiDuKien chiTietKinhPhiDuKien = new ChiTietKinhPhiDuKien();
        LoaiKinhPhi loaiKinhPhi = loaiKinhPhiRepository.findById(dto.getLoaiKinhPhiId())
                .orElseThrow(() -> new NotFoundException(String.format("Kh??ng t??m th???y lo???i kinh ph?? v???i id: %s", dto.getLoaiKinhPhiId())));
        chiTietKinhPhiDuKien.setLoaiKinhPhi(loaiKinhPhi);
        chiTietKinhPhiDuKien.setThuTu(dto.getThuTu());
        chiTietKinhPhiDuKien.setNganSachNhaNuoc(dto.getNganSachNhaNuoc());
        chiTietKinhPhiDuKien.setNguonKinhPhiKhac(dto.getNguonKinhPhiKhac());
        chiTietKinhPhiDuKien.setTongKinhPhi(dto.getTongKinhPhi());
        chiTietKinhPhiDuKien.setGhiChu(dto.getGhiChu());
        if (dto.getChiTietKhoanChis() != null) {
            List<ChiTietKhoanChi> chiTietKhoanChis = new ArrayList<>();
            for (ChiTietKhoanChiDto chiTietKhoanChiDto : dto.getChiTietKhoanChis()) {
                chiTietKhoanChis.add(getChiTietKhoanChiFromDto(chiTietKhoanChiDto));
            }
            chiTietKinhPhiDuKien.setChiTietKhoanChis(chiTietKhoanChis);
        }
        return chiTietKinhPhiDuKien;
    }

    private TongQuanTinhHinhNghienCuu getTongQuanTinhHinhNghienCuuFromDto(TongQuanTinhHinhNghienCuuDto dto) {
        TongQuanTinhHinhNghienCuu tongQuanTinhHinhNghienCuu = new TongQuanTinhHinhNghienCuu();
        tongQuanTinhHinhNghienCuu.setTinhHinhTrongNuoc(dto.getTinhHinhTrongNuoc());
        tongQuanTinhHinhNghienCuu.setTinhHinhNgoaiNuoc(dto.getTinhHinhNgoaiNuoc());
        tongQuanTinhHinhNghienCuu.setThanhTuu(dto.getThanhTuu());
        return tongQuanTinhHinhNghienCuu;
    }

}
