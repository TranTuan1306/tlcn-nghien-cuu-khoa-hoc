package com.stc.nghiencuukhoahoc.services.hoidongnghiemthu;

import com.stc.nghiencuukhoahoc.clients.HrmServiceClient;
import com.stc.nghiencuukhoahoc.dtos.hoidongnghiemthu.*;
import com.stc.nghiencuukhoahoc.entities.DeTai;
import com.stc.nghiencuukhoahoc.entities.HoiDongNghiemThu;
import com.stc.nghiencuukhoahoc.entities.MyFile;
import com.stc.nghiencuukhoahoc.entities.embeded.NhanVienEd;
import com.stc.nghiencuukhoahoc.entities.embeded.ThanhVienHoiDongNghiemThu;
import com.stc.nghiencuukhoahoc.exceptions.InvalidException;
import com.stc.nghiencuukhoahoc.exceptions.NotFoundException;
import com.stc.nghiencuukhoahoc.repositories.DeTaiRepository;
import com.stc.nghiencuukhoahoc.repositories.HoiDongNghiemThuRepository;
import com.stc.nghiencuukhoahoc.services.detai.DeTaiService;
import com.stc.nghiencuukhoahoc.services.fileservice.MyFileService;
import com.stc.nghiencuukhoahoc.services.hocham.HocHamService;
import com.stc.nghiencuukhoahoc.services.hocvi.HocViService;
import com.stc.nghiencuukhoahoc.services.nhanvien.NhanVienService;
import com.stc.nghiencuukhoahoc.services.thoigianquytrinh.ThoiGianQuyTrinhService;
import com.stc.nghiencuukhoahoc.services.word.WordService;
import com.stc.nghiencuukhoahoc.utils.EnumTrangThaiDeTai;
import com.stc.nghiencuukhoahoc.utils.EnumTrangThaiHoiDong;
import com.stc.nghiencuukhoahoc.utils.EnumXepLoai;
import com.stc.vietnamstringutils.VietnameseStringUtils;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.*;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import java.io.File;


import java.util.ArrayList;
import java.util.List;

import static org.springframework.data.mongodb.core.aggregation.Aggregation.*;

/**
 * Created by: IntelliJ IDEA
 * User: vlong
 * Date: 19/5/2021
 * Time: 11:06 AM
 * Filename: HoiDongNghiemThuServiceImpl
 */
@Service
@Slf4j
public class HoiDongNghiemThuServiceImpl implements HoiDongNghiemThuService{

    private final HoiDongNghiemThuRepository hoiDongNghiemThuRepository;

    private final DeTaiRepository deTaiRepository;

    private final MyFileService myFileService;

    private final HrmServiceClient hrmServiceClient;

    private final HocHamService hocHamService;

    private final HocViService hocViService;

    private final DeTaiService deTaiService;

    private final WordService wordService;

    private final ThoiGianQuyTrinhService thoiGianQuyTrinhService;

    private final VietnameseStringUtils vietnameseStringUtils;

    private final MongoTemplate mongoTemplate;

    private final NhanVienService nhanVienService;

    public HoiDongNghiemThuServiceImpl(HoiDongNghiemThuRepository hoiDongNghiemThuRepository, DeTaiRepository deTaiRepository, MyFileService myFileService, HrmServiceClient hrmServiceClient, HocHamService hocHamService, HocViService hocViService, DeTaiService deTaiService, WordService wordService, ThoiGianQuyTrinhService thoiGianQuyTrinhService, VietnameseStringUtils vietnameseStringUtils, MongoTemplate mongoTemplate, NhanVienService nhanVienService) {
        this.hoiDongNghiemThuRepository = hoiDongNghiemThuRepository;
        this.deTaiRepository = deTaiRepository;
        this.myFileService = myFileService;
        this.hrmServiceClient = hrmServiceClient;
        this.hocHamService = hocHamService;
        this.hocViService = hocViService;
        this.deTaiService = deTaiService;
        this.wordService = wordService;
        this.thoiGianQuyTrinhService = thoiGianQuyTrinhService;
        this.vietnameseStringUtils = vietnameseStringUtils;
        this.mongoTemplate = mongoTemplate;
        this.nhanVienService = nhanVienService;
    }



