package com.stc.nghiencuukhoahoc.services.bienbanhoidongxetduyet;

import com.stc.nghiencuukhoahoc.dtos.bienbanhoidongxetduyet.PageBienBanTransfer;
import com.stc.nghiencuukhoahoc.dtos.hoidongxetduyet.BienBanHoiDongXetDuyetDto;
import com.stc.nghiencuukhoahoc.dtos.hoidongxetduyet.PhieuDiemThanhVienHoiDongXetDuyetDto;
import com.stc.nghiencuukhoahoc.dtos.hoidongxetduyet.ThanhVienHoiDongXetDuyetDto;
import com.stc.nghiencuukhoahoc.entities.*;
import com.stc.nghiencuukhoahoc.entities.embeded.NhanVienEd;
import com.stc.nghiencuukhoahoc.entities.embeded.PhieuDiemThanhVienHoiDongXetDuyet;
import com.stc.nghiencuukhoahoc.entities.embeded.ThanhVienHoiDongXetDuyet;
import com.stc.nghiencuukhoahoc.exceptions.InvalidException;
import com.stc.nghiencuukhoahoc.exceptions.NotFoundException;
import com.stc.nghiencuukhoahoc.repositories.BienBanHoiDongXetDuyetRepository;
import com.stc.nghiencuukhoahoc.repositories.DeTaiRepository;
import com.stc.nghiencuukhoahoc.repositories.HocHamRepository;
import com.stc.nghiencuukhoahoc.repositories.HocViRepository;
import com.stc.nghiencuukhoahoc.services.cauhinhbieumau.CauHinhBieuMauService;
import com.stc.nghiencuukhoahoc.services.detai.DeTaiService;
import com.stc.nghiencuukhoahoc.services.fileservice.MyFileService;
import com.stc.nghiencuukhoahoc.services.hoidongxetduyet.HoiDongXetDuyetService;
import com.stc.nghiencuukhoahoc.services.nhanvien.NhanVienService;
import com.stc.nghiencuukhoahoc.services.word.WordService;
import com.stc.nghiencuukhoahoc.utils.EnumTrangThaiDeTai;
import com.stc.vietnamstringutils.VietnameseStringUtils;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.checkerframework.checker.units.qual.C;
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
 * Created by IntelliJ IDEA.
 * User: thangtm
 * Date: 4/23/2021
 * Time: 8:51 AM
 * Filename: BienBanHoiDongXetDuyetServiceImpl
 */
@Service
@Slf4j
public class BienBanHoiDongXetDuyetServiceImpl implements BienBanHoiDongXetDuyetService {
    private final BienBanHoiDongXetDuyetRepository bienBanHoiDongXetDuyetRepository;

    private final HocHamRepository hocHamRepository;

    private final HocViRepository hocViRepository;

    private final DeTaiRepository deTaiRepository;

    private final NhanVienService nhanVienService;

    private final DeTaiService deTaiService;

    private final MyFileService myFileService;

    private final HoiDongXetDuyetService hoiDongXetDuyetService;

    private final CauHinhBieuMauService cauHinhBieuMauService;

    private final WordService wordService;

    private final VietnameseStringUtils vietnameseStringUtils;

    private final MongoTemplate mongoTemplate;

    public BienBanHoiDongXetDuyetServiceImpl(BienBanHoiDongXetDuyetRepository bienBanHoiDongXetDuyetRepository, HocHamRepository hocHamRepository, HocViRepository hocViRepository, DeTaiRepository deTaiRepository, NhanVienService nhanVienService, DeTaiService deTaiService, MyFileService myFileService, HoiDongXetDuyetService hoiDongXetDuyetService, CauHinhBieuMauService cauHinhBieuMauService, WordService wordService, VietnameseStringUtils vietnameseStringUtils, MongoTemplate mongoTemplate) {
        this.bienBanHoiDongXetDuyetRepository = bienBanHoiDongXetDuyetRepository;
        this.hocHamRepository = hocHamRepository;
        this.hocViRepository = hocViRepository;
        this.deTaiRepository = deTaiRepository;
        this.nhanVienService = nhanVienService;
        this.deTaiService = deTaiService;
        this.myFileService = myFileService;
        this.hoiDongXetDuyetService = hoiDongXetDuyetService;
        this.cauHinhBieuMauService = cauHinhBieuMauService;
        this.wordService = wordService;
        this.vietnameseStringUtils = vietnameseStringUtils;
        this.mongoTemplate = mongoTemplate;
    }


