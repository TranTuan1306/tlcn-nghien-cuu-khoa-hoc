package com.stc.nghiencuukhoahoc.services.hoidongxetduyet;

import com.stc.nghiencuukhoahoc.clients.HrmServiceClient;
import com.stc.nghiencuukhoahoc.dtos.hoidongxetduyet.HoiDongXetDuyetDto;
import com.stc.nghiencuukhoahoc.dtos.hoidongxetduyet.ThanhVienHoiDongXetDuyetDto;
import com.stc.nghiencuukhoahoc.entities.CauHinhBieuMau;
import com.stc.nghiencuukhoahoc.entities.DeTai;
import com.stc.nghiencuukhoahoc.entities.HoiDongXetDuyet;
import com.stc.nghiencuukhoahoc.entities.embeded.NhanVienEd;
import com.stc.nghiencuukhoahoc.entities.embeded.ThanhVienHoiDongXetDuyet;
import com.stc.nghiencuukhoahoc.exceptions.InvalidException;
import com.stc.nghiencuukhoahoc.exceptions.NotFoundException;
import com.stc.nghiencuukhoahoc.repositories.HocHamRepository;
import com.stc.nghiencuukhoahoc.repositories.HocViRepository;
import com.stc.nghiencuukhoahoc.repositories.HoiDongXetDuyetRepository;
import com.stc.nghiencuukhoahoc.services.cauhinhbieumau.CauHinhBieuMauService;
import com.stc.nghiencuukhoahoc.services.detai.DeTaiService;
import com.stc.nghiencuukhoahoc.services.linhvuc.LinhVucService;
import com.stc.nghiencuukhoahoc.services.nhanvien.NhanVienService;
import com.stc.nghiencuukhoahoc.services.thoigianquytrinh.ThoiGianQuyTrinhService;
import com.stc.nghiencuukhoahoc.services.word.WordService;
import com.stc.vietnamstringutils.VietnameseStringUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by IntelliJ IDEA.
 * User: thangtm
 * Date: 4/13/2021
 * Time: 11:34 AM
 * Filename: HoiDongXetDuyetImpl
 */
@Service
@Slf4j
public class HoiDongXetDuyetServiceImpl implements HoiDongXetDuyetService{
    private final HoiDongXetDuyetRepository hoiDongXetDuyetRepository;

    private final DeTaiService deTaiService;

    private final ThoiGianQuyTrinhService thoiGianQuyTrinhService;

    private final VietnameseStringUtils vietnameseStringUtils;

    private final LinhVucService linhVucService;

    private final NhanVienService nhanVienService;

    private final CauHinhBieuMauService cauHinhBieuMauService;

    private final WordService wordService;

    public HoiDongXetDuyetServiceImpl(HoiDongXetDuyetRepository hoiDongXetDuyetRepository, HocHamRepository hocHamRepository, HocViRepository hocViRepository, DeTaiService deTaiService, ThoiGianQuyTrinhService thoiGianQuyTrinhService, VietnameseStringUtils vietnameseStringUtils, LinhVucService linhVucService, HrmServiceClient hrmServiceClient, NhanVienService nhanVienService, CauHinhBieuMauService cauHinhBieuMauService, WordService wordService) {
        this.hoiDongXetDuyetRepository = hoiDongXetDuyetRepository;
        this.deTaiService = deTaiService;
        this.thoiGianQuyTrinhService = thoiGianQuyTrinhService;
        this.vietnameseStringUtils = vietnameseStringUtils;
        this.linhVucService = linhVucService;
        this.nhanVienService = nhanVienService;
        this.cauHinhBieuMauService = cauHinhBieuMauService;
        this.wordService = wordService;
    }

    @Override
    public List<HoiDongXetDuyet> getAll() {
        try {
            return hoiDongXetDuyetRepository.findAll();
        } catch (Exception e) {
            throw new InvalidException("Đã có lỗi trong quá trình lấy học hàm!");
        }
    }