    @Override
    public HoiDongNghiemThu updateDeXuatThanhVienHoiDongNghiemThu(String hoiDongNghiemThuId, List<ThanhVienHoiDongNghiemThuDto> thanhVienHoiDongNghiemThuDtos) {
        HoiDongNghiemThu hoiDongNghiemThu = getHoiDongNghiemThu(hoiDongNghiemThuId);
        List<ThanhVienHoiDongNghiemThu> thanhVienHoiDongNghiemThus = new ArrayList<>();
        for(ThanhVienHoiDongNghiemThuDto thanhVienHoiDongNghiemThuDto : thanhVienHoiDongNghiemThuDtos){
            if(ObjectUtils.isEmpty(thanhVienHoiDongNghiemThuDto.getHoTen())){
                throw new InvalidException("H??? t??n kh??ng ????? tr???ng");
            }
            if(ObjectUtils.isEmpty(thanhVienHoiDongNghiemThuDto.getHocHamId())){
                throw new InvalidException("H???c h??m kh??ng ????? tr???ng");
            }
            if(ObjectUtils.isEmpty(thanhVienHoiDongNghiemThuDto.getHocViId())){
                throw new InvalidException("H???c v??? kh??ng ????? tr???ng");
            }
            if(ObjectUtils.isEmpty(thanhVienHoiDongNghiemThuDto.getChuyenMon())){
                throw new InvalidException("Chuy??n m??n kh??ng ????? tr???ng");
            }
            if(ObjectUtils.isEmpty(thanhVienHoiDongNghiemThuDto.getDonViCongTac())){
                throw new InvalidException("????n v??? c??ng t??c kh??ng ????? tr???ng");
            }
            if(ObjectUtils.isEmpty(thanhVienHoiDongNghiemThuDto.getEmail())){
                throw new InvalidException("Email kh??ng ????? tr???ng");
            }
            if(ObjectUtils.isEmpty(thanhVienHoiDongNghiemThuDto.getSoDienThoai())){
                throw new InvalidException("S??? ??i???n tho???i kh??ng ????? tr???ng");
            }
            if(ObjectUtils.isEmpty(thanhVienHoiDongNghiemThuDto.getNhiemVuHoiDong())){
                throw new InvalidException("Nhi???m v??? kh??ng ????? tr???ng");
            }
            ThanhVienHoiDongNghiemThu thanhVienHoiDongNghiemThu = mapThanhVienDoiDongDtoToThanhVienHoiDong(thanhVienHoiDongNghiemThuDto);
            thanhVienHoiDongNghiemThus.add(thanhVienHoiDongNghiemThu);
        }
        hoiDongNghiemThu.setThanhVienHoiDongs(thanhVienHoiDongNghiemThus);
        hoiDongNghiemThu.setTrangThaiDuyetHoiDong(EnumTrangThaiHoiDong.DE_XUAT_THANH_VIEN.name());
        hoiDongNghiemThuRepository.save(hoiDongNghiemThu);
        return hoiDongNghiemThu;
    }