    @Override
    public List<BienBanHoiDongXetDuyet> getAll() {
        try {
            return bienBanHoiDongXetDuyetRepository.findAll();
        } catch (Exception e) {
            throw new InvalidException("Đã có lỗi trong quá trình lấy biên bản hội đồng xét duyệt!");
        }
    }

    @Override
    public BienBanHoiDongXetDuyet addNew(String deTaiId, String hoiDongId) {
            if (bienBanHoiDongXetDuyetRepository.existsByDeTai_IdAndHoiDongXetDuyet_Id(deTaiId, hoiDongId)) {
                throw new InvalidException(String.format("Biên bản hội đồng %s xét duyệt đề tài %s đã tồn tại", hoiDongId, deTaiId));
            }
            BienBanHoiDongXetDuyet bienBanHoiDongXetDuyet = new BienBanHoiDongXetDuyet();
            if(ObjectUtils.isEmpty(deTaiId)){
                throw new InvalidException("Đề tài không để trống");
            }
            if(ObjectUtils.isEmpty(hoiDongId)){
                throw new InvalidException("Hội đồng không để trống");
            }

            DeTai deTai = deTaiService.getDeTai(deTaiId);
            HoiDongXetDuyet hoiDongXetDuyet = hoiDongXetDuyetService.getHoiDongXetDuyet(hoiDongId);
            bienBanHoiDongXetDuyet.setDeTai(deTai);
            bienBanHoiDongXetDuyet.setHoiDongXetDuyet(hoiDongXetDuyet);
            bienBanHoiDongXetDuyetRepository.save(bienBanHoiDongXetDuyet);
            return bienBanHoiDongXetDuyet;
    }

    @Override
    public BienBanHoiDongXetDuyet update(String bienBanHoiDongXetDuyetId, BienBanHoiDongXetDuyetDto dto) {
            BienBanHoiDongXetDuyet bienBanHoiDongXetDuyet = getBienBanHoiDongXetDuyet(bienBanHoiDongXetDuyetId);
            if (bienBanHoiDongXetDuyetRepository.existsByDeTai_IdAndHoiDongXetDuyet_Id(dto.getDeTaiId(), dto.getHoiDongId())
                    && !dto.getDeTaiId().equalsIgnoreCase(bienBanHoiDongXetDuyet.getDeTai().getId())
                    && !dto.getHoiDongId().equalsIgnoreCase(bienBanHoiDongXetDuyet.getHoiDongXetDuyet().getId())) {
                throw new InvalidException(String.format("Hội đồng %s xét duyệt đề tài %s đã tồn tại", dto.getHoiDongId(), dto.getDeTaiId()));
            }
            if(ObjectUtils.isEmpty(dto.getDeTaiId())){
                throw new InvalidException("Đề tài không để trống");
            }
            if(ObjectUtils.isEmpty(dto.getHoiDongId())){
                throw new InvalidException("Hội đồng không để trống");
            }
            if(ObjectUtils.isEmpty(dto.getKienNghiHoiDong())){
                throw new InvalidException("Kiến nghị hội đồng không để trống");
            }
            if(ObjectUtils.isEmpty(dto.isKetLuan())){
                throw new InvalidException("Kết luận không để trống");
            }
            if(ObjectUtils.isEmpty(dto.getBienBanHoiDong())){
                throw new InvalidException("Biên bản hội đồng không để trống");
            }

            DeTai deTai = deTaiService.getDeTai(dto.getDeTaiId());
            HoiDongXetDuyet hoiDongXetDuyet = hoiDongXetDuyetService.getHoiDongXetDuyet(dto.getHoiDongId());

            bienBanHoiDongXetDuyet.setDeTai(deTai);
            bienBanHoiDongXetDuyet.setHoiDongXetDuyet(hoiDongXetDuyet);
            bienBanHoiDongXetDuyet.setKienNghiHoiDong(dto.getKienNghiHoiDong());
            bienBanHoiDongXetDuyet.setKhachMoi(dto.getKhachMoi());
            bienBanHoiDongXetDuyet.setKetLuan(dto.isKetLuan());

            MyFile myFile = myFileService.getFileInfo(dto.getBienBanHoiDong());
            bienBanHoiDongXetDuyet.setBienBanHoiDong(dto.getBienBanHoiDong());

            if(dto.isKetLuan()){
                deTai.setTrangThaiDeTai(EnumTrangThaiDeTai.DAT_XET_DUYET.name());
            }else deTai.setTrangThaiDeTai(EnumTrangThaiDeTai.HUY.name());
            deTaiRepository.save(deTai);

            bienBanHoiDongXetDuyetRepository.save(bienBanHoiDongXetDuyet);
            return bienBanHoiDongXetDuyet;
    }

