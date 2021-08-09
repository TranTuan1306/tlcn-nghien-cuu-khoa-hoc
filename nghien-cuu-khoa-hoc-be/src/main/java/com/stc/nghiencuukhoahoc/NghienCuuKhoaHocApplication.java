package com.stc.nghiencuukhoahoc;

import com.stc.nghiencuukhoahoc.clients.HrmServiceClient;
import com.stc.nghiencuukhoahoc.controllers.danhmuc.ThoiGianQuyTrinhController;
import com.stc.nghiencuukhoahoc.dtos.hrm.DonVi;
import com.stc.nghiencuukhoahoc.dtos.hrm.NhanVien;
import com.stc.nghiencuukhoahoc.dtos.mapper.Mapper;
import com.stc.nghiencuukhoahoc.entities.DeTai;
import com.stc.nghiencuukhoahoc.entities.LoaiHinhNghienCuu;
import com.stc.nghiencuukhoahoc.entities.ThoiGianQuyTrinh;
import com.stc.nghiencuukhoahoc.entities.embeded.NhanVienEd;
import com.stc.nghiencuukhoahoc.entities.embeded.SanPhamDuKien;
import com.stc.nghiencuukhoahoc.exceptions.NotFoundException;
import com.stc.nghiencuukhoahoc.repositories.DeTaiRepository;
import com.stc.nghiencuukhoahoc.repositories.LinhVucRepository;
import com.stc.nghiencuukhoahoc.repositories.LoaiHinhNghienCuuRepository;
import com.stc.nghiencuukhoahoc.services.schedule.ScheduleService;
import com.stc.nghiencuukhoahoc.services.thoigianquytrinh.ThoiGianQuyTrinhService;
import com.stc.nghiencuukhoahoc.services.word.WordService;
import com.stc.nghiencuukhoahoc.utils.EnumTrangThaiDeTai;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;

import java.util.Date;
import java.util.List;
@EnableScheduling
@EnableEurekaClient
@EnableFeignClients
@SpringBootApplication
@EnableAsync
public class NghienCuuKhoaHocApplication implements CommandLineRunner {
    @Autowired
    private WordService wordService;

    @Autowired
    private LoaiHinhNghienCuuRepository loaiHinhNghienCuuRepository;

    @Autowired
    private LinhVucRepository linhVucRepository;

    @Autowired
    private DeTaiRepository deTaiRepository;

    @Autowired
    private  ThoiGianQuyTrinhService thoiGianQuyTrinhService;

    @Qualifier(value = "com.stc.nghiencuukhoahoc.clients.HrmServiceClient")
    @Autowired
    private HrmServiceClient hrmServiceClient;


    public static void main(String[] args) {
        SpringApplication.run(NghienCuuKhoaHocApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        List<NhanVien> nhanViens = hrmServiceClient.getNhanVienByDonViId("5d81fbe85269000001da986f");
        NhanVien nhanVienByEmail = hrmServiceClient.getNhanVienByEmail("dev3.stc@hcmute.edu.vn");
        NhanVien truongDonVi = hrmServiceClient.getTruongDonViByIdDonVi("5d81ff4b5269000001da9880");
        System.out.println();
//        for(int i = 0; i <1; i++) {
//            DeTai deTai = new DeTai();
//            NhanVien nhanVien = hrmServiceClient.getNhanVienByEmail("dev5.stc@hcmute.edu.vn");
//            deTai.setChuNhiemDeTai(Mapper.convertNhanVien(nhanVien));
//            LoaiHinhNghienCuu loaiHinhNghienCuu = loaiHinhNghienCuuRepository.findById("609c9bfafb691235886201a1").orElseThrow(() -> new NotFoundException("Không tìm thấy lĩnh vực với mã: KT"));
//            deTai.setLoaiHinhNghienCuu(loaiHinhNghienCuu);
//            SanPhamDuKien sanPhamDuKien = new SanPhamDuKien();
//            sanPhamDuKien.setSanPhamKhoaHoc("<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>");
//            sanPhamDuKien.setSanPhamDaoTao("<p>Amet consectetur adipiscing elit ut aliquam purus sit amet.</p>\n<p>Morbi non arcu risus quis varius. Viverra ipsum nunc aliquet bibendum.</p>");
//            sanPhamDuKien.setSanPhamUngDung("<p>Iaculis eu non diam phasellus vestibulum lorem sed. Amet facilisis magna etiam tempor orci eu lobortis. Pharetra et ultrices neque ornare aenean euismod elementum.</p>");
//            sanPhamDuKien.setSanPhamKhac("<p>Et malesuada fames ac turpis egestas maecenas pharetra convallis posuere.</p>");
//            deTai.setSanPhamDuKien(sanPhamDuKien);
//            deTai.setTenDeTai("test");
//            deTai.setLinhVucNghienCuu(linhVucRepository.findByMaLinhVuc("KT").orElseThrow(() -> new NotFoundException("Không tìm thấy lĩnh vực với mã: KT")));
//            deTai.setTinhCapThiet("Rất cấp thiết");
//            deTai.setMucTieu("Đạt được abc xyz");
//            deTai.setNoiDungChinh("Để đạt được mục tiêu, ...");
//            deTai.setHieuQuaDuKien("Giúp cho ...");
//            deTai.setNhuCauKinhPhiDuKien(1900000000);
//            deTai.setThoiGianNghienCuuDuKien(5);
//            deTai.setThoiGianQuyTrinh(thoiGianQuyTrinhService.getThoiGianQuyTrinh("60a533f7abfbc10f5a661a6f"));
//            deTai.setTrangThaiDeTai(EnumTrangThaiDeTai.MOI_DANG_KY.name());
//            deTaiRepository.save(deTai);
//        }
    }
}