    @Override
    public HoiDongNghiemThu updateThanhVienHoiDongNghiemThu(String hoiDongNghiemThuId, List<ThanhVienHoiDongNghiemThuDto> thanhVienHoiDongNghiemThuDtos) {
        HoiDongNghiemThu hoiDongNghiemThu = getHoiDongNghiemThu(hoiDongNghiemThuId);
        List<ThanhVienHoiDongNghiemThu> thanhVienHoiDongNghiemThus = new ArrayList<>();
        for(ThanhVienHoiDongNghiemThuDto thanhVienHoiDongNghiemThuDto : thanhVienHoiDongNghiemThuDtos){
            if(ObjectUtils.isEmpty(thanhVienHoiDongNghiemThuDto.getHoTen())){
                throw new InvalidException("H??? t??n kh??ng ????? tr???ng");
            }
            if(ObjectUtils.isEmpty(thanhVienHoiDongNghiemThuDto.getHocHamId())){
                throw new InvalidException("H???c h??m kh??ng ????? tr???ng");
            }
            if(ObjectUtils.isEmpty(thanhVienHoiDongNghiemThuDto.getHocViId())){
                throw new InvalidException("H???c v??? kh??ng ????? tr???ng");
            }
            if(ObjectUtils.isEmpty(thanhVienHoiDongNghiemThuDto.getChuyenMon())){
                throw new InvalidException("Chuy??n m??n kh??ng ????? tr???ng");
            }
            if(ObjectUtils.isEmpty(thanhVienHoiDongNghiemThuDto.getDonViCongTac())){
                throw new InvalidException("????n v??? c??ng t??c kh??ng ????? tr???ng");
            }
            if(ObjectUtils.isEmpty(thanhVienHoiDongNghiemThuDto.getEmail())){
                throw new InvalidException("Email kh??ng ????? tr???ng");
            }
            if(ObjectUtils.isEmpty(thanhVienHoiDongNghiemThuDto.getSoDienThoai())){
                throw new InvalidException("S??? ??i???n tho???i kh??ng ????? tr???ng");
            }
            if(ObjectUtils.isEmpty(thanhVienHoiDongNghiemThuDto.getNhiemVuHoiDong())){
                throw new InvalidException("Nhi???m v??? kh??ng ????? tr???ng");
            }
            ThanhVienHoiDongNghiemThu thanhVienHoiDongNghiemThu = mapThanhVienDoiDongDtoToThanhVienHoiDong(thanhVienHoiDongNghiemThuDto);
            thanhVienHoiDongNghiemThus.add(thanhVienHoiDongNghiemThu);
        }
        hoiDongNghiemThu.setThanhVienHoiDongs(thanhVienHoiDongNghiemThus);
        hoiDongNghiemThu.setTrangThaiDuyetHoiDong(EnumTrangThaiHoiDong.DA_DUYET_THANH_VIEN.name());
        hoiDongNghiemThuRepository.save(hoiDongNghiemThu);
        return hoiDongNghiemThu;
    }

    @Override
    public HoiDongNghiemThu getHoiDongNghiemThu(String hoiDongNghiemThuId) {
        return hoiDongNghiemThuRepository.findById(hoiDongNghiemThuId).orElseThrow(
                () -> new NotFoundException(String.format("Kh??ng t??m th???y h???i ?????ng v???i id: %s", hoiDongNghiemThuId)));
    }

    @Override
    public HoiDongNghiemThu uploadPhieuNhanXetVaPhanBienCuaThanhVienHoiDong(String hoiDongNghiemThuId, NhanXetPhanBienDto nhanXetPhanBienDto){
        HoiDongNghiemThu hoiDongNghiemThu = getHoiDongNghiemThu(hoiDongNghiemThuId);
        if(ObjectUtils.isEmpty(nhanXetPhanBienDto.getEmail())){
            throw new InvalidException("Email kh??ng ???????c ????? tr???ng");
        }
        if(ObjectUtils.isEmpty(nhanXetPhanBienDto.getFilePhieuDiemHoiDong())){
            throw new InvalidException("Phi???u ??i???m h???i ?????ng kh??ng ????? tr???ng");
        }
        if(ObjectUtils.isEmpty(nhanXetPhanBienDto.getFileNhanXetPhanBien())){
            throw new InvalidException("File nh???n x??t ph???n bi???n kh??ng ????? tr???ng");
        }
        if(ObjectUtils.isEmpty(nhanXetPhanBienDto.getTongDiem()) ||  nhanXetPhanBienDto.getTongDiem() >100){
            throw new InvalidException("T???ng ??i???m kh??ng ???????c ????? tr???ng ho???c l???n h??n 100");
        }
        MyFile fileNXPB = myFileService.getFileInfo(nhanXetPhanBienDto.getFileNhanXetPhanBien());
        MyFile filePDHD = myFileService.getFileInfo(nhanXetPhanBienDto.getFilePhieuDiemHoiDong());
        List<ThanhVienHoiDongNghiemThu> thanhVienHoiDongNghiemThus = hoiDongNghiemThu.getThanhVienHoiDongs();
        for(ThanhVienHoiDongNghiemThu thanhVienHoiDongNghiemThu : thanhVienHoiDongNghiemThus){
           if(thanhVienHoiDongNghiemThu.getEmail().equals(nhanXetPhanBienDto.getEmail())){
               thanhVienHoiDongNghiemThu.setFileNhanXetPhanBien(nhanXetPhanBienDto.getFileNhanXetPhanBien());
               thanhVienHoiDongNghiemThu.setFilePhieuDiemHoiDong(nhanXetPhanBienDto.getFilePhieuDiemHoiDong());
               thanhVienHoiDongNghiemThu.setTongDiem(nhanXetPhanBienDto.getTongDiem());
           }
        }
        hoiDongNghiemThu.setThanhVienHoiDongs(thanhVienHoiDongNghiemThus);
        hoiDongNghiemThuRepository.save(hoiDongNghiemThu);
        return hoiDongNghiemThu;
    }