    @Override
    public BienBanHoiDongXetDuyet uploadDanhGiaCuaHoiDongXetDuyetByBienBanHoiDong(String bienBanHoiDongXetDuyetId, PhieuDiemThanhVienHoiDongXetDuyetDto dto) {
        BienBanHoiDongXetDuyet bienBanHoiDongXetDuyet = getBienBanHoiDongXetDuyet(bienBanHoiDongXetDuyetId);

        if (ObjectUtils.isEmpty(dto.getEmail())) {
            throw new InvalidException("Eamil thành viên hội đồng xét duyệt không để trống");
        }
        NhanVienEd nhanVienEd = nhanVienService.getByEmail(dto.getEmail());

        if(ObjectUtils.isEmpty(dto.getTongDiem())){
            throw new InvalidException("Tổng điểm không để trống");
        }

        List<PhieuDiemThanhVienHoiDongXetDuyet> phieuDiemThanhViens = bienBanHoiDongXetDuyet.getPhieuDiemThanhViens();
        int kt = 0;
        for(PhieuDiemThanhVienHoiDongXetDuyet phieuDiemThanhVien : phieuDiemThanhViens){
            if(phieuDiemThanhVien.getThanhVien().getEmail().equals(dto.getEmail()) ){
                phieuDiemThanhVien.setTongDiem(dto.getTongDiem());
                phieuDiemThanhVien.setYKienKhac(dto.getYKienKhac());
                MyFile myFile = myFileService.getFileInfo(dto.getFilePhieuDiem());
                phieuDiemThanhVien.setFilePhieuDiem(dto.getFilePhieuDiem());
                if(dto.getTongDiem()<50){
                    phieuDiemThanhVien.setKetLuan(false);
                }else phieuDiemThanhVien.setKetLuan(true);
            }else kt++;
        }
        if(kt == phieuDiemThanhViens.size()){
            PhieuDiemThanhVienHoiDongXetDuyet phieuDiemThanhVienHoiDongXetDuyet = new PhieuDiemThanhVienHoiDongXetDuyet();
            phieuDiemThanhVienHoiDongXetDuyet.setThanhVien(nhanVienEd);
            phieuDiemThanhVienHoiDongXetDuyet.setTongDiem(dto.getTongDiem());
            MyFile myFile = myFileService.getFileInfo(dto.getFilePhieuDiem());
            phieuDiemThanhVienHoiDongXetDuyet.setFilePhieuDiem(dto.getFilePhieuDiem());
            phieuDiemThanhVienHoiDongXetDuyet.setYKienKhac(dto.getYKienKhac());
            if(dto.getTongDiem()<50){
                phieuDiemThanhVienHoiDongXetDuyet.setKetLuan(false);
            }else phieuDiemThanhVienHoiDongXetDuyet.setKetLuan(true);
            phieuDiemThanhViens.add(phieuDiemThanhVienHoiDongXetDuyet);
        }
        bienBanHoiDongXetDuyet.setPhieuDiemThanhViens(phieuDiemThanhViens);
        bienBanHoiDongXetDuyetRepository.save(bienBanHoiDongXetDuyet);
        return bienBanHoiDongXetDuyet;
    }