    @Override
    public Page<HoiDongXetDuyet> getPaging(String search, Pageable pageable) {
        return hoiDongXetDuyetRepository.getAllHoiDongXetDuyetsPaging(vietnameseStringUtils.makeSearchRegex(search), pageable);
    }

    @Override
    public HoiDongXetDuyet addNew(HoiDongXetDuyetDto dto) {
            HoiDongXetDuyet hoiDongXetDuyet = new HoiDongXetDuyet();
            if(ObjectUtils.isEmpty(dto.getTenHoiDong())){
                throw new InvalidException("Tên hội đồng không bỏ trống");
            }
            hoiDongXetDuyet.setTenHoiDong(dto.getTenHoiDong());
            if(ObjectUtils.isEmpty(dto.getLinhVucId())){
                throw new InvalidException("Linh vuc không bỏ trống");
            }
            hoiDongXetDuyet.setLinhVuc(linhVucService.getLinhVuc(dto.getLinhVucId()));
            if(ObjectUtils.isEmpty(dto.getSoQuyetDinh())){
                throw new InvalidException("Số quyết định không bỏ trống");
            }
            hoiDongXetDuyet.setSoQuyetDinh(dto.getSoQuyetDinh());
            if(ObjectUtils.isEmpty(dto.getNgayQuyetDinh())){
                throw new InvalidException("Ngày quyết định không bỏ trống");
            }
            hoiDongXetDuyet.setNgayQuyetDinh(dto.getNgayQuyetDinh());
            if(ObjectUtils.isEmpty(dto.getNgayQuyetDinh())){
                throw new InvalidException("Ngày hợp không bỏ trống");
            }
            hoiDongXetDuyet.setNgayHop(dto.getNgayHop());
            if(ObjectUtils.isEmpty(dto.getDiaDiem())){
                throw new InvalidException("Địa điểm không bỏ trống");
            }
            hoiDongXetDuyet.setDiaDiem(dto.getDiaDiem());
            if(ObjectUtils.isEmpty(dto.getDeTaiIds())){
                throw new InvalidException("Đề tài không bỏ trống");
            }
            hoiDongXetDuyet.setDeTaiIds(dto.getDeTaiIds());
            if(ObjectUtils.isEmpty(dto.getThanhVienHoiDongs())){
                throw new InvalidException("Thành viên hội đồng không bỏ trống");
            }
            if(dto.getThanhVienHoiDongs() != null){
                List<ThanhVienHoiDongXetDuyet> thanhVienHoiDongXetDuyets = new ArrayList<>();
                for (ThanhVienHoiDongXetDuyetDto thanhVienHoiDongXetDuyetDto: dto.getThanhVienHoiDongs()) {
                    thanhVienHoiDongXetDuyets.add(getThanhVienHoiDongXetDuyetFromDto(thanhVienHoiDongXetDuyetDto));
                }
                hoiDongXetDuyet.setThanhVienHoiDongs(thanhVienHoiDongXetDuyets);
            }
            if(thoiGianQuyTrinhService.getListActive().isEmpty()) {
                throw new InvalidException("Thời gian quy trình hiện không có active");
            }
            hoiDongXetDuyet.setThoiGianQuyTrinhId(thoiGianQuyTrinhService.getListActive().get(0).getId());
            hoiDongXetDuyetRepository.save(hoiDongXetDuyet);
            return hoiDongXetDuyet;
    }