    @Override
    public String createListHoiDongWithChuTichThuKyByListDeTai(ChuTichThuKyDeTaiDto dto) {
        if(ObjectUtils.isEmpty(dto.getDeTaiIds())){
            throw new InvalidException("Danh s??c ????? t??i kh??ng ????? tr???ng");
        }
        if(ObjectUtils.isEmpty(dto.getThanhVienHoiDongNghiemThuDtos())){
            throw new InvalidException("Ch??? t???ch - th?? k?? kh??ng ????? tr???ng");
        }
        List<ThanhVienHoiDongNghiemThu> thanhVienHoiDongNghiemThus = new ArrayList<>();
        for(ThanhVienHoiDongNghiemThuDto thanhVienHoiDongNghiemThuDto : dto.getThanhVienHoiDongNghiemThuDtos()){
            ThanhVienHoiDongNghiemThu thanhVienHoiDongNghiemThu = mapThanhVienDoiDongDtoToThanhVienHoiDong(thanhVienHoiDongNghiemThuDto);
            thanhVienHoiDongNghiemThus.add(thanhVienHoiDongNghiemThu);
        }
        for(String deTaiId : dto.getDeTaiIds()){
            HoiDongNghiemThu hoiDongNghiemThu = new HoiDongNghiemThu();
            hoiDongNghiemThu.setDeTai(deTaiService.getDeTai(deTaiId));
            hoiDongNghiemThu.setThanhVienHoiDongs(thanhVienHoiDongNghiemThus);
            hoiDongNghiemThu.setThoiGianQuyTrinh(thoiGianQuyTrinhService.getThoiGianQuyTrinh(dto.getThoiGianQuyTrinhId()));
            hoiDongNghiemThu.setTrangThaiDuyetHoiDong(EnumTrangThaiHoiDong.KHOI_TAO.name());
            hoiDongNghiemThuRepository.save(hoiDongNghiemThu);

            DeTai deTai = deTaiService.getDeTai(deTaiId);
            deTai.setTrangThaiDeTai(EnumTrangThaiDeTai.NGHIEM_THU.name());
            deTaiRepository.save(deTai);
        }
        String successMessage = "???? t???o th??nh c??ng h???i ?????ng cho c??c ????? t??i";
        return successMessage;
    }

    @Override
    public HoiDongNghiemThu updateHoiDongNghiemThu(String hoiDongId, HoiDongNghiemThuDto dto) {
        HoiDongNghiemThu hoiDongNghiemThu = getHoiDongNghiemThu(hoiDongId);
        if(ObjectUtils.isEmpty(dto.getTenHoiDong())){
            throw new InvalidException("T??n h???i ?????ng kh??ng ????? tr???ng");
        }
        if(ObjectUtils.isEmpty(dto.getSoQuyetDinh())){
            throw new InvalidException("S??? quy???t ?????nh kh??ng ????? tr???ng");
        }
        if(ObjectUtils.isEmpty(dto.getNgayQuyetDinh())){
            throw new InvalidException("Ng??y quy???t ?????nh kh??ng ???? tr???ng");
        }
        if(ObjectUtils.isEmpty(dto.getNgayHop())){
            throw new InvalidException("Ng??y h???p kh??ng ????? tr???ng");
        }
        if(ObjectUtils.isEmpty(dto.getDiaDiem())){
            throw new InvalidException("?????a ??i???m kh??ng ????? tr???ng");
        }
        if(ObjectUtils.isEmpty(dto.getKhachMoi())){
            throw new InvalidException("Kh??ch m???i kh??ng ????? tr???ng");
        }
        hoiDongNghiemThu.setTenHoiDong(dto.getTenHoiDong());
        hoiDongNghiemThu.setSoQuyetDinh(dto.getSoQuyetDinh());
        hoiDongNghiemThu.setNgayQuyetDinh(dto.getNgayQuyetDinh());
        hoiDongNghiemThu.setNgayHop(dto.getNgayHop());
        hoiDongNghiemThu.setDiaDiem(dto.getDiaDiem());
        hoiDongNghiemThu.setKhachMoi(dto.getKhachMoi());
        hoiDongNghiemThuRepository.save(hoiDongNghiemThu);
        return hoiDongNghiemThu;
    }