    @Override
    public BienBanHoiDongXetDuyet getBienBanHoiDongXetDuyet(String bienBanHoiDongXetDuyetId) {
        return bienBanHoiDongXetDuyetRepository.findById(bienBanHoiDongXetDuyetId)
                .orElseThrow(() -> new NotFoundException(String.format("Không tìm thấy biên bản hội đồng với id: %s", bienBanHoiDongXetDuyetId)));
    }

    @Override
    public File xuatBienBanHopHoiDongTuyenChon(String bienBanHoiDongXetDuyetId) throws Exception {
        BienBanHoiDongXetDuyet bienBanHoiDongXetDuyet = getBienBanHoiDongXetDuyet(bienBanHoiDongXetDuyetId);
        CauHinhBieuMau cauHinhBieuMau = cauHinhBieuMauService.getCauHinhCore();
        return wordService.xuatBienBanHopHoiDongTuyenChon(bienBanHoiDongXetDuyet, cauHinhBieuMau);
    }

    @Override
    public Page<BienBanHoiDongXetDuyet> getBienBanHoiDongByHoiDongXetDuyet(String search, String hoiDongId, Pageable pageable) {
        Criteria hoiDongXetDuyetCriteria = new Criteria();
        Criteria searchCriteria = new Criteria();
        hoiDongXetDuyetCriteria.and("hoiDongXetDuyet.$id").is(new ObjectId(hoiDongId));
        searchCriteria.orOperator(Criteria.where("deTais.tenDeTai").regex(vietnameseStringUtils.makeSearchRegex(search),"i"),
                Criteria.where("hoiDongXetDuyets.tenHoiDong").regex(vietnameseStringUtils.makeSearchRegex(search),"i"));

        Criteria checkCriteria = new Criteria();
        checkCriteria.andOperator(searchCriteria, hoiDongXetDuyetCriteria);

        ProjectionOperation projectionOperation = Aggregation.project("deTai",
                "hoiDongXetDuyet", "phieuDiemThanhViens", "khachMoi", "kienNghiHoiDong",
                "ketLuan", "bienBanHoiDong")
                .and(ConvertOperators.ToObjectId.toObjectId("$hoiDongXetDuyet.$id")).as("hoiDongXetDuyetId")
                .and(ConvertOperators.ToObjectId.toObjectId("$deTai.$id")).as("deTaiId");

        LookupOperation lookupHoiDongXetDuyetOperation = lookup(
                "hoi-dong-xet-duyet-de-tai-nckh",
                "hoiDongXetDuyetId",
                "_id",
                "hoiDongXetDuyets");
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
                lookupHoiDongXetDuyetOperation,
                lookupDeTaiOperation,
                matchOperation,
                sortOperation,
                facetOperation
        );
        AggregationResults<PageBienBanTransfer> aggregate = mongoTemplate.aggregate(aggregation,
                BienBanHoiDongXetDuyet.class,
                PageBienBanTransfer.class);
        List<PageBienBanTransfer> mappedResults = aggregate.getMappedResults();
        if (mappedResults.get(0).getTotal().size() == 0) {
            return new PageImpl<>(new ArrayList<>(), pageable, 0);
        }
        return new PageImpl<>(mappedResults.get(0).getMetaData(), pageable, mappedResults.get(0).getTotal().get(0).getTotal());
    }

    @Override
    public BienBanHoiDongXetDuyet getBienBanHoiDongByDeTai(String deTaiId) {
        return bienBanHoiDongXetDuyetRepository.findByDeTai_Id(deTaiId);
    }


    private ThanhVienHoiDongXetDuyet getThanhVienHoiDongXetDuyetFromDto(ThanhVienHoiDongXetDuyetDto dto){
        ThanhVienHoiDongXetDuyet thanhVienHoiDongXetDuyet = new ThanhVienHoiDongXetDuyet();
        NhanVienEd nhanVienEd = nhanVienService.getByEmail(dto.getEmail());
        thanhVienHoiDongXetDuyet.setThanhVien(nhanVienEd);
        thanhVienHoiDongXetDuyet.setVaiTro(dto.getVaiTro());
        return thanhVienHoiDongXetDuyet;
    }
}