    @Override
    public HoiDongXetDuyet update(String hoiDongXetDuyetId, HoiDongXetDuyetDto dto) {
            HoiDongXetDuyet hoiDongXetDuyet = hoiDongXetDuyetRepository.findById(hoiDongXetDuyetId)
                    .orElseThrow(() -> new NotFoundException(String.format("Không tìm thấy hội đồng xét duyệt với id: %s", hoiDongXetDuyetId)));
            if(ObjectUtils.isEmpty(dto.getTenHoiDong())){
                throw new InvalidException("Tên hội đồng không bỏ trống");
            }
            hoiDongXetDuyet.setTenHoiDong(dto.getTenHoiDong());
            if(ObjectUtils.isEmpty(dto.getLinhVucId())){
                throw new InvalidException("Linh vuc không bỏ trống");
            }
            hoiDongXetDuyet.setLinhVuc(linhVucService.getLinhVuc(dto.getLinhVucId()));
            if(ObjectUtils.isEmpty(dto.getSoQuyetDinh())){
                throw new InvalidException("Số quyết định không bỏ trống");
            }
            hoiDongXetDuyet.setSoQuyetDinh(dto.getSoQuyetDinh());
            if(ObjectUtils.isEmpty(dto.getNgayQuyetDinh())){
                throw new InvalidException("Ngày quyết định không bỏ trống");
            }
            hoiDongXetDuyet.setNgayQuyetDinh(dto.getNgayQuyetDinh());
            if(ObjectUtils.isEmpty(dto.getNgayQuyetDinh())){
                throw new InvalidException("Ngày hợp không bỏ trống");
            }
            hoiDongXetDuyet.setNgayHop(dto.getNgayHop());
            if(ObjectUtils.isEmpty(dto.getDiaDiem())){
                throw new InvalidException("Địa điểm không bỏ trống");
            }
            hoiDongXetDuyet.setDiaDiem(dto.getDiaDiem());
            if(ObjectUtils.isEmpty(dto.getDeTaiIds())){
                throw new InvalidException("Đề tài không bỏ trống");
            }
            hoiDongXetDuyet.setDeTaiIds(dto.getDeTaiIds());
            if(ObjectUtils.isEmpty(dto.getThanhVienHoiDongs())){
                throw new InvalidException("Thành viên hội đồng không bỏ trống");
            }
            if(ObjectUtils.isEmpty(dto.getThanhVienHoiDongs())){
                throw new InvalidException("Thành viên hội đồng không bỏ trống");
            }
            if(dto.getThanhVienHoiDongs() != null){
                List<ThanhVienHoiDongXetDuyet> thanhVienHoiDongXetDuyets = new ArrayList<>();
                for (ThanhVienHoiDongXetDuyetDto thanhVienHoiDongXetDuyetDto: dto.getThanhVienHoiDongs()) {
                    thanhVienHoiDongXetDuyets.add(getThanhVienHoiDongXetDuyetFromDto(thanhVienHoiDongXetDuyetDto));
                }
                hoiDongXetDuyet.setThanhVienHoiDongs(thanhVienHoiDongXetDuyets);
            }
            hoiDongXetDuyetRepository.save(hoiDongXetDuyet);
            return hoiDongXetDuyet;
    }

    @Override
    public HoiDongXetDuyet getHoiDongXetDuyet(String hoiDongXetDuyetId) {
        return hoiDongXetDuyetRepository.findById(hoiDongXetDuyetId)
                .orElseThrow(() -> new NotFoundException(String.format("Không tìm thấy hội đồng xét duyệt với id: %s", hoiDongXetDuyetId)));
    }

    @Override
    public File xuatPhieuDanhGiaThuyetMinh(String deTaiId, String hoiDongXetDuyetId) throws Exception {
        HoiDongXetDuyet hoiDongXetDuyet = getHoiDongXetDuyet(hoiDongXetDuyetId);
        DeTai deTai = deTaiService.getDeTai(deTaiId);
        CauHinhBieuMau cauHinhBieuMau = cauHinhBieuMauService.getCauHinhCore();
        return wordService.xuatDanhGiaThuyetMinhDeTai(deTai, hoiDongXetDuyet, cauHinhBieuMau);
    }


    private ThanhVienHoiDongXetDuyet getThanhVienHoiDongXetDuyetFromDto(ThanhVienHoiDongXetDuyetDto dto){
        ThanhVienHoiDongXetDuyet thanhVienHoiDongXetDuyet = new ThanhVienHoiDongXetDuyet();
        NhanVienEd nhanVienEd = nhanVienService.getByEmail(dto.getEmail());
        thanhVienHoiDongXetDuyet.setThanhVien(nhanVienEd);
        thanhVienHoiDongXetDuyet.setVaiTro(dto.getVaiTro());
        return thanhVienHoiDongXetDuyet;
    }
}