    @Override
    public File xuatDeXuatThanhVienHoiDongNghiemThu(String hoiDongNghiemThuId) throws Exception {
        HoiDongNghiemThu hoiDongNghiemThu = getHoiDongNghiemThu(hoiDongNghiemThuId);
        return wordService.xuatDeXuatThanhVienHoiDongNghiemThu(hoiDongNghiemThu);
    }

    @Override
    public File xuatPhieuDanhGiaNghiemThu(String hoiDongNghiemThuId) throws Exception {
        HoiDongNghiemThu hoiDongNghiemThu = getHoiDongNghiemThu(hoiDongNghiemThuId);
        return wordService.xuatPhieuDanhGiaNghiemThu(hoiDongNghiemThu);
    }

    @Override
    public File xuatBienBanHopDongDanhGiaNghiemThu(String hoiDongNghiemThuId) throws Exception {
        HoiDongNghiemThu hoiDongNghiemThu = getHoiDongNghiemThu(hoiDongNghiemThuId);
        return wordService.xuatBienBanHopHoiDongNghiemThu(hoiDongNghiemThu);
    }

    @Override
    public File xuatPhieuNhanXetPhanBienNghiemThu(String hoiDongNghiemThuId) throws Exception {
        HoiDongNghiemThu hoiDongNghiemThu = getHoiDongNghiemThu(hoiDongNghiemThuId);
        return wordService.xuatPhieuNhanXetPhanBien(hoiDongNghiemThu);
    }

    @Override
    public HoiDongNghiemThu uploadBienBanHoiDongNghiemThu(String hoiDongNghiemThuId, BienBanHoiDongDto dto) {
        HoiDongNghiemThu hoiDongNghiemThu = getHoiDongNghiemThu(hoiDongNghiemThuId);
        if(ObjectUtils.isEmpty(dto.getFileBienBanHoiDong())){
            throw new InvalidException("File bi??n b???n h???p ?????ng kh??ng ????? tr???ng");
        }
        if(ObjectUtils.isEmpty(dto.getDiemTrungBinhCuoi())){
            throw new InvalidException("??i???m trung b??nh cu???i kh??ng b??? tr???ng");
        }
        String xepLoai = "";
        if(dto.getDiemTrungBinhCuoi()<50){
            xepLoai = EnumXepLoai.KHONG_DAT.name();
        }else if(dto.getDiemTrungBinhCuoi()>=50 && dto.getDiemTrungBinhCuoi()<=69){
            xepLoai = EnumXepLoai.DAT.name();
        }else if(dto.getDiemTrungBinhCuoi()>=70 && dto.getDiemTrungBinhCuoi()<=84){
            xepLoai = EnumXepLoai.KHA.name();
        }else if(dto.getDiemTrungBinhCuoi()>=85 && dto.getDiemTrungBinhCuoi()<=94){
            xepLoai = EnumXepLoai.TOT.name();
        }else xepLoai = EnumXepLoai.XUAT_SAC.name();
        hoiDongNghiemThu.setDiemTrungBinhCuoi(dto.getDiemTrungBinhCuoi());
        hoiDongNghiemThu.setFileBienBanHoiDong(dto.getFileBienBanHoiDong());
        hoiDongNghiemThu.setXepLoai(xepLoai);
        hoiDongNghiemThuRepository.save(hoiDongNghiemThu);

        DeTai deTai = deTaiService.getDeTai(hoiDongNghiemThu.getDeTai().getId());
        if(hoiDongNghiemThu.getXepLoai().equals(EnumXepLoai.KHONG_DAT.name())){
            deTai.setTrangThaiDeTai(EnumTrangThaiDeTai.KHONG_DAT_NGHIEM_THU.name());
        }else deTai.setTrangThaiDeTai(EnumTrangThaiDeTai.DAT_NGHIEM_THU.name());
        deTaiRepository.save(deTai);
        return hoiDongNghiemThu;
    }

    @Override
    public Page<HoiDongNghiemThu> getHoiDongNghiemThuByTDVPaging(String search, String thoiGianQuyTrinhId, String email, String trangThaiDuyetHoiDong, Pageable pageable) {
        NhanVienEd nhanVienEd = nhanVienService.getByEmail(email);
        Criteria thoiGianQuyTrinhCriteria = new Criteria();
        Criteria trangThaiDuyetHoiDongCriteria = new Criteria();
        Criteria donViCriteria = new Criteria();
        Criteria searchCriteria = new Criteria();
        thoiGianQuyTrinhCriteria.and("thoiGianQuyTrinh.$id").is(new ObjectId(thoiGianQuyTrinhId));
        trangThaiDuyetHoiDongCriteria.and("trangThaiDuyetHoiDong").is(trangThaiDuyetHoiDong);
        donViCriteria.and("deTais.donViId").is(nhanVienEd.getDonViId());
        searchCriteria.orOperator(Criteria.where("deTais.tenDeTai").regex(vietnameseStringUtils.makeSearchRegex(search),"i"),
                Criteria.where("tenHoiDong").regex(vietnameseStringUtils.makeSearchRegex(search),"i"));

        Criteria checkCriteria = new Criteria();
        checkCriteria.andOperator(searchCriteria, donViCriteria, trangThaiDuyetHoiDongCriteria,thoiGianQuyTrinhCriteria);

        ProjectionOperation projectionOperation = Aggregation.project("tenHoiDong",
                "soQuyetDinh", "ngayQuyetDinh", "ngayHop", "diaDiem",
                "deTai", "thanhVienHoiDongs", "khachMoi", "diemTrungBinhCuoi", "xepLoai", "fileBienBanHoiDong", "fileGioiThieuThanhVien", "trangThaiDuyetHoiDong" ,"thoiGianQuyTrinh")
                .and(ConvertOperators.ToObjectId.toObjectId("$deTai.$id")).as("deTaiId");
        LookupOperation lookupDeTaiOperation = lookup(
                "de-tai",
                "deTaiId",
                "_id",
                "deTais");
        MatchOperation matchOperation = match(checkCriteria);
        SkipOperation skipOperation = new SkipOperation((long) pageable.getPageNumber() * pageable.getPageSize());
        SortOperation sortOperation = sort(pageable.getSort());
        FacetOperation facetOperation = facet(
                count().as("total")).as("total")
                .and(skipOperation, limit(pageable.getPageSize())
                ).as("metaData");
        Aggregation aggregation = newAggregation(
                projectionOperation,
                lookupDeTaiOperation,
                matchOperation,
                sortOperation,
                facetOperation
        );
        AggregationResults<PageHoiDongNghiemThuTransfer> aggregate = mongoTemplate.aggregate(aggregation,
                HoiDongNghiemThu.class,
                PageHoiDongNghiemThuTransfer.class);
        List<PageHoiDongNghiemThuTransfer> mappedResults = aggregate.getMappedResults();
        if (mappedResults.get(0).getTotal().size() == 0) {
            return new PageImpl<>(new ArrayList<>(), pageable, 0);
        }
        return new PageImpl<>(mappedResults.get(0).getMetaData(), pageable, mappedResults.get(0).getTotal().get(0).getTotal());
    }

    @Override
    public Page<HoiDongNghiemThu> getHoiDongNghiemThuPaging(String search, String thoiGianQuyTrinhId, String trangThaiDuyetHoiDong, Pageable pageable) {
        Criteria thoiGianQuyTrinhCriteria = new Criteria();
        Criteria trangThaiDuyetHoiDongCriteria = new Criteria();
        Criteria searchCriteria = new Criteria();
        thoiGianQuyTrinhCriteria.and("thoiGianQuyTrinh.$id").is(new ObjectId(thoiGianQuyTrinhId));
        trangThaiDuyetHoiDongCriteria.and("trangThaiDuyetHoiDong").is(trangThaiDuyetHoiDong);
        searchCriteria.orOperator(Criteria.where("deTais.tenDeTai").regex(vietnameseStringUtils.makeSearchRegex(search),"i"),
                Criteria.where("tenHoiDong").regex(vietnameseStringUtils.makeSearchRegex(search),"i"));

        Criteria checkCriteria = new Criteria();
        checkCriteria.andOperator(thoiGianQuyTrinhCriteria, searchCriteria, trangThaiDuyetHoiDongCriteria);

        ProjectionOperation projectionOperation = Aggregation.project("tenHoiDong",
                "soQuyetDinh", "ngayQuyetDinh", "ngayHop", "diaDiem",
                "deTai", "thanhVienHoiDongs", "khachMoi", "diemTrungBinhCuoi", "xepLoai", "fileBienBanHoiDong", "fileGioiThieuThanhVien", "trangThaiDuyetHoiDong", "thoiGianQuyTrinh")
                .and(ConvertOperators.ToObjectId.toObjectId("$deTai.$id")).as("deTaiId");
        LookupOperation lookupDeTaiOperation = lookup(
                "de-tai",
                "deTaiId",
                "_id",
                "deTais");
        MatchOperation matchOperation = match(checkCriteria);
        SkipOperation skipOperation = new SkipOperation((long) pageable.getPageNumber() * pageable.getPageSize());
        SortOperation sortOperation = sort(pageable.getSort());
        FacetOperation facetOperation = facet(
                count().as("total")).as("total")
                .and(skipOperation, limit(pageable.getPageSize())
                ).as("metaData");
        Aggregation aggregation = newAggregation(
                projectionOperation,
                lookupDeTaiOperation,
                matchOperation,
                sortOperation,
                facetOperation
        );
        AggregationResults<PageHoiDongNghiemThuTransfer> aggregate = mongoTemplate.aggregate(aggregation,
                HoiDongNghiemThu.class,
                PageHoiDongNghiemThuTransfer.class);
        List<PageHoiDongNghiemThuTransfer> mappedResults = aggregate.getMappedResults();
        if (mappedResults.get(0).getTotal().size() == 0) {
            return new PageImpl<>(new ArrayList<>(), pageable, 0);
        }
        return new PageImpl<>(mappedResults.get(0).getMetaData(), pageable, mappedResults.get(0).getTotal().get(0).getTotal());
    }

    @Override
    public HoiDongNghiemThu uploadDeXuatThanhVienHoiDongNghiemThu(String hoiDongNghiemThuId, String fileId) {
        HoiDongNghiemThu hoiDongNghiemThu = getHoiDongNghiemThu(hoiDongNghiemThuId);
        MyFile file = myFileService.getFileInfo(fileId);
        hoiDongNghiemThu.setFileGioiThieuThanhVien(fileId);
        hoiDongNghiemThuRepository.save(hoiDongNghiemThu);
        return hoiDongNghiemThu;
    }

    @Override
    public Page<HoiDongNghiemThu> getHoiDongNghiemThuByCNDT(String search, String thoiGianQuyTrinhId, String email, String trangThaiDuyetHoiDong, Pageable pageable) {
        Criteria thoiGianQuyTrinhCriteria = new Criteria();
        Criteria trangThaiDuyetHoiDongCriteria = new Criteria();
        Criteria chuNhiemCriteria = new Criteria();
        Criteria searchCriteria = new Criteria();
        thoiGianQuyTrinhCriteria.and("thoiGianQuyTrinh.$id").is(new ObjectId(thoiGianQuyTrinhId));
        trangThaiDuyetHoiDongCriteria.and("trangThaiDuyetHoiDong").is(trangThaiDuyetHoiDong);
        chuNhiemCriteria.and("deTais.chuNhiemDeTai.email").is(email);
        searchCriteria.orOperator(Criteria.where("deTais.tenDeTai").regex(vietnameseStringUtils.makeSearchRegex(search),"i"),
                Criteria.where("tenHoiDong").regex(vietnameseStringUtils.makeSearchRegex(search),"i"));

        Criteria checkCriteria = new Criteria();
        checkCriteria.andOperator(searchCriteria, chuNhiemCriteria, trangThaiDuyetHoiDongCriteria,thoiGianQuyTrinhCriteria);

        ProjectionOperation projectionOperation = Aggregation.project("tenHoiDong",
                "soQuyetDinh", "ngayQuyetDinh", "ngayHop", "diaDiem",
                "deTai", "thanhVienHoiDongs", "khachMoi", "diemTrungBinhCuoi", "xepLoai", "fileBienBanHoiDong", "fileGioiThieuThanhVien", "trangThaiDuyetHoiDong" ,"thoiGianQuyTrinh")
                .and(ConvertOperators.ToObjectId.toObjectId("$deTai.$id")).as("deTaiId");
        LookupOperation lookupDeTaiOperation = lookup(
                "de-tai",
                "deTaiId",
                "_id",
                "deTais");
        MatchOperation matchOperation = match(checkCriteria);
        SkipOperation skipOperation = new SkipOperation((long) pageable.getPageNumber() * pageable.getPageSize());
        SortOperation sortOperation = sort(pageable.getSort());
        FacetOperation facetOperation = facet(
                count().as("total")).as("total")
                .and(skipOperation, limit(pageable.getPageSize())
                ).as("metaData");
        Aggregation aggregation = newAggregation(
                projectionOperation,
                lookupDeTaiOperation,
                matchOperation,
                sortOperation,
                facetOperation
        );
        AggregationResults<PageHoiDongNghiemThuTransfer> aggregate = mongoTemplate.aggregate(aggregation,
                HoiDongNghiemThu.class,
                PageHoiDongNghiemThuTransfer.class);
        List<PageHoiDongNghiemThuTransfer> mappedResults = aggregate.getMappedResults();
        if (mappedResults.get(0).getTotal().size() == 0) {
            return new PageImpl<>(new ArrayList<>(), pageable, 0);
        }
        return new PageImpl<>(mappedResults.get(0).getMetaData(), pageable, mappedResults.get(0).getTotal().get(0).getTotal());
    }

    @Override
    public HoiDongNghiemThu getHoiDongNghiemThuByDeTai(String deTaiId) {
        return hoiDongNghiemThuRepository.findByDeTai_Id(deTaiId);
    }


    private ThanhVienHoiDongNghiemThu mapThanhVienDoiDongDtoToThanhVienHoiDong(ThanhVienHoiDongNghiemThuDto dto ){
        ThanhVienHoiDongNghiemThu thanhVienHoiDongNghiemThu = new ThanhVienHoiDongNghiemThu();
        thanhVienHoiDongNghiemThu.setEmail(dto.getEmail());
        thanhVienHoiDongNghiemThu.setSoDienThoai(dto.getSoDienThoai());
        thanhVienHoiDongNghiemThu.setHoTen(dto.getHoTen());
        thanhVienHoiDongNghiemThu.setDonViCongTac(dto.getDonViCongTac());
        thanhVienHoiDongNghiemThu.setChuyenMon(dto.getChuyenMon());
        thanhVienHoiDongNghiemThu.setNhiemVuHoiDong(dto.getNhiemVuHoiDong());
        thanhVienHoiDongNghiemThu.setHocHam(hocHamService.getHocHamCore(dto.getHocHamId()));
        thanhVienHoiDongNghiemThu.setHocVi(hocViService.getHocViCore(dto.getHocViId()));
        thanhVienHoiDongNghiemThu.setTrangThaiDuyetThanhVien(dto.getTrangThaiDuyetThanhVien());
        return thanhVienHoiDongNghiemThu;
    }



}
