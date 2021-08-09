package com.stc.nghiencuukhoahoc.services.word;

import com.aspose.words.*;
import com.stc.nghiencuukhoahoc.clients.HrmServiceClient;
import com.stc.nghiencuukhoahoc.entities.*;
import com.stc.nghiencuukhoahoc.entities.danhmuc.LinhVuc;
import com.stc.nghiencuukhoahoc.entities.danhmuc.SanPham;
import com.stc.nghiencuukhoahoc.entities.embeded.*;
import com.stc.nghiencuukhoahoc.entities.embeded.BM07.*;
import com.stc.nghiencuukhoahoc.repositories.*;
import com.stc.nghiencuukhoahoc.services.cauhinhbieumau.CauHinhBieuMauService;
import com.stc.nghiencuukhoahoc.services.sanpham.SanPhamService;
import com.stc.nghiencuukhoahoc.utils.EnumLoaiSanPham;
import com.stc.nghiencuukhoahoc.utils.EnumVaiTroNhiemVuHoiDongNghiemThu;
import com.stc.nghiencuukhoahoc.utils.ReadNumber;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import java.awt.*;
import java.io.File;
import java.io.InputStream;
import java.math.BigDecimal;
import java.text.DateFormat;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.*;
import java.util.List;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

/**
 * Created by: IntelliJ IDEA
 * User      : thangpx
 * Date      : 08/12/2020
 * Time      : 14:39
 * Filename  : WordServiceImpl
 */
@Slf4j
@Service
public class WordServiceImpl implements WordService {
    private final DeTaiRepository deTaiRepository;

    private final LinhVucRepository linhVucRepository;

    private final LoaiHinhNghienCuuRepository loaiHinhNghienCuuRepository;

    private final SanPhamRepository sanPhamRepository;

    private final CauHinhBieuMauRepository cauHinhBieuMauRepository;

    private final HoiDongXetDuyetRepository hoiDongXetDuyetRepository;

    private final HrmServiceClient hrmServiceClient;

    private final CauHinhBieuMauService cauHinhBieuMauService;

    private final SanPhamService sanPhamService;


    @Value("${file.download_dir}")
    private String downloadFolder;

    private final DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");

    private final DecimalFormat decimalFormat = new DecimalFormat("#,###.##########");

    public WordServiceImpl(DeTaiRepository deTaiRepository, LinhVucRepository linhVucRepository, LoaiHinhNghienCuuRepository loaiHinhNghienCuuRepository, SanPhamRepository sanPhamRepository, CauHinhBieuMauRepository cauHinhBieuMauRepository, HoiDongXetDuyetRepository hoiDongXetDuyetRepository, HrmServiceClient hrmServiceClient, CauHinhBieuMauService cauHinhBieuMauService, SanPhamService sanPhamService) {
        this.deTaiRepository = deTaiRepository;
        this.linhVucRepository = linhVucRepository;
        this.loaiHinhNghienCuuRepository = loaiHinhNghienCuuRepository;
        this.sanPhamRepository = sanPhamRepository;
        this.cauHinhBieuMauRepository = cauHinhBieuMauRepository;
        this.hoiDongXetDuyetRepository = hoiDongXetDuyetRepository;
        this.hrmServiceClient = hrmServiceClient;
        this.cauHinhBieuMauService = cauHinhBieuMauService;
        this.sanPhamService = sanPhamService;
    }

    @Override
    public File xuatDeXuatDeTai(DeTai deTai) throws Exception {
        applyALicense();
        Document document = new Document(getClass().getResourceAsStream("/bieumau/BM01.docx"));
        DocumentBuilder builder = new DocumentBuilder(document);

        DocumentBuilder htmlBuild = new DocumentBuilder();
        String fileName = downloadFolder + "/BM01- " + deTai.getId() + " - " + new Date().getTime() + ".docx";
        Range range = document.getDocument().getRange();
        String texts = range.getText();
        LocalDate current = LocalDate.now();
        FindReplaceOptions options = new FindReplaceOptions();

        FindReplaceOptions otherOption = new FindReplaceOptions();


        if(texts.contains("_ngay_")){
            range.replace("_ngay_", current.getDayOfMonth() +"", options);
        }
        if(texts.contains("_thang_")){
            range.replace("_thang_", current.getMonth().getValue() +"", options);
        }
        if(texts.contains("_nam_")){
            range.replace("_nam_", current.getYear() +"", options);
        }
        //Header
        if(texts.contains("_donVi_")){
            range.replace("_donVi_", hrmServiceClient.getDonViById(deTai.getDonViId()).getTenDonVi(), options);
        }

        //1. Tên đề tài
        if (texts.contains("_tenDeTai_")) {
            range.replace("_tenDeTai_", deTai.getTenDeTai(), options);
        }
        //2. Lĩnh vực nghiên cứu
        char check = (char) Integer.parseInt("F052", 16);
        char unCheck = (char) Integer.parseInt("F0A3", 16);
        Table tableLinhVuc = (Table) document.getChild(NodeType.TABLE, 1, true);
        List<LinhVuc> linhVucs = linhVucRepository.getAllLinhVucsAndTrangThaiIsTrue();
        int size = linhVucs.size();
        for (int index = 0; index < size; index = index + 3) {
            Row lastRow = tableLinhVuc.getLastRow();
            Row cloned = (Row) lastRow.deepClone(true);
            for (int i = 0; i <= 2; ++i) {
                try {
                    LinhVuc linhVuc = linhVucs.get(index + i);
                    lastRow.getCells().get(i).getFirstParagraph().appendChild(new Run(document, linhVuc.getTenLinhVuc()));
                    builder.moveToCell(document.getChildNodes(NodeType.TABLE, true).indexOf(tableLinhVuc),
                            tableLinhVuc.getRows().indexOf(lastRow), i, 0);
                    builder.getFont().setName("Wingdings 2");
                    builder.getFont().setSize(15);
                    if (deTai.getLinhVucNghienCuu().getMaLinhVuc().equals(linhVuc.getMaLinhVuc()))
                        builder.write(check + "");
                    else
                        builder.write(unCheck + "");
                } catch (Exception ex) {
                    System.out.println("Đã có lỗi trong quá trình insert lĩnh vực nghiên cứu");
                }
            }
            tableLinhVuc.appendChild(cloned);
        }
        tableLinhVuc.getLastRow().remove();
        //3. Tính cấp thiết
        if (texts.contains("_tinhCapThiet_")) {
            otherOption.setReplacingCallback(new ReplaceWithHtmlEvaluator(deTai.getTinhCapThiet()));
            range.replace("_tinhCapThiet_","" ,otherOption);
        }
        //4. Mục tiêu
        if (texts.contains("_mucTieu_")) {
            otherOption.setReplacingCallback(new ReplaceWithHtmlEvaluator(deTai.getMucTieu()));
            range.replace("_mucTieu_","" ,otherOption);
        }
        //5. Nội dung chính
        if (texts.contains("_noiDungChinh_")) {
            otherOption.setReplacingCallback(new ReplaceWithHtmlEvaluator(deTai.getNoiDungChinh()));
            range.replace("_noiDungChinh_","" ,otherOption);
        }
        //6. Sản phẩm và kết quả dự kiến
        //6.1 Sản phẩm khoa học
        try {
            Table tableSanPhamKhoaHoc = (Table) document.getChild(NodeType.TABLE, 2, true);
            Row lastRow = tableSanPhamKhoaHoc.getLastRow();
            DocumentBuilder htmlBuilder = new DocumentBuilder();
            htmlBuilder.insertHtml(deTai.getSanPhamDuKien().getSanPhamKhoaHoc(), true);
            insertDocument(lastRow.getCells().get(0).getFirstParagraph(), htmlBuilder.getDocument());
            lastRow.getCells().get(0).getFirstParagraph().remove();
        } catch (Exception e) {
            e.printStackTrace();
        }
        //6.2 Sản phẩm đào tạo
        try {
            Table tableSanPhamDaoTao = (Table) document.getChild(NodeType.TABLE, 3, true);
            Row lastRow = tableSanPhamDaoTao.getLastRow();
            DocumentBuilder htmlBuilder = new DocumentBuilder();
            htmlBuilder.insertHtml(deTai.getSanPhamDuKien().getSanPhamDaoTao(), true);
            insertDocument(lastRow.getCells().get(0).getFirstParagraph(), htmlBuilder.getDocument());
            lastRow.getCells().get(0).getFirstParagraph().remove();
        } catch (Exception e) {
            e.printStackTrace();
        }
        try {
            Table tableSanPhamUngDung = (Table) document.getChild(NodeType.TABLE, 4, true);
            Row lastRow = tableSanPhamUngDung.getLastRow();
            DocumentBuilder htmlBuilder = new DocumentBuilder();
            htmlBuilder.insertHtml(deTai.getSanPhamDuKien().getSanPhamUngDung(), true);
            insertDocument(lastRow.getCells().get(0).getFirstParagraph(), htmlBuilder.getDocument());
            lastRow.getCells().get(0).getFirstParagraph().remove();
        } catch (Exception e) {
            e.printStackTrace();
        }
        try {
            Table tableSanPhamKhac = (Table) document.getChild(NodeType.TABLE, 5, true);
            Row lastRow = tableSanPhamKhac.getLastRow();
            DocumentBuilder htmlBuilder = new DocumentBuilder();
            htmlBuilder.insertHtml(deTai.getSanPhamDuKien().getSanPhamKhac(), true);
            insertDocument(lastRow.getCells().get(0).getFirstParagraph(), htmlBuilder.getDocument());
            lastRow.getCells().get(0).getFirstParagraph().remove();
        } catch (Exception e) {
            e.printStackTrace();
        }
        //7. Hiệu quả dự kiến
        if (texts.contains("_hieuQuaDuKien_")) {
            otherOption.setReplacingCallback(new ReplaceWithHtmlEvaluator(deTai.getHieuQuaDuKien()));
            range.replace("_hieuQuaDuKien_","" ,otherOption);
        }
        //8. Nhu cầu kinh phí dự kiến
        if (texts.contains("_nhuCauKinhPhiDuKien_")) {
            range.replace("_nhuCauKinhPhiDuKien_", decimalFormat.format(new BigDecimal(deTai.getNhuCauKinhPhiDuKien())), options);
        }
        //9. Thời gian nghiên cứu dự kiến
        if (texts.contains("_thoiGianNghienCuuDuKien_")) {
            range.replace("_thoiGianNghienCuuDuKien_", deTai.getThoiGianNghienCuuDuKien() + "", options);
        }
        document.save(fileName, SaveFormat.DOCX);
        return new File(fileName).getAbsoluteFile();
    }

    @Override
    public File xuatThuyetMinhDeTai(DeTai deTai) throws Exception {
        applyALicense();
        Document document = new Document(getClass().getResourceAsStream("/bieumau/BM02.docx"));
        Document phuLucBM02 = new Document(getClass().getResourceAsStream("/bieumau/PHULUC.docx"));
        DocumentBuilder builder = new DocumentBuilder(document);

        String fileName = downloadFolder + "/BM02-" + deTai.getId()  + new Date().getTime() + ".docx";
        Range range = document.getDocument().getRange();
        String texts = range.getText();
        FindReplaceOptions options = new FindReplaceOptions(FindReplaceDirection.FORWARD);

        FindReplaceOptions otherOption = new FindReplaceOptions(FindReplaceDirection.FORWARD);

        char check = (char) Integer.parseInt("F052", 16);
        char unCheck = (char) Integer.parseInt("F0A3", 16);

        //Header
        if (texts.contains("_donVi_")) {
            if (deTai.getChuNhiemDeTai().getDonVi().isEmpty())
                range.replace("_donVi_", "", options);
            else
                range.replace("_donVi_", deTai.getChuNhiemDeTai().getDonVi(), options);
        }
        if (texts.contains("_nam_")) {
            if (deTai.getThoiGianQuyTrinh().getBatDauDangKy() == null)
                range.replace("_nam_", "", options);
            else
                range.replace("_nam_", String.valueOf(deTai.getThoiGianQuyTrinh().getBatDauDangKy().getYear() + 1900), options);
        }
        //1. Tên đề tài
        if (texts.contains("_tenDeTai_")) {
            if (deTai.getTenDeTai().isEmpty())
                range.replace("_tenDeTai_", "", options);
            else
                range.replace("_tenDeTai_", deTai.getTenDeTai(), options);
        }
        //2. Mã số
        if (texts.contains("_msLinhVuc_")) {
            if (deTai.getMaSoTheoLinhVucNghienCuu().isEmpty())
                range.replace("_msLinhVuc_", "", options);
            else
                range.replace("_msLinhVuc_", deTai.getMaSoTheoLinhVucNghienCuu(), options);
        }
        if (texts.contains("_msMucTieu_")) {
            if (deTai.getMaSoTheoMucTieuNghienCuu().isEmpty())
                range.replace("_msMucTieu_", "", options);
            else
                range.replace("_msMucTieu_", deTai.getMaSoTheoMucTieuNghienCuu(), options);
        }
        //3. Lĩnh vực nghiên cứu
        Table tableLinhVuc = (Table) document.getChild(NodeType.TABLE, 2, true);
        List<LinhVuc> linhVucs = linhVucRepository.getAllLinhVucsAndTrangThaiIsTrue();
        if (!linhVucs.isEmpty()) {
            for (int index = 0; index < linhVucs.size(); index = index + 3) {
                Row lastRow = tableLinhVuc.getLastRow();
                Row cloned = (Row) lastRow.deepClone(true);
                int j = 0;
                for (int i = 0; i < 6; i = i + 2) {
                    try {
                        LinhVuc linhVuc = linhVucs.get(index + j);
                        j++;
                        lastRow.getCells().get(i).getFirstParagraph().appendChild(new Run(document, linhVuc.getTenLinhVuc()));
                        builder.moveToCell(document.getChildNodes(NodeType.TABLE, true).indexOf(tableLinhVuc),
                                tableLinhVuc.getRows().indexOf(lastRow), i + 1, 0);
                        builder.getFont().setName("Wingdings 2");
                        builder.getFont().setSize(15);
                        if (deTai.getLinhVucNghienCuu().getMaLinhVuc().equals(linhVuc.getMaLinhVuc()))
                            builder.write(check + "");
                        else
                            builder.write(unCheck + "");
                    } catch (Exception ex) {
                        System.out.println("Đã có lỗi trong quá trình insert lĩnh vực nghiên cứu");
                    }

                }
                tableLinhVuc.appendChild(cloned);
            }
        }
        tableLinhVuc.getLastRow().remove();
        //4. Loại hình nghiên cứu
        Table tableLoaiHinh = (Table) document.getChild(NodeType.TABLE, 3, true);
        List<LoaiHinhNghienCuu> loaiHinhNghienCuus = loaiHinhNghienCuuRepository.getAllLoaiHinhNghienCuusAndTrangThaiIsTrue();
        if (!loaiHinhNghienCuus.isEmpty()) {
            for (int index = 0; index < loaiHinhNghienCuus.size(); index = index + 3) {
                Row loaiHinhRow = tableLoaiHinh.getRows().get(index / 3);
                Row lastRow = tableLoaiHinh.getLastRow();
                Row cloned = (Row) lastRow.deepClone(true);
                for (int i = 0; i <= 2; i++) {
                    try {
                        LoaiHinhNghienCuu loaiHinhNghienCuu = loaiHinhNghienCuus.get(index + i);
                        loaiHinhRow.getCells().get(i).getFirstParagraph().appendChild(new Run(document, loaiHinhNghienCuu.getTenLoaiHinh()));
                        builder.moveToCell(document.getChildNodes(NodeType.TABLE, true).indexOf(tableLoaiHinh),
                                tableLoaiHinh.getRows().indexOf(lastRow), i, 0);
                        builder.getFont().setName("Wingdings 2");
                        builder.getFont().setSize(15);
                        if (deTai.getLoaiHinhNghienCuu().getMaLoaiHinh().equals(loaiHinhNghienCuu.getMaLoaiHinh()))
                            builder.write(check + "");
                        else
                            builder.write(unCheck + "");
                    } catch (Exception ex) {
                        System.out.println("Đã có lỗi trong quá trình insert loại hình nghiên cứu");
                    }

                }
                tableLoaiHinh.appendChild(cloned);
            }
        }
        tableLoaiHinh.getLastRow().remove();
        //5. Thời gian thực hiện
        if (texts.contains("_thoiGianThucHien_")) {
            if (deTai.getThoiGianQuyTrinh().getBatDauThucHien() == null || deTai.getThoiGianQuyTrinh().getKetThucThucHien() == null)
                range.replace("_thoiGianThucHien_", "", options);
            else {
                long diff = deTai.getThoiGianQuyTrinh().getBatDauThucHien().getTime() - deTai.getThoiGianQuyTrinh().getKetThucThucHien().getTime();

                TimeUnit time = TimeUnit.DAYS;
                long diffrence = time.convert(diff, TimeUnit.MILLISECONDS) / 30;
                range.replace("_thoiGianThucHien_", diffrence + "", options);
            }
        }
        //7. Chủ nhiệm đề tài
        if (texts.contains("_hoTenCn_")) {
            if (deTai.getChuNhiemDeTai().getHoTen().isEmpty())
                range.replace("_hoTenCn_", "", options);
            else
                range.replace("_hoTenCn_", deTai.getChuNhiemDeTai().getHoTen(), options);
        }
        //TODO: lấy bên HRM
        //Học vị
//        if (texts.contains("_hocViCn_")) {
//            range.replace("_hocViCn_", deTai.getChuNhiemDeTai().getHoc(), options);
//        }
        //Chức danh khoa học
//        if (texts.contains("_chucDanhCn_")) {
//            range.replace("_chucDanhCn_", deTai.getChuNhiemDeTai().getC(), options);
//        }
        if (texts.contains("_namSinhCn_")) {
            if (deTai.getChuNhiemDeTai().getNgaySinh() == null)
                range.replace("_namSinhCn_", "", options);
            else
                range.replace("_namSinhCn_", String.valueOf(deTai.getChuNhiemDeTai().getNgaySinh().getYear() + 1900), options);
        }
        if (texts.contains("_donViCn_")) {
            if (deTai.getChuNhiemDeTai().getDonVi().isEmpty())
                range.replace("_donViCn_", "", options);
            else
                range.replace("_donViCn_", deTai.getChuNhiemDeTai().getDonVi(), options);
        }
        if (texts.contains("_dienThoaiCn_")) {
            if (deTai.getChuNhiemDeTai().getDienThoaiDiDong().isEmpty())
                range.replace("_dienThoaiCn_", "", options);
            else
                range.replace("_dienThoaiCn_", deTai.getChuNhiemDeTai().getDienThoaiDiDong(), options);
        }
        if (texts.contains("_emailCn_")) {
            if (deTai.getChuNhiemDeTai().getEmail().isEmpty())
                range.replace("_emailCn_", "", options);
            else
                range.replace("_emailCn_", deTai.getChuNhiemDeTai().getEmail(), options);
        }
        //8. Những thành viên tham gia nghiên cứu đề tài
        Table tableThanhVienThamGia = (Table) document.getChild(NodeType.TABLE, 4, true);
        List<ThanhVienCungThamGia> thanhVienCungThamGias = deTai.getThanhVienCungThamGias();
        if (!thanhVienCungThamGias.isEmpty()) {
            for (int index = 0; index < thanhVienCungThamGias.size(); index++) {
                Row lastRow = tableThanhVienThamGia.getLastRow();
                Row cloned = (Row) lastRow.deepClone(true);
                try {
                    ThanhVienCungThamGia thanhVienCungThamGia = thanhVienCungThamGias.get(index);
                    lastRow.getCells().get(0).getFirstParagraph().appendChild(new Run(document, index + 1 + ""));
                    lastRow.getCells().get(1).getFirstParagraph().appendChild(new Run(document, thanhVienCungThamGia.getHoTen()));
                    lastRow.getCells().get(2).getFirstParagraph().appendChild(new Run(document, thanhVienCungThamGia.getDonViCongTac()));
                    List<String> noiDungDuocGiaos = thanhVienCungThamGia.getNoiDungDuocGiaos();
                    StringBuilder noiDungDuocGiaoString = new StringBuilder();
                    for (int i = 0; i < noiDungDuocGiaos.size(); i++) {
                        noiDungDuocGiaoString.append("\n").append(thanhVienCungThamGia.getNoiDungDuocGiaos().get(i));
                    }
                    lastRow.getCells().get(3).getFirstParagraph().appendChild(new Run(document, noiDungDuocGiaoString.toString()));
                } catch (Exception ex) {
                    System.out.println("Đã có lỗi trong quá trình insert thành viên tham gia nghiên cứu");
                }
                tableThanhVienThamGia.appendChild(cloned);
            }
        }
        tableThanhVienThamGia.getLastRow().remove();
        //9. Đơn vị phối hợp chính
        Table tableDonViPhoiHop = (Table) document.getChild(NodeType.TABLE, 5, true);
        List<DonViPhoiHop> donViPhoiHops = deTai.getDonViPhoiHops();
        if (!donViPhoiHops.isEmpty()) {
            for (DonViPhoiHop donViPhoiHop : donViPhoiHops) {
                Row lastRow = tableDonViPhoiHop.getLastRow();
                Row cloned = (Row) lastRow.deepClone(true);
                try {
                    lastRow.getCells().get(0).getFirstParagraph().appendChild(new Run(document, donViPhoiHop.getTenDonVi()));
                    lastRow.getCells().get(1).getFirstParagraph().appendChild(new Run(document, donViPhoiHop.getNoiDungPhoiHop()));
                    lastRow.getCells().get(2).getFirstParagraph().appendChild(new Run(document, donViPhoiHop.getDaiDienDonVi()));
                } catch (Exception ex) {
                    System.out.println("Đã có lỗi trong quá trình insert đơn vị phối hợp chính");
                }
                tableDonViPhoiHop.appendChild(cloned);
            }
        }
        tableDonViPhoiHop.getLastRow().remove();
        //10. Tổng quan tình hình nghiên cứu thuộc lĩnh vực của đề tài ở trong và ngoài nước
        //10.1 Tình hình ngoài nước
        if (texts.contains("_tinhHinhNgoaiNuoc_")) {
            if (deTai.getTongQuanTinhHinhNghienCuu().getTinhHinhNgoaiNuoc().isEmpty())
                range.replace("_tinhHinhNgoaiNuoc_", "", options);
            else {
                otherOption.setReplacingCallback(new ReplaceWithHtmlEvaluator(deTai.getTongQuanTinhHinhNghienCuu().getTinhHinhNgoaiNuoc()));
                range.replace("_tinhHinhNgoaiNuoc_", "" ,otherOption);
            }
        }
        //10.2 Tình hình trong nước
        if (texts.contains("_tinhHinhTrongNuoc_")) {
            if (deTai.getTongQuanTinhHinhNghienCuu().getTinhHinhTrongNuoc().isEmpty())
                range.replace("_tinhHinhTrongNuoc_", "", options);
            else {
                otherOption.setReplacingCallback(new ReplaceWithHtmlEvaluator(deTai.getTongQuanTinhHinhNghienCuu().getTinhHinhTrongNuoc()));
                range.replace("_tinhHinhTrongNuoc_", "" ,otherOption);
            }
        }
        //10.3 Thành tựu
        if (texts.contains("_thanhTuu_")) {
            if (deTai.getTongQuanTinhHinhNghienCuu().getThanhTuu().isEmpty())
                range.replace("_thanhTuu_", "", options);
            else {
                otherOption.setReplacingCallback(new ReplaceWithHtmlEvaluator(deTai.getTongQuanTinhHinhNghienCuu().getThanhTuu()));
                range.replace("_thanhTuu_", "" ,otherOption);
            }
        }
        //11. Tính cấp thiết
        if (texts.contains("_tinhCapThiet_")) {
            if (deTai.getTinhCapThiet().isEmpty())
                range.replace("_tinhCapThiet_", "", options);
            else {
                otherOption.setReplacingCallback(new ReplaceWithHtmlEvaluator(deTai.getTinhCapThiet()));
                range.replace("_tinhCapThiet_", "" ,otherOption);
            }
        }
        //12. Mục tiêu
        if (texts.contains("_mucTieu_")) {
            if (deTai.getMucTieu().isEmpty())
                range.replace("_mucTieu_", "", options);
            else {
                otherOption.setReplacingCallback(new ReplaceWithHtmlEvaluator(deTai.getMucTieu()));
                range.replace("_mucTieu_", "" ,otherOption);
            }
        }
        //13.1 Đối tượng nghiên cứu
        if (texts.contains("_doiTuong_")) {
            if (deTai.getDoiTuongNghienCuu().isEmpty())
                range.replace("_doiTuong_", "", options);
            else {
                otherOption.setReplacingCallback(new ReplaceWithHtmlEvaluator(deTai.getDoiTuongNghienCuu()));
                range.replace("_doiTuong_", "" ,otherOption);
            }
        }
        //13.2 Phạm vi nghiên cứu
        if (texts.contains("_phamVi_")) {
            if (deTai.getPhamViNghienCuu().isEmpty())
                range.replace("_phamVi_", "", options);
            else {
                otherOption.setReplacingCallback(new ReplaceWithHtmlEvaluator(deTai.getPhamViNghienCuu()));
                range.replace("_phamVi_", "" ,otherOption);
            }
        }
        //14.1 Cách tiếp cận
        if (texts.contains("_cachTiepCan_")) {
            if (deTai.getCachTiepCan().isEmpty())
                range.replace("_cachTiepCan_", "", options);
            else {
                otherOption.setReplacingCallback(new ReplaceWithHtmlEvaluator(deTai.getCachTiepCan()));
                range.replace("_cachTiepCan_", "" ,otherOption);
            }
        }
        //14.2 Phương pháp nghiên cứu
        if (texts.contains("_phuongPhapNghienCuu_")) {
            if (deTai.getPhuongPhapNghienCuu().isEmpty())
                range.replace("_phuongPhapNghienCuu_", "", options);
            else {
                otherOption.setReplacingCallback(new ReplaceWithHtmlEvaluator(deTai.getPhuongPhapNghienCuu()));
                range.replace("_phuongPhapNghienCuu_", "" ,otherOption);
            }
        }
        //15.1 Nội dung nghiên cứu
        if (texts.contains("_noiDungNghienCuu_")) {
            if (deTai.getNoiDungNghienCuu().isEmpty())
                range.replace("_noiDungNghienCuu_", "", options);
            else {
                otherOption.setReplacingCallback(new ReplaceWithHtmlEvaluator(deTai.getNoiDungNghienCuu()));
                range.replace("_noiDungNghienCuu_", "" ,otherOption);
            }
        }
        //15.2 Tiến độ thực hiện
        Table tableTienDoThucHien = (Table) document.getChild(NodeType.TABLE, 6, true);
        List<TienDoThucHien> tienDoThucHiens = deTai.getTienDoThucHiens();
        if (!tienDoThucHiens.isEmpty()) {
            for (int index = 0; index < tienDoThucHiens.size(); index++) {
                Row lastRow = tableTienDoThucHien.getLastRow();
                Row cloned = (Row) lastRow.deepClone(true);
                try {
                    TienDoThucHien tienDoThucHien = tienDoThucHiens.get(index);
                    lastRow.getCells().get(0).getFirstParagraph().appendChild(new Run(document, index + 1 + ""));
                    lastRow.getCells().get(1).getFirstParagraph().appendChild(new Run(document, tienDoThucHien.getNoiDung()));
                    lastRow.getCells().get(2).getFirstParagraph().appendChild(new Run(document, tienDoThucHien.getSanPham()));
                    lastRow.getCells().get(3).getFirstParagraph().appendChild(new Run(document, tienDoThucHien.getThoiGian() + " tháng"));
                    lastRow.getCells().get(4).getFirstParagraph().appendChild(new Run(document, tienDoThucHien.getNguoiThucHien()));
                } catch (Exception ex) {
                    System.out.println("Đã có lỗi trong quá trình insert tiến độ thực hiện");
                }
                tableTienDoThucHien.appendChild(cloned);
            }
        }
        tableTienDoThucHien.getLastRow().remove();
        //16. Sản phẩm
        //16.1 -> 16.3
        Table tableSanPham = (Table) document.getChild(NodeType.TABLE, 7, true);
        int sizeAllLoaiSanPham = EnumLoaiSanPham.values().length;
        for(int i=0; i<sizeAllLoaiSanPham; i++){
            String loaiSanPham = "";
            if (EnumLoaiSanPham.values()[i].equals(EnumLoaiSanPham.DAO_TAO)) {
                loaiSanPham = "Sản phẩm đào tạo";
            } else if (EnumLoaiSanPham.values()[i].equals(EnumLoaiSanPham.KHOA_HOC)) {
                loaiSanPham = "Sản phẩm khoa học";
            } else loaiSanPham = "Sản phẩm ứng dụng";
            int dem = i+1;
            Row last = tableSanPham.getLastRow();
            Row cloneD = (Row) last.deepClone(true);
            last.getCells().get(0).getFirstParagraph().appendChild(new Run(document, "16."+dem+"."));
            last.getCells().get(1).getFirstParagraph().appendChild(new Run(document, loaiSanPham));
            tableSanPham.appendChild(cloneD);

            List<SanPham> sanPhams = sanPhamService.getAllByLoaiSanPhamAndTrangThaiTrue(EnumLoaiSanPham.values()[i].name());
            List<SanPham> sanPhamDeTais = new ArrayList<>();
            if (loaiSanPham.equals("Sản phẩm khoa học")) {
                if (!deTai.getSanPhamKhoaHocs().isEmpty()) {
                    for (ChiTietSanPham chiTietSanPham : deTai.getSanPhamKhoaHocs()) {
                        sanPhamDeTais.add(chiTietSanPham.getSanPham());
                    }
                }
            } else if (loaiSanPham.equals("Sản phẩm đào tạo")) {
                if (!deTai.getSanPhamDaoTaos().isEmpty()) {
                    for (ChiTietSanPham chiTietSanPham : deTai.getSanPhamDaoTaos()) {
                        sanPhamDeTais.add(chiTietSanPham.getSanPham());
                    }
                }
            } else if (loaiSanPham.equals("Sản phẩm ứng dụng")) {
                if (!deTai.getSanPhamUngDungs().isEmpty()) {
                    for (ChiTietSanPham chiTietSanPham : deTai.getSanPhamUngDungs()) {
                        sanPhamDeTais.add(chiTietSanPham.getSanPham());
                    }
                }
            }
            if (!sanPhams.isEmpty()) {
                for (int index = 0; index < sanPhams.size(); index += 3) {
                    Row lastR = tableSanPham.getLastRow();
                    Row cloneR = (Row) lastR.deepClone(true);
                    int k = 0;
                    for (int j = 1; j < 6; j += 2) {
                        int indexK = index + k;
                        if (indexK < sanPhams.size()) {
                            SanPham sanPham = sanPhams.get(indexK);
                            k++;
                            lastR.getCells().get(j).getFirstParagraph().appendChild(new Run(document, sanPham.getTenSanPham()));
                            builder.moveToCell(document.getChildNodes(NodeType.TABLE, true).indexOf(tableSanPham),
                                    tableSanPham.getRows().indexOf(lastR), j + 1, 0);
                            builder.getFont().setName("Wingdings 2");
                            builder.getFont().setSize(15);
                            if(!sanPhamDeTais.isEmpty()) {
                                for (SanPham sanPhamDeTai : sanPhamDeTais) {
                                    if (sanPhamDeTai.getId().equals(sanPham.getId())) {
                                        builder.write(check + "");
                                    } else {
                                        builder.write(unCheck + "");
                                    }
                                }
                            }else {
                                builder.write(unCheck+"");
                            }
                        }

                    }
                    tableSanPham.appendChild(cloneR);
                }
            }
        }
        tableSanPham.getLastRow().remove();
        //16.4
        Table tableSanPhamKhac = (Table) document.getChild(NodeType.TABLE, 8, true);
        List<ChiTietSanPhamKhac> sanPhamKhacs = deTai.getSanPhamKhacs();
        if(!sanPhamKhacs.isEmpty()){
            for(int i=0; i<sanPhamKhacs.size(); i+=3){
                Row lastS = tableSanPhamKhac.getLastRow();
                Row cloneS = (Row) lastS.deepClone(true);
                int k = 0;
                for (int j = 1; j < 6; j += 2) {
                    int indexK = i + k;
                    if(indexK < sanPhamKhacs.size()) {

                        ChiTietSanPhamKhac chiTietSanPhamKhac = sanPhamKhacs.get(indexK);
                        k++;
                        lastS.getCells().get(j).getFirstParagraph().appendChild(new Run(document, chiTietSanPhamKhac.getSanPham()));
                        builder.moveToCell(document.getChildNodes(NodeType.TABLE, true).indexOf(tableSanPhamKhac),
                                tableSanPhamKhac.getRows().indexOf(lastS), j + 1, 0);
                        builder.getFont().setName("Wingdings 2");
                        builder.getFont().setSize(15);
                        builder.write(check+"");
                    }
                }
                tableSanPhamKhac.appendChild(cloneS);
            }

        }
        tableSanPhamKhac.getLastRow().remove();

        //16.5 Table chi tiết sản phẩm
        Table tableChiTietSanPham = (Table) document.getChild(NodeType.TABLE, 9, true);
        for (int i = 0; i < 4; i++) {
            Row rowL = tableChiTietSanPham.getLastRow();
            Row cloneRowL = (Row) rowL.deepClone(true);
            String loaiSanPham = "";
            if (i == 0) {
                loaiSanPham = "Sản phẩm khoa học";
            } else if (i == 1) {
                loaiSanPham = "Sản phẩm ứng dụng";
            } else if (i == 2) {
                loaiSanPham = "Sản phẩm đào tạo";
            } else {
                loaiSanPham = "Sản phẩm khác";
            }
            rowL.getCells().get(0).getFirstParagraph().getParagraphFormat().setAlignment(ParagraphAlignment.LEFT);
            rowL.getCells().get(0).getFirstParagraph().appendChild(new Run(document, i + 1 + ""));
            rowL.getCells().get(1).getFirstParagraph().getParagraphFormat().setAlignment(ParagraphAlignment.LEFT);
            rowL.getCells().get(1).getFirstParagraph().appendChild(new Run(document, loaiSanPham));
            mergeCells(rowL.getCells().get(1), rowL.getCells().get(3));
            tableChiTietSanPham.appendChild(cloneRowL);

            Cell startCell = tableChiTietSanPham.getLastRow().getFirstCell();
            Cell endCell = new Cell(document);

            int sizeChiTietSanPham = 0;
            if (i == 0) {
                sizeChiTietSanPham = deTai.getSanPhamKhoaHocs().size();
                for (int k = 0; k < sizeChiTietSanPham; k++) {
                    ChiTietSanPham sanPhamKhoaHoc = deTai.getSanPhamKhoaHocs().get(k);
                    Row last = tableChiTietSanPham.getLastRow();
                    Row cloneD = (Row) last.deepClone(true);
                    last.getCells().get(1).getFirstParagraph().getParagraphFormat().setAlignment(ParagraphAlignment.CENTER);
                    last.getCells().get(1).getFirstParagraph().appendChild(new Run(document, sanPhamKhoaHoc.getSanPham().getTenSanPham()));
                    last.getCells().get(2).getFirstParagraph().getParagraphFormat().setAlignment(ParagraphAlignment.CENTER);
                    last.getCells().get(2).getFirstParagraph().appendChild(new Run(document, sanPhamKhoaHoc.getSoLuong() + ""));
                    last.getCells().get(3).getFirstParagraph().getParagraphFormat().setAlignment(ParagraphAlignment.CENTER);
                    last.getCells().get(3).getFirstParagraph().appendChild(new Run(document, sanPhamKhoaHoc.getYeuCauKhoaHocDatDuoc()));
                    endCell = tableChiTietSanPham.getLastRow().getFirstCell();
                    tableChiTietSanPham.appendChild(cloneD);

                }
            } else if (i == 1) {
                sizeChiTietSanPham = deTai.getSanPhamDaoTaos().size();
                for (int k = 0; k < sizeChiTietSanPham; k++) {
                    ChiTietSanPham sanPhamDaoTao = deTai.getSanPhamDaoTaos().get(k);

                    Row last = tableChiTietSanPham.getLastRow();
                    Row cloneD = (Row) last.deepClone(true);

                    last.getCells().get(1).getFirstParagraph().getParagraphFormat().setAlignment(ParagraphAlignment.CENTER);
                    last.getCells().get(1).getFirstParagraph().appendChild(new Run(document, sanPhamDaoTao.getSanPham().getTenSanPham()));
                    last.getCells().get(2).getFirstParagraph().getParagraphFormat().setAlignment(ParagraphAlignment.CENTER);
                    last.getCells().get(2).getFirstParagraph().appendChild(new Run(document, sanPhamDaoTao.getSoLuong() + ""));
                    last.getCells().get(3).getFirstParagraph().getParagraphFormat().setAlignment(ParagraphAlignment.CENTER);
                    last.getCells().get(3).getFirstParagraph().appendChild(new Run(document, sanPhamDaoTao.getYeuCauKhoaHocDatDuoc()));

                    endCell = tableChiTietSanPham.getLastRow().getFirstCell();

                    tableChiTietSanPham.appendChild(cloneD);
                }
            } else if (i == 2) {
                sizeChiTietSanPham = deTai.getSanPhamUngDungs().size();
                for (int k = 0; k < sizeChiTietSanPham; k++) {
                    ChiTietSanPham sanPhamUngDung = deTai.getSanPhamUngDungs().get(k);

                    Row last = tableChiTietSanPham.getLastRow();
                    Row cloneD = (Row) last.deepClone(true);
                    last.getCells().get(1).getFirstParagraph().getParagraphFormat().setAlignment(ParagraphAlignment.CENTER);
                    last.getCells().get(1).getFirstParagraph().appendChild(new Run(document, sanPhamUngDung.getSanPham().getTenSanPham()));
                    last.getCells().get(2).getFirstParagraph().getParagraphFormat().setAlignment(ParagraphAlignment.CENTER);
                    last.getCells().get(2).getFirstParagraph().appendChild(new Run(document, sanPhamUngDung.getSoLuong() + ""));
                    last.getCells().get(3).getFirstParagraph().getParagraphFormat().setAlignment(ParagraphAlignment.CENTER);
                    last.getCells().get(3).getFirstParagraph().appendChild(new Run(document, sanPhamUngDung.getYeuCauKhoaHocDatDuoc()));
                    endCell = tableChiTietSanPham.getLastRow().getFirstCell();

                    tableChiTietSanPham.appendChild(cloneD);
                }

            } else {
                sizeChiTietSanPham = deTai.getSanPhamKhacs().size();
                for (int k = 0; k < sizeChiTietSanPham; k++) {
                    ChiTietSanPhamKhac sanPhamKhac = deTai.getSanPhamKhacs().get(k);

                    Row last = tableChiTietSanPham.getLastRow();
                    Row cloneD = (Row) last.deepClone(true);
                    last.getCells().get(1).getFirstParagraph().getParagraphFormat().setAlignment(ParagraphAlignment.CENTER);
                    last.getCells().get(1).getFirstParagraph().appendChild(new Run(document, sanPhamKhac.getSanPham()));
                    last.getCells().get(2).getFirstParagraph().getParagraphFormat().setAlignment(ParagraphAlignment.CENTER);
                    last.getCells().get(2).getFirstParagraph().appendChild(new Run(document, sanPhamKhac.getSoLuong() + ""));
                    last.getCells().get(3).getFirstParagraph().getParagraphFormat().setAlignment(ParagraphAlignment.CENTER);
                    last.getCells().get(3).getFirstParagraph().appendChild(new Run(document, sanPhamKhac.getYeuCauKhoaHocDatDuoc()));
                    endCell = tableChiTietSanPham.getLastRow().getFirstCell();

                    tableChiTietSanPham.appendChild(cloneD);
                }
            }
            if (sizeChiTietSanPham > 1) {
                mergeCells(startCell, endCell);
            }
        }
        tableChiTietSanPham.getLastRow().remove();
        //17. Hiệu quả
        if (texts.contains("_hieuQua_")) {
            if (deTai.getHieuQua().isEmpty())
                range.replace("_hieuQua_", "", options);
            else {
                otherOption.setReplacingCallback(new ReplaceWithHtmlEvaluator(deTai.getHieuQua()));
                range.replace("_hieuQua_", "" ,otherOption);
            }
        }
        //18. Phương thức chuyển giao kết quả nghiên và địa chỉ ứng dụng
        if (texts.contains("_chuyenGiaoUngDung_")) {
            if (deTai.getChuyenGiaoVaUngDung().isEmpty())
                range.replace("_chuyenGiaoUngDung_", "", options);
            else {
                otherOption.setReplacingCallback(new ReplaceWithHtmlEvaluator(deTai.getChuyenGiaoVaUngDung()));
                range.replace("_chuyenGiaoUngDung_", "" ,otherOption);
            }
        }
        //19. Kinh phí thực hiện đề tài và nguồn kinh phí

        if (texts.contains("_tongKinhPhi_")) {
                range.replace("_tongKinhPhi_", decimalFormat.format(deTai.getKinhPhiDuKien().getTongKinhPhi()) ,options);
        }
        if (texts.contains("_NSNN_")) {
            range.replace("_NSNN_", decimalFormat.format(deTai.getKinhPhiDuKien().getNganSachNhaNuoc()) ,options);
        }

        if (texts.contains("_kinhPhiKhac_")) {
            range.replace("_kinhPhiKhac_", decimalFormat.format(deTai.getKinhPhiDuKien().getNguonKinhPhiKhac()) ,options);
        }

        Table tableKhoanChi = (Table) document.getChild(NodeType.TABLE, 10, true);
        List<ChiTietKinhPhiDuKien> chiTietKinhPhiDuKiens = deTai.getChiTietKinhPhiDuKiens();
        double tongCongKinhPhi = 0;
        double tongCongNSNN = 0;
        double tongCongNguonKhac = 0;
        for(int i=0; i<chiTietKinhPhiDuKiens.size(); i++){
            Row last = tableKhoanChi.getLastRow();
            Row cloneD = (Row) last.deepClone(true);

            ChiTietKinhPhiDuKien chiTietKinhPhiDuKien = chiTietKinhPhiDuKiens.get(i);
            tongCongKinhPhi+= chiTietKinhPhiDuKien.getTongKinhPhi();
            tongCongNguonKhac+= chiTietKinhPhiDuKien.getNguonKinhPhiKhac();
            tongCongNSNN+= chiTietKinhPhiDuKien.getNganSachNhaNuoc();

            last.getCells().get(0).getFirstParagraph().appendChild(new Run(document, ReadNumber.getRomanNumerals(i+1)));
            last.getCells().get(1).getFirstParagraph().appendChild(new Run(document, chiTietKinhPhiDuKien.getLoaiKinhPhi().getTenLoaiKinhPhi()));
            last.getCells().get(2).getFirstParagraph().appendChild(new Run(document, decimalFormat.format(chiTietKinhPhiDuKien.getTongKinhPhi())+""));
            last.getCells().get(3).getFirstParagraph().appendChild(new Run(document, decimalFormat.format(chiTietKinhPhiDuKien.getNganSachNhaNuoc())+""));
            last.getCells().get(4).getFirstParagraph().appendChild(new Run(document, decimalFormat.format(chiTietKinhPhiDuKien.getNguonKinhPhiKhac())+""));
            last.getCells().get(5).getFirstParagraph().appendChild(new Run(document, chiTietKinhPhiDuKien.getGhiChu()));
            tableKhoanChi.appendChild(cloneD);
        }
        Row rowLast = tableKhoanChi.getLastRow();
        Row cloneRL = (Row) rowLast.deepClone(true);

        rowLast.getCells().get(1).getFirstParagraph().appendChild(new Run(document, "Tổng cộng"));
        rowLast.getCells().get(2).getFirstParagraph().appendChild(new Run(document, decimalFormat.format(tongCongKinhPhi)+""));
        rowLast.getCells().get(3).getFirstParagraph().appendChild(new Run(document, decimalFormat.format(tongCongNSNN)+""));
        rowLast.getCells().get(4).getFirstParagraph().appendChild(new Run(document, decimalFormat.format(tongCongNguonKhac)+""));
        tableKhoanChi.appendChild(cloneRL);
        tableKhoanChi.getLastRow().remove();

        //Phục lục
        document.appendDocument(phuLucBM02, ImportFormatMode.KEEP_SOURCE_FORMATTING);
        int tableIndex = 11;
        for(int k=0; k<chiTietKinhPhiDuKiens.size(); k++){
            ChiTietKinhPhiDuKien chiTietKinhPhiDuKien = chiTietKinhPhiDuKiens.get(k);

            if(chiTietKinhPhiDuKien.getLoaiKinhPhi().getTenLoaiKinhPhi().equals("Chi công lao động tham gia trực tiếp thực hiện đề tài")){
                Table tablePhuLucChiCongLaoDong = (Table) document.getChild(NodeType.TABLE, tableIndex, true);
                if(chiTietKinhPhiDuKien.getTongKinhPhi() != 0) {
                    List<ChiTietKhoanChi> chiTietKhoanChis = chiTietKinhPhiDuKien.getChiTietKhoanChis();
                    for (int l = 0; l < chiTietKhoanChis.size(); l++) {
                        Row last = tablePhuLucChiCongLaoDong.getLastRow();
                        Row cloneD = (Row) last.deepClone(true);
                        ChiTietKhoanChi chiTietKhoanChi = chiTietKhoanChis.get(l);

                        NodeCollection runs = tablePhuLucChiCongLaoDong.getChildNodes(NodeType.RUN, true);
                        for (int m = 0; m < runs.getCount(); m++) {
                            Run run = (Run) runs.get(m);
                            run.getFont().setName("Times New Roman");
                        }
                        last.getCells().get(0).getFirstParagraph().appendChild(new Run(document, l + 1 + ""));
                        last.getCells().get(1).getFirstParagraph().appendChild(new Run(document, chiTietKhoanChi.getNoiDungChi()));
                        last.getCells().get(2).getFirstParagraph().appendChild(new Run(document, chiTietKhoanChi.getDuKienKetQua()));
                        last.getCells().get(3).getFirstParagraph().appendChild(new Run(document, dateFormat.format(chiTietKhoanChi.getThoiGian()) + ""));
                        last.getCells().get(4).getFirstParagraph().appendChild(new Run(document, decimalFormat.format(chiTietKhoanChi.getThanhTien()) + ""));
                        last.getCells().get(5).getFirstParagraph().appendChild(new Run(document, decimalFormat.format(chiTietKhoanChi.getNganSachNhaNuoc()) + ""));
                        last.getCells().get(6).getFirstParagraph().appendChild(new Run(document, decimalFormat.format(chiTietKhoanChi.getNguonKinhPhiKhac()) + ""));
                        last.getCells().get(7).getFirstParagraph().appendChild(new Run(document, chiTietKhoanChi.getGhiChu()));
                        tablePhuLucChiCongLaoDong.appendChild(cloneD);

                    }
                    tablePhuLucChiCongLaoDong.getLastRow().remove();
                    tableIndex++;
                }else {
                    tablePhuLucChiCongLaoDong.remove();
                }
            }else if(chiTietKinhPhiDuKien.getLoaiKinhPhi().getTenLoaiKinhPhi().equals("Chi mua nguyên nhiên vật liệu, tài liệu tham khảo")){
                Table tablePhuLucChiNguyenLieu = (Table) document.getChild(NodeType.TABLE, tableIndex, true);
                if(chiTietKinhPhiDuKien.getTongKinhPhi() != 0) {
                    List<ChiTietKhoanChi> chiTietKhoanChis = chiTietKinhPhiDuKien.getChiTietKhoanChis();
                    for (int l = 0; l < chiTietKhoanChis.size(); l++) {
                        Row last = tablePhuLucChiNguyenLieu.getLastRow();
                        Row cloneD = (Row) last.deepClone(true);
                        ChiTietKhoanChi chiTietKhoanChi = chiTietKhoanChis.get(l);

                        NodeCollection runs = tablePhuLucChiNguyenLieu.getChildNodes(NodeType.RUN, true);
                        for (int m = 0; m < runs.getCount(); m++) {
                            Run run = (Run) runs.get(m);
                            run.getFont().setName("Times New Roman");
                        }
                        last.getCells().get(0).getFirstParagraph().appendChild(new Run(document, l + 1 + ""));
                        last.getCells().get(1).getFirstParagraph().appendChild(new Run(document, chiTietKhoanChi.getNoiDungChi()));
                        last.getCells().get(2).getFirstParagraph().appendChild(new Run(document, chiTietKhoanChi.getDonViTinh()));
                        last.getCells().get(3).getFirstParagraph().appendChild(new Run(document, chiTietKhoanChi.getSoLuong() + ""));
                        last.getCells().get(4).getFirstParagraph().appendChild(new Run(document, decimalFormat.format(chiTietKhoanChi.getDonGia()) + ""));
                        last.getCells().get(5).getFirstParagraph().appendChild(new Run(document, decimalFormat.format(chiTietKhoanChi.getThanhTien()) + ""));
                        last.getCells().get(6).getFirstParagraph().appendChild(new Run(document, decimalFormat.format(chiTietKhoanChi.getNganSachNhaNuoc()) + ""));
                        last.getCells().get(7).getFirstParagraph().appendChild(new Run(document, decimalFormat.format(chiTietKhoanChi.getNguonKinhPhiKhac()) + ""));
                        last.getCells().get(8).getFirstParagraph().appendChild(new Run(document, chiTietKhoanChi.getGhiChu()));
                        tablePhuLucChiNguyenLieu.appendChild(cloneD);

                    }
                    tablePhuLucChiNguyenLieu.getLastRow().remove();
                    tableIndex++;
                }else {
                    tablePhuLucChiNguyenLieu.remove();
                }
            }else if(chiTietKinhPhiDuKien.getLoaiKinhPhi().getTenLoaiKinhPhi().equals("Chi bảo trì sữa chữa, mua sắm tài sản cố định")){
                Table tablePhuLucChiBaoTri = (Table) document.getChild(NodeType.TABLE, tableIndex, true);
                if(chiTietKinhPhiDuKien.getTongKinhPhi() != 0) {
                    List<ChiTietKhoanChi> chiTietKhoanChis = chiTietKinhPhiDuKien.getChiTietKhoanChis();
                    for (int l = 0; l < chiTietKhoanChis.size(); l++) {
                        Row last = tablePhuLucChiBaoTri.getLastRow();
                        Row cloneD = (Row) last.deepClone(true);
                        ChiTietKhoanChi chiTietKhoanChi = chiTietKhoanChis.get(l);

                        NodeCollection runs = tablePhuLucChiBaoTri.getChildNodes(NodeType.RUN, true);
                        for (int m = 0; m < runs.getCount(); m++) {
                            Run run = (Run) runs.get(m);
                            run.getFont().setName("Times New Roman");
                        }
                        last.getCells().get(0).getFirstParagraph().appendChild(new Run(document, l + 1 + ""));
                        last.getCells().get(1).getFirstParagraph().appendChild(new Run(document, chiTietKhoanChi.getNoiDungChi()));
                        last.getCells().get(2).getFirstParagraph().appendChild(new Run(document, chiTietKhoanChi.getDonViTinh()));
                        last.getCells().get(3).getFirstParagraph().appendChild(new Run(document, chiTietKhoanChi.getSoLuong() + ""));
                        last.getCells().get(4).getFirstParagraph().appendChild(new Run(document, decimalFormat.format(chiTietKhoanChi.getDonGia()) + ""));
                        last.getCells().get(5).getFirstParagraph().appendChild(new Run(document, decimalFormat.format(chiTietKhoanChi.getThanhTien()) + ""));
                        last.getCells().get(6).getFirstParagraph().appendChild(new Run(document, decimalFormat.format(chiTietKhoanChi.getNganSachNhaNuoc()) + ""));
                        last.getCells().get(7).getFirstParagraph().appendChild(new Run(document, decimalFormat.format(chiTietKhoanChi.getNguonKinhPhiKhac()) + ""));
                        last.getCells().get(8).getFirstParagraph().appendChild(new Run(document, chiTietKhoanChi.getGhiChu()));
                        tablePhuLucChiBaoTri.appendChild(cloneD);

                    }
                    tablePhuLucChiBaoTri.getLastRow().remove();
                    tableIndex++;
                }else {
                    tablePhuLucChiBaoTri.remove();
                }
            }else{
                Table tablePhuLucKhac = (Table) document.getChild(NodeType.TABLE, tableIndex, true);
                if(chiTietKinhPhiDuKien.getTongKinhPhi() != 0) {
                    List<ChiTietKhoanChi> chiTietKhoanChis = chiTietKinhPhiDuKien.getChiTietKhoanChis();
                    for (int l = 0; l < chiTietKhoanChis.size(); l++) {
                        Row last = tablePhuLucKhac.getLastRow();
                        Row cloneD = (Row) last.deepClone(true);
                        ChiTietKhoanChi chiTietKhoanChi = chiTietKhoanChis.get(l);

                        NodeCollection runs = tablePhuLucKhac.getChildNodes(NodeType.RUN, true);
                        for (int m = 0; m < runs.getCount(); m++) {
                            Run run = (Run) runs.get(m);
                            run.getFont().setName("Times New Roman");
                        }
                        last.getCells().get(0).getFirstParagraph().appendChild(new Run(document, l + 1 + ""));
                        last.getCells().get(1).getFirstParagraph().appendChild(new Run(document, chiTietKhoanChi.getNoiDungChi()));
                        last.getCells().get(2).getFirstParagraph().appendChild(new Run(document, dateFormat.format(chiTietKhoanChi.getThoiGian())+ ""));
                        last.getCells().get(3).getFirstParagraph().appendChild(new Run(document, decimalFormat.format(chiTietKhoanChi.getTongKinhPhi()) + ""));
                        last.getCells().get(4).getFirstParagraph().appendChild(new Run(document, decimalFormat.format(chiTietKhoanChi.getNganSachNhaNuoc()) + ""));
                        last.getCells().get(5).getFirstParagraph().appendChild(new Run(document, decimalFormat.format(chiTietKhoanChi.getNguonKinhPhiKhac()) + ""));
                        last.getCells().get(6).getFirstParagraph().appendChild(new Run(document, chiTietKhoanChi.getGhiChu()));
                        tablePhuLucKhac.appendChild(cloneD);

                    }
                    tablePhuLucKhac.getLastRow().remove();
                }else {
                    tablePhuLucKhac.remove();
                }
            }
        }
        document.save(fileName, SaveFormat.DOCX);
        return new File(fileName).getAbsoluteFile();
    }

    @Override
    public File xuatDanhGiaThuyetMinhDeTai(DeTai deTai, HoiDongXetDuyet hoiDongXetDuyet, CauHinhBieuMau cauHinhBieuMau) throws Exception {
        applyALicense();
        Document document = new Document();
        Document bieuMau03 = new Document(getClass().getResourceAsStream("/bieumau/BM03.docx"));
        DocumentBuilder builder = new DocumentBuilder(document);
        String fileName = downloadFolder + "/BM03-" + hoiDongXetDuyet.getId()+"-"   + new Date().getTime() + ".docx";
        LocalDate current = LocalDate.now();
        FindReplaceOptions options = new FindReplaceOptions(FindReplaceDirection.FORWARD);

        document.removeAllChildren();
        for (ThanhVienHoiDongXetDuyet thanhVienHoiDongXetDuyet : hoiDongXetDuyet.getThanhVienHoiDongs()) {
            Range range = document.getDocument().getRange();
            document.appendDocument(bieuMau03, ImportFormatMode.KEEP_SOURCE_FORMATTING);
            String texts = range.getText();
            if(texts.contains("_ngay_")){
                range.replace("_ngay_", current.getDayOfMonth() +"", options);
            }
            if(texts.contains("_thang_")){
                range.replace("_thang_", current.getMonth().getValue() +"", options);
            }
            if(texts.contains("_nam_")){
                range.replace("_nam_", current.getYear() +"", options);
            }
            if (texts.contains("_tenThanhVienHoiDongXetDuyet_")) {
                range.replace("_tenThanhVienHoiDongXetDuyet_", thanhVienHoiDongXetDuyet.getThanhVien().getHoTen(), options);
            }
            if (texts.contains("_tenDeTai_")) {
                range.replace("_tenDeTai_", deTai.getTenDeTai(), options);
            }
            if (texts.contains("_chuNhiemDeTai_")) {
                range.replace("_chuNhiemDeTai_", deTai.getChuNhiemDeTai().getHoTen(), options);
            }
            if (texts.contains("_soQuyetDinh_")) {
                range.replace("_soQuyetDinh_", hoiDongXetDuyet.getSoQuyetDinh(), options);
            }
            if (texts.contains("_coQuanChuTri_")) {
                range.replace("_coQuanChuTri_", cauHinhBieuMau.getCoQuanChuTri(), options);
            }
            if (texts.contains("_ngayHop_")) {
                range.replace("_ngayHop_", dateFormat.format(hoiDongXetDuyet.getNgayHop())+ "", options);
            }
            if (texts.contains("_diaDiem_")) {
                range.replace("_diaDiem_", hoiDongXetDuyet.getDiaDiem() + "", options);
            }
        }
        document.getFirstSection().getBody().getFirstParagraph().remove();
        document.getLastSection().getBody().getFirstParagraph().remove();
        document.save(fileName, SaveFormat.DOCX);
        return new File(fileName).getAbsoluteFile();
    }

    @Override
    public File xuatBienBanHopHoiDongTuyenChon(BienBanHoiDongXetDuyet bienBanHoiDongXetDuyet, CauHinhBieuMau cauHinhBieuMau) throws Exception {
        DeTai deTai = bienBanHoiDongXetDuyet.getDeTai();
        HoiDongXetDuyet hoiDongXetDuyet = bienBanHoiDongXetDuyet.getHoiDongXetDuyet();
        applyALicense();
        Document document = new Document(getClass().getResourceAsStream("/bieumau/BM04.docx"));
        DocumentBuilder builder = new DocumentBuilder(document);
        String fileName = downloadFolder + "/BM04-" + hoiDongXetDuyet.getId()  + new Date().getTime() + ".docx";
        Range range = document.getDocument().getRange();
        String texts = range.getText();
        LocalDate current = LocalDate.now();
        FindReplaceOptions options = new FindReplaceOptions(FindReplaceDirection.FORWARD);

        if(texts.contains("_ngay_")){
            range.replace("_ngay_", current.getDayOfMonth() +"", options);
        }
        if(texts.contains("_thang_")){
            range.replace("_thang_", current.getMonth().getValue() +"", options);
        }
        if(texts.contains("_nam_")){
            range.replace("_nam_", current.getYear() +"", options);
        }
        if (texts.contains("_tenDeTai_")) {
            range.replace("_tenDeTai_", deTai.getTenDeTai(), options);
        }
        if (texts.contains("_chuNhiemDeTai_")) {
            range.replace("_chuNhiemDeTai_", deTai.getChuNhiemDeTai().getHoTen(), options);
        }
        if (texts.contains("_coQuanChuTri_")) {
            range.replace("_coQuanChuTri_", cauHinhBieuMau.getCoQuanChuTri(), options);
        }
        if (texts.contains("_soQuyetDinh_")) {
            range.replace("_soQuyetDinh_", hoiDongXetDuyet.getSoQuyetDinh(), options);
        }
        if (texts.contains("_ngayHop_")) {
            range.replace("_ngayHop_", dateFormat.format(hoiDongXetDuyet.getNgayHop()) + "", options);
        }
        if (texts.contains("_diaDiem_")) {
            range.replace("_diaDiem_", hoiDongXetDuyet.getDiaDiem() + "", options);
        }
        document.save(fileName, SaveFormat.DOCX);
        return new File(fileName).getAbsoluteFile();
    }

    @Override
    public File xuatHopDongThucHienDeTai(DeTai deTai, CauHinhBieuMau cauHinhBieuMau) throws Exception {
        applyALicense();
        Document document = new Document(getClass().getResourceAsStream("/bieumau/BM05.docx"));
        DocumentBuilder builder = new DocumentBuilder(document);
        LocalDate current = LocalDate.now();
        Calendar calendar = Calendar.getInstance(TimeZone.getDefault());
        String fileName = downloadFolder + "/BM05-" + deTai.getId()  + new Date().getTime() + ".docx";
        Range range = document.getDocument().getRange();
        String texts = range.getText();
        FindReplaceOptions options = new FindReplaceOptions(FindReplaceDirection.FORWARD);

        if(texts.contains("_ngay_")){
            range.replace("_ngay_", current.getDayOfMonth() +"", options);
        }
        if(texts.contains("_thang_")){
            range.replace("_thang_", current.getMonth().getValue() +"", options);
        }
        if(texts.contains("_nam_")){
            range.replace("_nam_", current.getYear() +"", options);
        }
        //Bên A
        if (texts.contains("_tenBenA_")) {
            range.replace("_tenBenA_", cauHinhBieuMau.getTenBenA(), options);
        }
        if (texts.contains("_chucVuBenA_")) {
            range.replace("_chucVuBenA_", cauHinhBieuMau.getChucVuBenA(), options);
        }
        if (texts.contains("_thongTinTaiKhoanBenA_")) {
            range.replace("_thongTinTaiKhoanBenA_", cauHinhBieuMau.getThongTinTaiKhoanBenA(), options);
        }

        //Bên B
        if (texts.contains("_tenChuNhiem_")) {
            range.replace("_tenChuNhiem_", deTai.getChuNhiemDeTai().getHoTen(), options);
        }
        if (texts.contains("_tenDonVi_")) {
            range.replace("_tenDonVi_", deTai.getChuNhiemDeTai().getDonVi(), options);
        }
        if (texts.contains("_soTaiKhoanBenB_")) {
            range.replace("_soTaiKhoanBenB_", deTai.getChuNhiemDeTai().getTaiKhoanNganHang().getSoTaiKhoan(), options);
        }
        if (texts.contains("_nganHangBenB_")) {
            range.replace("_nganHangBenB_", deTai.getChuNhiemDeTai().getTaiKhoanNganHang().getNganHang().getTenNganHang(), options);
        }

        //Nội dung
        if (texts.contains("_tenDeTai_")) {
            range.replace("_tenDeTai_", deTai.getTenDeTai(), options);
        }
        if (texts.contains("_maSo_")) {
            range.replace("_maSo_", deTai.getMaSo(), options);
        }
        if (texts.contains("_kinhPhiDuocPhanBo_")) {
            range.replace("_kinhPhiDuocPhanBo_", decimalFormat.format(new BigDecimal(deTai.getKinhPhiDuocPhanBo())) + "", options);
        }
        if (texts.contains("_kinhPhiBangChu_")) {
            range.replace("_kinhPhiBangChu_", ReadNumber.numberToString(new BigDecimal(deTai.getKinhPhiDuocPhanBo())) + "", options);
        }


        calendar.setTime(deTai.getThoiGianQuyTrinh().getKetThucNghiemThu1());
        String ngayNghiemThu1 = calendar.get(Calendar.DAY_OF_MONTH) + 1 + "";
        if (texts.contains("_ngayNghiemThu1_")) {
            range.replace("_ngayNghiemThu1_", ngayNghiemThu1, options);
        }

        calendar.setTime(deTai.getThoiGianQuyTrinh().getKetThucNghiemThu1());
        String thangNghiemThu1 = calendar.get(Calendar.MONTH) + "";
        if (texts.contains("_thangNghiemThu1_")) {
            range.replace("_thangNghiemThu1_", thangNghiemThu1, options);
        }

        calendar.setTime(deTai.getThoiGianQuyTrinh().getKetThucNghiemThu1());
        String namNghiemThu1 = calendar.get(Calendar.YEAR) + "";
        if (texts.contains("_namNghiemThu1_")) {
            range.replace("_namNghiemThu1_", namNghiemThu1, options);
        }


        calendar.setTime(deTai.getThoiGianQuyTrinh().getBatDauNghiemThu1());
        String ketThucNam1 = (calendar.get(Calendar.YEAR) + 1) +"";
        String batDauNam1 = calendar.get(Calendar.YEAR)+"";
        if (texts.contains("_namHoc1_")) {
            range.replace("_namHoc1_", batDauNam1 + " - " + ketThucNam1, options);
        }

        calendar.setTime(deTai.getThoiGianQuyTrinh().getKetThucNghiemThu2());
        String ngayNghiemThu2 = calendar.get(Calendar.DAY_OF_MONTH) + 1 + "";
        if (texts.contains("_ngayNghiemThu2_")) {
            range.replace("_ngayNghiemThu2_", ngayNghiemThu2, options);
        }

        calendar.setTime(deTai.getThoiGianQuyTrinh().getKetThucNghiemThu2());
        String thangNghiemThu2 = calendar.get(Calendar.MONTH) + "";
        if (texts.contains("_thangNghiemThu2_")) {
            range.replace("_thangNghiemThu2_", thangNghiemThu2, options);
        }

        calendar.setTime(deTai.getThoiGianQuyTrinh().getKetThucNghiemThu2());
        String namNghiemThu2 = calendar.get(Calendar.YEAR) + "";
        if (texts.contains("_namNghiemThu2_")) {
            range.replace("_namNghiemThu2_", namNghiemThu2, options);
        }

        calendar.setTime(deTai.getThoiGianQuyTrinh().getBatDauNghiemThu2());
        String ketThucNam2 = (calendar.get(Calendar.YEAR) + 1) +"";
        String batDauNam2 = calendar.get(Calendar.YEAR)+"";
        if (texts.contains("_namHoc2_")) {
            range.replace("_namHoc2_", batDauNam2 + " - " + ketThucNam2, options);
        }

        calendar.setTime(deTai.getThoiGianQuyTrinh().getKetThucThucHien());
        String ngayKetThucThucHien = calendar.get(Calendar.DAY_OF_MONTH) + 1 + "";
        if (texts.contains("_ngayKetThucThucHien_")) {
            range.replace("_ngayKetThucThucHien_", ngayKetThucThucHien, options);
        }
        calendar.setTime(deTai.getThoiGianQuyTrinh().getKetThucThucHien());
        String thangKetThucThucHien = calendar.get(Calendar.MONTH) + "";
        if (texts.contains("_thangKetThucThucHien_")) {
            range.replace("_thangKetThucThucHien_", thangKetThucThucHien, options);
        }
        calendar.setTime(deTai.getThoiGianQuyTrinh().getKetThucThucHien());
        String namKetThucThucHien = calendar.get(Calendar.YEAR) + "";
        if (texts.contains("_namKetThucThucHien_")) {
            range.replace("_namKetThucThucHien_", namKetThucThucHien, options);
        }
        document.save(fileName, SaveFormat.DOCX);
        return new File(fileName).getAbsoluteFile();
    }

    @Override
    public File xuatBoSungThuyetMinhDeTai(DeTai deTai) throws Exception {
        applyALicense();
        Document document = new Document(getClass().getResourceAsStream("/bieumau/BM06.docx"));
        DocumentBuilder builder = new DocumentBuilder(document);

        String fileName = downloadFolder + "/BM06-" + deTai.getId() + new Date().getTime() + ".docx";
        Range range = document.getDocument().getRange();
        String texts = range.getText();
        LocalDate current = LocalDate.now();
        FindReplaceOptions options = new FindReplaceOptions(FindReplaceDirection.FORWARD);


        if(texts.contains("_donVi_")){
            range.replace("_donVi_", hrmServiceClient.getDonViById(deTai.getDonViId()).getTenDonVi(), options);
        }
        if(texts.contains("_ngay_")){
            range.replace("_ngay_", current.getDayOfMonth() +"", options);
        }
        if(texts.contains("_thang_")){
            range.replace("_thang_", current.getMonth().getValue() +"", options);
        }
        if(texts.contains("_nam_")){
            range.replace("_nam_", current.getYear() +"", options);
        }
        if (texts.contains("_tenDeTai_")) {
            range.replace("_tenDeTai_", deTai.getTenDeTai(), options);
        }
        if (texts.contains("_maSo_")){
            range.replace("_maSo_", deTai.getMaSo(), options);
        }
        if (texts.contains("_chuNhiemDeTai_")) {
            range.replace("_chuNhiemDeTai_", deTai.getChuNhiemDeTai().getHoTen(), options);
        }
        if (texts.contains("_coQuanChuTri_")){
            range.replace("_coQuanChuTri_", cauHinhBieuMauService.getCauHinhCore().getCoQuanChuTri(), options);
        }
        document.save(fileName, SaveFormat.DOCX);
        return new File(fileName).getAbsoluteFile();
    }

    @Override
    public File xuatBaoCaoTinhHinhThucHien(DeTai deTai) throws Exception {
        applyALicense();
        Document document = new Document(getClass().getResourceAsStream("/bieumau/BM07.docx"));
        DocumentBuilder builder = new DocumentBuilder(document);
        String fileName = downloadFolder + "/BM07-" + deTai.getId() + new Date().getTime() + ".docx";
        Range range = document.getDocument().getRange();
        String texts = range.getText();
        LocalDate current = LocalDate.now();
        Calendar calendar = Calendar.getInstance(TimeZone.getDefault());
        FindReplaceOptions options = new FindReplaceOptions(FindReplaceDirection.FORWARD);
        FindReplaceOptions otherOption = new FindReplaceOptions();

        calendar.setTime(deTai.getThoiGianQuyTrinh().getKetThucNghiemThu2());
        String ngayNghiemThu2 = calendar.get(Calendar.DAY_OF_MONTH) + 1 + "";
        if (texts.contains("_ngayNghiemThu2_")) {
            range.replace("_ngayNghiemThu2_", ngayNghiemThu2, options);
        }

        calendar.setTime(deTai.getThoiGianQuyTrinh().getKetThucNghiemThu2());
        String thangNghiemThu2 = calendar.get(Calendar.MONTH) + "";
        if (texts.contains("_thangNghiemThu2_")) {
            range.replace("_thangNghiemThu2_", thangNghiemThu2, options);
        }

        calendar.setTime(deTai.getThoiGianQuyTrinh().getKetThucNghiemThu2());
        String namNghiemThu2 = calendar.get(Calendar.YEAR) + "";
        if (texts.contains("_namNghiemThu2_")) {
            range.replace("_namNghiemThu2_", namNghiemThu2, options);
        }

        if(texts.contains("_donVi_")){
            range.replace("_donVi_", hrmServiceClient.getDonViById(deTai.getDonViId()).getTenDonVi(), options);
        }
        if(texts.contains("_ngay_")){
            range.replace("_ngay_", current.getDayOfMonth() +"", options);
        }
        if(texts.contains("_thang_")){
            range.replace("_thang_", current.getMonth().getValue() +"", options);
        }
        if(texts.contains("_nam_")){
            range.replace("_nam_", current.getYear() +"", options);
        }
        if (texts.contains("_tenDeTai_")) {
            range.replace("_tenDeTai_", deTai.getTenDeTai(), options);
        }
        if (texts.contains("_maSo_")){
            range.replace("_maSo_", deTai.getMaSo(), options);
        }
        if (texts.contains("_chuNhiemDeTai_")) {
            range.replace("_chuNhiemDeTai_", deTai.getChuNhiemDeTai().getHoTen(), options);
        }
        if (texts.contains("_tongKinhPhi_")){
            range.replace("_tongKinhPhi_", decimalFormat.format(new BigDecimal(deTai.getKinhPhiDuocPhanBo())) +"", options);
        }


        BaoCaoTienDo baoCaoLast = deTai.getBaoCaoTienDos().get(deTai.getBaoCaoTienDos().size() -1);

        if (texts.contains("_kinhPhiDuocCap_")){
            range.replace("_kinhPhiDuocCap_", decimalFormat.format(new BigDecimal(deTai.getKinhPhiDuocPhanBo())) +"", options);
        }
        if (texts.contains("_kinhPhiDaChi_")){
            otherOption.setReplacingCallback(new ReplaceWithHtmlEvaluator(baoCaoLast.getKinhPhiDaChi()));
            range.replace("_kinhPhiDaChi_", "" ,otherOption);
        }
        if (texts.contains("_kinhPhiDaQuyetToan_")){
            range.replace("_kinhPhiDaQuyetToan_", decimalFormat.format(new BigDecimal(baoCaoLast.getKinhPhiDaQuyetToan()))+"", options);
        }
        if (texts.contains("_tuDanhGia_")){
            otherOption.setReplacingCallback(new ReplaceWithHtmlEvaluator(baoCaoLast.getTuDanhGia()));
            range.replace("_tuDanhGia_", "" ,otherOption);
        }
        if (texts.contains("_noiDungNghienCuu_")){
            otherOption.setReplacingCallback(new ReplaceWithHtmlEvaluator(baoCaoLast.getNoiDungNghienCuu()));
            range.replace("_noiDungNghienCuu_", "" ,otherOption);
        }
        if (texts.contains("_duKienKetQua_")){
            otherOption.setReplacingCallback(new ReplaceWithHtmlEvaluator(baoCaoLast.getDuKienKetQua()));
            range.replace("_duKienKetQua_", "" ,otherOption);
        }
        if (texts.contains("_kinhPhiThucHien_")){
            otherOption.setReplacingCallback(new ReplaceWithHtmlEvaluator(baoCaoLast.getKinhPhiThucHien()));
            range.replace("_kinhPhiThucHien_", "" ,otherOption);
        }
        if (texts.contains("_kienNghi_")){
            otherOption.setReplacingCallback(new ReplaceWithHtmlEvaluator(baoCaoLast.getKienNghi()));
            range.replace("_kienNghi_", "" ,otherOption);
        }


        List<FormField> fields = Arrays.stream(document.getChildNodes(NodeType.FORM_FIELD, true).toArray())
                .filter(FormField.class::isInstance)
                .map(FormField.class::cast)
                .collect(Collectors.toList());
        if (baoCaoLast.isThoiGianNghiemThuDuKien()){
            fields.get(0).setChecked(true);
        }else fields.get(1).setChecked(true);

        Table tableNoiDung = (Table) document.getChild(NodeType.TABLE, 1, true);
        int sizeNoiDung =  baoCaoLast.getNoiDungBM07s().size();
        for(int i=0; i<sizeNoiDung; i++){
            Row row = tableNoiDung.getLastRow();
            Row cloneRow = (Row) row.deepClone(true);
            NoiDungBM07 noiDungBM07 = baoCaoLast.getNoiDungBM07s().get(i);
            row.getCells().get(0).getFirstParagraph().getParagraphFormat().setAlignment(ParagraphAlignment.CENTER);
            row.getCells().get(0).getFirstParagraph().appendChild(new Run(document, i + 1 +""));
            row.getCells().get(1).getFirstParagraph().getParagraphFormat().setAlignment(ParagraphAlignment.CENTER);
            row.getCells().get(1).getFirstParagraph().appendChild(new Run(document,  noiDungBM07.getNoiDungNghienCuuTheoThuyetMinh()));
            row.getCells().get(2).getFirstParagraph().getParagraphFormat().setAlignment(ParagraphAlignment.CENTER);
            row.getCells().get(2).getFirstParagraph().appendChild(new Run(document, noiDungBM07.getNoiDungNghienCuuDaThucHien()));
            row.getCells().get(3).getFirstParagraph().getParagraphFormat().setAlignment(ParagraphAlignment.CENTER);
            row.getCells().get(3).getFirstParagraph().appendChild(new Run(document, noiDungBM07.getTuDanhGia()));
            tableNoiDung.appendChild(cloneRow);
        }
        tableNoiDung.getLastRow().remove();

        Table tableSanPham = (Table) document.getChild(NodeType.TABLE, 2, true);
        for(int i=0; i<4; i++){
            Row rowL = tableSanPham.getLastRow();
            Row cloneRowL = (Row) rowL.deepClone(true);
            String loaiSanPham = "";
                if(i==0){
                    loaiSanPham = "Sản phẩm khoa học";
                }else if(i==1){
                    loaiSanPham = "Sản phẩm ứng dụng";
                }else if(i==2){
                    loaiSanPham = "Sản phẩm đào tạo";
                }else{
                loaiSanPham = "Sản phẩm khác";
            }
            rowL.getCells().get(0).getFirstParagraph().getParagraphFormat().setAlignment(ParagraphAlignment.LEFT);
            rowL.getCells().get(0).getFirstParagraph().appendChild(new Run(document, i+1+""));
            rowL.getCells().get(1).getFirstParagraph().getParagraphFormat().setAlignment(ParagraphAlignment.LEFT);
            rowL.getCells().get(1).getFirstParagraph().appendChild(new Run(document, loaiSanPham));
            mergeCells(rowL.getCells().get(1),rowL.getCells().get(3) );
            tableSanPham.appendChild(cloneRowL);

            Cell startCell = tableSanPham.getLastRow().getFirstCell();
            Cell endCell = new Cell(document);

            int sizeChiTietSanPham=0;
                if (i==0) {
                    sizeChiTietSanPham = baoCaoLast.getSanPhamKhoaHocBM07s().size();
                    for (int k = 0; k < sizeChiTietSanPham; k++) {
                        ChiTietSanPhamBM07 sanPhamKhoaHocBM07 = baoCaoLast.getSanPhamKhoaHocBM07s().get(k);
                        if(!sanPhamKhoaHocBM07.getSanPhamDaDatDuoc().equals("")) {


                            Row last = tableSanPham.getLastRow();
                            Row cloneD = (Row) last.deepClone(true);
                            last.getCells().get(1).getFirstParagraph().getParagraphFormat().setAlignment(ParagraphAlignment.CENTER);
                            last.getCells().get(1).getFirstParagraph().appendChild(new Run(document, sanPhamKhoaHocBM07.getSanPhamTheoThuyetMinh().getTenSanPham()));
                            last.getCells().get(2).getFirstParagraph().getParagraphFormat().setAlignment(ParagraphAlignment.CENTER);
                            last.getCells().get(2).getFirstParagraph().appendChild(new Run(document, sanPhamKhoaHocBM07.getSanPhamDaDatDuoc()));
                            last.getCells().get(3).getFirstParagraph().getParagraphFormat().setAlignment(ParagraphAlignment.CENTER);
                            last.getCells().get(3).getFirstParagraph().appendChild(new Run(document, sanPhamKhoaHocBM07.getTuDanhGia()));
                            endCell = tableSanPham.getLastRow().getFirstCell();
                            tableSanPham.appendChild(cloneD);
                        }

                    }
                } else if (i==1) {
                    sizeChiTietSanPham = baoCaoLast.getSanPhamDaoTaoBM07s().size();
                    for (int k = 0; k < sizeChiTietSanPham; k++) {
                        ChiTietSanPhamBM07 sanPhamDaoTaoBM07 = baoCaoLast.getSanPhamDaoTaoBM07s().get(k);
                        if(!sanPhamDaoTaoBM07.getSanPhamDaDatDuoc().equals("")) {

                            Row last = tableSanPham.getLastRow();
                            Row cloneD = (Row) last.deepClone(true);
                            last.getCells().get(1).getFirstParagraph().getParagraphFormat().setAlignment(ParagraphAlignment.CENTER);
                            last.getCells().get(1).getFirstParagraph().appendChild(new Run(document, sanPhamDaoTaoBM07.getSanPhamTheoThuyetMinh().getTenSanPham()));
                            last.getCells().get(2).getFirstParagraph().getParagraphFormat().setAlignment(ParagraphAlignment.CENTER);
                            last.getCells().get(2).getFirstParagraph().appendChild(new Run(document, sanPhamDaoTaoBM07.getSanPhamDaDatDuoc()));
                            last.getCells().get(3).getFirstParagraph().getParagraphFormat().setAlignment(ParagraphAlignment.CENTER);
                            last.getCells().get(3).getFirstParagraph().appendChild(new Run(document, sanPhamDaoTaoBM07.getTuDanhGia()));

                            endCell = tableSanPham.getLastRow().getFirstCell();

                            tableSanPham.appendChild(cloneD);
                        }
                    }
                } else if (i==2) {
                    sizeChiTietSanPham = baoCaoLast.getSanPhamUngDungBM07s().size();
                    for (int k = 0; k < sizeChiTietSanPham; k++) {
                        ChiTietSanPhamBM07 sanPhamUngDungBM07 = baoCaoLast.getSanPhamUngDungBM07s().get(k);
                        if(!sanPhamUngDungBM07.getSanPhamDaDatDuoc().equals("")) {

                            Row last = tableSanPham.getLastRow();
                            Row cloneD = (Row) last.deepClone(true);
                            last.getCells().get(1).getFirstParagraph().getParagraphFormat().setAlignment(ParagraphAlignment.LEFT);
                            last.getCells().get(1).getFirstParagraph().appendChild(new Run(document, sanPhamUngDungBM07.getSanPhamTheoThuyetMinh().getTenSanPham()));
                            last.getCells().get(2).getFirstParagraph().getParagraphFormat().setAlignment(ParagraphAlignment.LEFT);
                            last.getCells().get(2).getFirstParagraph().appendChild(new Run(document, sanPhamUngDungBM07.getSanPhamDaDatDuoc()));
                            last.getCells().get(3).getFirstParagraph().getParagraphFormat().setAlignment(ParagraphAlignment.LEFT);
                            last.getCells().get(3).getFirstParagraph().appendChild(new Run(document, sanPhamUngDungBM07.getTuDanhGia()));

                            endCell = tableSanPham.getLastRow().getFirstCell();

                            tableSanPham.appendChild(cloneD);
                        }
                    }

                } else{
                    sizeChiTietSanPham = baoCaoLast.getSanPhamKhacBM07s().size();
                    for (int k = 0; k < sizeChiTietSanPham; k++) {
                        ChiTietSanPhamKhacBM07 sanPhamKhacBM07 = baoCaoLast.getSanPhamKhacBM07s().get(k);
                        if(!sanPhamKhacBM07.getSanPhamDaDatDuoc().equals("")) {

                            Row last = tableSanPham.getLastRow();
                            Row cloneD = (Row) last.deepClone(true);
                            last.getCells().get(1).getFirstParagraph().getParagraphFormat().setAlignment(ParagraphAlignment.LEFT);
                            last.getCells().get(1).getFirstParagraph().appendChild(new Run(document, sanPhamKhacBM07.getSanPhamTheoThuyetMinh()));
                            last.getCells().get(2).getFirstParagraph().getParagraphFormat().setAlignment(ParagraphAlignment.LEFT);
                            last.getCells().get(2).getFirstParagraph().appendChild(new Run(document, sanPhamKhacBM07.getSanPhamDaDatDuoc()));
                            last.getCells().get(3).getFirstParagraph().getParagraphFormat().setAlignment(ParagraphAlignment.LEFT);
                            last.getCells().get(3).getFirstParagraph().appendChild(new Run(document, sanPhamKhacBM07.getTuDanhGia()));

                            endCell = tableSanPham.getLastRow().getFirstCell();

                            tableSanPham.appendChild(cloneD);
                        }
                    }
            }
            if(sizeChiTietSanPham>1) {
                mergeCells(startCell, endCell);
            }
        }
        tableSanPham.getLastRow().remove();
        document.save(fileName, SaveFormat.DOCX);
        return new File(fileName).getAbsoluteFile();
    }

    @Override
    public File xuatKiemTraTinhHinhThucHien(DeTai deTai) throws Exception {
        applyALicense();
        Document document = new Document(getClass().getResourceAsStream("/bieumau/BM08.docx"));
        DocumentBuilder builder = new DocumentBuilder(document);

        String fileName = downloadFolder + "/BM08-" + deTai.getId() + new Date().getTime() + ".docx";
        Range range = document.getDocument().getRange();
        String texts = range.getText();
        LocalDate current = LocalDate.now();
        Calendar calendar = Calendar.getInstance(TimeZone.getDefault());
        FindReplaceOptions options = new FindReplaceOptions(FindReplaceDirection.FORWARD);


        calendar.setTime(deTai.getThoiGianQuyTrinh().getKetThucNghiemThu2());
        String ngayNghiemThu2 = calendar.get(Calendar.DAY_OF_MONTH) + 1  + "";
        if (texts.contains("_ngayNghiemThu2_")) {
            range.replace("_ngayNghiemThu2_", ngayNghiemThu2, options);
        }

        calendar.setTime(deTai.getThoiGianQuyTrinh().getKetThucNghiemThu2());
        String thangNghiemThu2 = calendar.get(Calendar.MONTH) + "";
        if (texts.contains("_thangNghiemThu2_")) {
            range.replace("_thangNghiemThu2_", thangNghiemThu2, options);
        }

        calendar.setTime(deTai.getThoiGianQuyTrinh().getKetThucNghiemThu2());
        String namNghiemThu2 = calendar.get(Calendar.YEAR) + "";
        if (texts.contains("_namNghiemThu2_")) {
            range.replace("_namNghiemThu2_", namNghiemThu2, options);
        }

        if(texts.contains("_ngay_")){
            range.replace("_ngay_", current.getDayOfMonth() +"", options);
        }
        if(texts.contains("_thang_")){
            range.replace("_thang_", current.getMonth().getValue() +"", options);
        }
        if(texts.contains("_nam_")){
            range.replace("_nam_", current.getYear() +"", options);
        }
        if (texts.contains("_tenDeTai_")) {
            range.replace("_tenDeTai_", deTai.getTenDeTai(), options);
        }
        if (texts.contains("_maSo_")){
            range.replace("_maSo_", deTai.getMaSo(), options);
        }
        if (texts.contains("_chuNhiemDeTai_")) {
            range.replace("_chuNhiemDeTai_", deTai.getChuNhiemDeTai().getHoTen(), options);
        }
        if (texts.contains("_tongKinhPhi_")){
            range.replace("_tongKinhPhi_", decimalFormat.format(new BigDecimal(deTai.getKinhPhiDuocPhanBo())) +"", options);
        }
        if (texts.contains("_coQuanChuTri_")){
            range.replace("_coQuanChuTri_",  cauHinhBieuMauService.getCauHinhCore().getCoQuanChuTri(), options);
        }


        document.save(fileName, SaveFormat.DOCX);
        return new File(fileName).getAbsoluteFile();
    }

    @Override
    public File xuatThongTinKetQuaNghienCuu(DeTai deTai) throws Exception {
        applyALicense();
        Document document = new Document(getClass().getResourceAsStream("/bieumau/BM10.docx"));
        Document bm11 = new Document(getClass().getResourceAsStream("/bieumau/BM11.docx"));
        document.appendDocument(bm11, ImportFormatMode.KEEP_SOURCE_FORMATTING);
        DocumentBuilder builder = new DocumentBuilder(document);

        String fileName = downloadFolder + "/BM10-" + deTai.getId() + new Date().getTime() + ".docx";
        Range range = document.getDocument().getRange();

        String texts = range.getText();
        LocalDate current = LocalDate.now();
        Calendar calendar = Calendar.getInstance(TimeZone.getDefault());
        FindReplaceOptions options = new FindReplaceOptions(FindReplaceDirection.FORWARD);
        FindReplaceOptions otherOption = new FindReplaceOptions();


        calendar.setTime(deTai.getThoiGianQuyTrinh().getKetThucNghiemThu2());
        String ngayNghiemThu2 = calendar.get(Calendar.DAY_OF_MONTH) + 1 + "";
        if (texts.contains("_ngayNghiemThu2_")) {
            range.replace("_ngayNghiemThu2_", ngayNghiemThu2, options);
        }

        calendar.setTime(deTai.getThoiGianQuyTrinh().getKetThucNghiemThu2());
        String thangNghiemThu2 = calendar.get(Calendar.MONTH) + "";
        if (texts.contains("_thangNghiemThu2_")) {
            range.replace("_thangNghiemThu2_", thangNghiemThu2, options);
        }

        calendar.setTime(deTai.getThoiGianQuyTrinh().getKetThucNghiemThu2());
        String namNghiemThu2 = calendar.get(Calendar.YEAR) + "";
        if (texts.contains("_namNghiemThu2_")) {
            range.replace("_namNghiemThu2_", namNghiemThu2, options);
        }

        if(texts.contains("_nghiemThu2_")){
            range.replace("_nghiemThu2_", dateFormat.format(deTai.getThoiGianQuyTrinh().getKetThucNghiemThu2()) +"", options);
        }

        if(texts.contains("_ngay_")){
            range.replace("_ngay_", current.getDayOfMonth() +"", options);
        }
        if(texts.contains("_thang_")){
            range.replace("_thang_", current.getMonth().getValue() +"", options);
        }
        if(texts.contains("_nam_")){
            range.replace("_nam_", current.getYear() +"", options);
        }
        if (texts.contains("_tenDeTai_")) {
            range.replace("_tenDeTai_", deTai.getTenDeTai(), options);
        }
        if (texts.contains("_tenDeTaiEn_")) {
            range.replace("_tenDeTaiEn_", deTai.getTenDeTaiEn(), options);
        }
        if (texts.contains("_maSo_")){
            range.replace("_maSo_", deTai.getMaSo(), options);
        }
        if (texts.contains("_chuNhiemDeTai_")) {
            range.replace("_chuNhiemDeTai_", deTai.getChuNhiemDeTai().getHoTen(), options);
        }

        if (texts.contains("_coQuanChuTri_")){
            range.replace("_coQuanChuTri_",  cauHinhBieuMauService.getCauHinhCore().getCoQuanChuTri(), options);
        }

        if(texts.contains("_donVi_")){
            range.replace("_donVi_", hrmServiceClient.getDonViById(deTai.getDonViId()).getTenDonVi(), options);
        }

        if (texts.contains("_mucTieu_")){
            otherOption.setReplacingCallback(new ReplaceWithHtmlEvaluator(deTai.getMucTieu()));
            range.replace("_mucTieu_", "" ,otherOption);
        }
        if (texts.contains("_mucTieuEn_")){
            otherOption.setReplacingCallback(new ReplaceWithHtmlEvaluator(deTai.getMucTieuEn()));
            range.replace("_mucTieuEn_", "" ,otherOption);
        }
        if (texts.contains("_tinhMoi_")){
            otherOption.setReplacingCallback(new ReplaceWithHtmlEvaluator(deTai.getThongTinKetQua().getTinhMoi()));
            range.replace("_tinhMoi_", "" ,otherOption);
        }
        if (texts.contains("_tinhMoiEn_")){
            otherOption.setReplacingCallback(new ReplaceWithHtmlEvaluator(deTai.getThongTinKetQua().getTinhMoiEn()));
            range.replace("_tinhMoiEn_", "" ,otherOption);
        }
        if (texts.contains("_ketQuaNghienCuu_")){
            otherOption.setReplacingCallback(new ReplaceWithHtmlEvaluator(deTai.getThongTinKetQua().getKetQuaNghienCuu()));
            range.replace("_ketQuaNghienCuu_", "" ,otherOption);
        }
        if (texts.contains("_ketQuaNghienCuuEn_")){
            otherOption.setReplacingCallback(new ReplaceWithHtmlEvaluator(deTai.getThongTinKetQua().getKetQuaNghienCuuEn()));
            range.replace("_ketQuaNghienCuuEn_", "" ,otherOption);
        }
        if(texts.contains("_hieuQuaPhuongThucChuyenGiao_")){
            otherOption.setReplacingCallback(new ReplaceWithHtmlEvaluator(deTai.getThongTinKetQua().getHieuQuaPhuongThucChuyenGiao()));
            range.replace("_hieuQuaPhuongThucChuyenGiao_", "" ,otherOption);
        }
        if(texts.contains("_hieuQuaPhuongThucChuyenGiaoEn_")){
            otherOption.setReplacingCallback(new ReplaceWithHtmlEvaluator(deTai.getThongTinKetQua().getHieuQuaPhuongThucChuyenGiaoEn()));
            range.replace("_hieuQuaPhuongThucChuyenGiaoEn_", "" ,otherOption);
        }

        //Table Sản phẩm
        Table tableSanPham = (Table) document.getChild(NodeType.TABLE, 1, true);

        for(int i=0; i<4; i++){
            Row rowL = tableSanPham.getLastRow();
            Row cloneRowL = (Row) rowL.deepClone(true);
            String loaiSanPham = "";
            if(i==0){
                loaiSanPham = "Sản phẩm khoa học";
            }else if(i==1){
                loaiSanPham = "Sản phẩm ứng dụng";
            }else if(i==2){
                loaiSanPham = "Sản phẩm đào tạo";
            }else{
                loaiSanPham = "Sản phẩm khác";
            }
            rowL.getCells().get(0).getFirstParagraph().getParagraphFormat().setAlignment(ParagraphAlignment.CENTER);
            rowL.getCells().get(0).getFirstParagraph().appendChild(new Run(document, i+1+""));
            rowL.getCells().get(1).getFirstParagraph().getParagraphFormat().setAlignment(ParagraphAlignment.CENTER);
            rowL.getCells().get(1).getFirstParagraph().appendChild(new Run(document, loaiSanPham));
            mergeCells(rowL.getCells().get(1),rowL.getCells().get(3) );
            tableSanPham.appendChild(cloneRowL);

            Cell startCell = tableSanPham.getLastRow().getFirstCell();
            Cell endCell = new Cell(document);

            int sizeChiTietSanPham=0;
            if (i==0) {
                sizeChiTietSanPham = deTai.getThongTinKetQua().getSanPhamKhoaHocs().size();
                for (int k = 0; k < sizeChiTietSanPham; k++) {
                    Row last = tableSanPham.getLastRow();
                    Row cloneD = (Row) last.deepClone(true);

                    ChiTietSanPhamBM07 sanPhamKhoaHocBM07 = deTai.getThongTinKetQua().getSanPhamKhoaHocs().get(k);
                    last.getCells().get(1).getFirstParagraph().getParagraphFormat().setAlignment(ParagraphAlignment.CENTER);
                    last.getCells().get(1).getFirstParagraph().appendChild(new Run(document, sanPhamKhoaHocBM07.getSanPhamTheoThuyetMinh().getTenSanPham()));
                    last.getCells().get(2).getFirstParagraph().getParagraphFormat().setAlignment(ParagraphAlignment.CENTER);
                    last.getCells().get(2).getFirstParagraph().appendChild(new Run(document, sanPhamKhoaHocBM07.getSanPhamDaDatDuoc()));
                    last.getCells().get(3).getFirstParagraph().getParagraphFormat().setAlignment(ParagraphAlignment.CENTER);
                    last.getCells().get(3).getFirstParagraph().appendChild(new Run(document, sanPhamKhoaHocBM07.getTuDanhGia()));
                    endCell = tableSanPham.getLastRow().getFirstCell();
                    tableSanPham.appendChild(cloneD);

                }
            } else if (i==1) {
                sizeChiTietSanPham = deTai.getThongTinKetQua().getSanPhamDaoTaos().size();
                for (int k = 0; k < sizeChiTietSanPham; k++) {
                    Row last = tableSanPham.getLastRow();
                    Row cloneD = (Row) last.deepClone(true);

                    ChiTietSanPhamBM07 sanPhamDaoTaoBM07 = deTai.getThongTinKetQua().getSanPhamDaoTaos().get(k);
                    last.getCells().get(1).getFirstParagraph().appendChild(new Run(document, sanPhamDaoTaoBM07.getSanPhamTheoThuyetMinh().getTenSanPham()));
                    last.getCells().get(2).getFirstParagraph().appendChild(new Run(document, sanPhamDaoTaoBM07.getSanPhamDaDatDuoc()));
                    last.getCells().get(3).getFirstParagraph().appendChild(new Run(document, sanPhamDaoTaoBM07.getTuDanhGia()));

                    endCell = tableSanPham.getLastRow().getFirstCell();

                    tableSanPham.appendChild(cloneD);
                }
            } else if (i==2) {
                sizeChiTietSanPham = deTai.getThongTinKetQua().getSanPhamUngDungs().size();
                for (int k = 0; k < sizeChiTietSanPham; k++) {
                    Row last = tableSanPham.getLastRow();
                    Row cloneD = (Row) last.deepClone(true);

                    ChiTietSanPhamBM07 sanPhamUngDungBM07 = deTai.getThongTinKetQua().getSanPhamUngDungs().get(k);
                    last.getCells().get(1).getFirstParagraph().appendChild(new Run(document, sanPhamUngDungBM07.getSanPhamTheoThuyetMinh().getTenSanPham()));
                    last.getCells().get(2).getFirstParagraph().appendChild(new Run(document, sanPhamUngDungBM07.getSanPhamDaDatDuoc()));
                    last.getCells().get(3).getFirstParagraph().appendChild(new Run(document, sanPhamUngDungBM07.getTuDanhGia()));

                    endCell = tableSanPham.getLastRow().getFirstCell();

                    tableSanPham.appendChild(cloneD);
                }

            } else{
                sizeChiTietSanPham = deTai.getThongTinKetQua().getSanPhamKhacs().size();
                for (int k = 0; k < sizeChiTietSanPham; k++) {
                    Row last = tableSanPham.getLastRow();
                    Row cloneD = (Row) last.deepClone(true);

                    ChiTietSanPhamKhacBM07 sanPhamKhacBM07 = deTai.getThongTinKetQua().getSanPhamKhacs().get(k);
                    last.getCells().get(1).getFirstParagraph().appendChild(new Run(document, sanPhamKhacBM07.getSanPhamTheoThuyetMinh()));
                    last.getCells().get(2).getFirstParagraph().appendChild(new Run(document, sanPhamKhacBM07.getSanPhamDaDatDuoc()));
                    last.getCells().get(3).getFirstParagraph().appendChild(new Run(document, sanPhamKhacBM07.getTuDanhGia()));

                    endCell = tableSanPham.getLastRow().getFirstCell();

                    tableSanPham.appendChild(cloneD);
                }
            }
            if(sizeChiTietSanPham>1) {
                mergeCells(startCell, endCell);
            }
        }
        tableSanPham.getLastRow().remove();

        //Table Sản phẩm en
        Table tableSanPhamEn = (Table) document.getChild(NodeType.TABLE, 4, true);

        for(int i=0; i<4; i++){
            Row rowL = tableSanPhamEn.getLastRow();
            Row cloneRowL = (Row) rowL.deepClone(true);
            String loaiSanPham = "";
            if(i==0){
                loaiSanPham = "Sản phẩm khoa học";
            }else if(i==1){
                loaiSanPham = "Sản phẩm ứng dụng";
            }else if(i==2){
                loaiSanPham = "Sản phẩm đào tạo";
            }else{
                loaiSanPham = "Sản phẩm khác";
            }
            rowL.getCells().get(0).getFirstParagraph().getParagraphFormat().setAlignment(ParagraphAlignment.CENTER);
            rowL.getCells().get(0).getFirstParagraph().appendChild(new Run(document, i+1+""));
            rowL.getCells().get(1).getFirstParagraph().getParagraphFormat().setAlignment(ParagraphAlignment.CENTER);
            rowL.getCells().get(1).getFirstParagraph().appendChild(new Run(document, loaiSanPham));
            mergeCells(rowL.getCells().get(1),rowL.getCells().get(3) );
            tableSanPhamEn.appendChild(cloneRowL);

            Cell startCell = tableSanPhamEn.getLastRow().getFirstCell();
            Cell endCell = new Cell(document);

            int sizeChiTietSanPham=0;
            if (i==0) {
                sizeChiTietSanPham = deTai.getThongTinKetQua().getSanPhamKhoaHocs().size();
                for (int k = 0; k < sizeChiTietSanPham; k++) {
                    Row last = tableSanPhamEn.getLastRow();
                    Row cloneD = (Row) last.deepClone(true);

                    ChiTietSanPhamBM07 sanPhamKhoaHocBM07 = deTai.getThongTinKetQua().getSanPhamKhoaHocs().get(k);
                    last.getCells().get(1).getFirstParagraph().getParagraphFormat().setAlignment(ParagraphAlignment.CENTER);
                    last.getCells().get(1).getFirstParagraph().appendChild(new Run(document, sanPhamKhoaHocBM07.getSanPhamTheoThuyetMinh().getTenSanPham()));
                    last.getCells().get(2).getFirstParagraph().getParagraphFormat().setAlignment(ParagraphAlignment.CENTER);
                    last.getCells().get(2).getFirstParagraph().appendChild(new Run(document, sanPhamKhoaHocBM07.getSanPhamDaDatDuoc()));
                    last.getCells().get(3).getFirstParagraph().getParagraphFormat().setAlignment(ParagraphAlignment.CENTER);
                    last.getCells().get(3).getFirstParagraph().appendChild(new Run(document, sanPhamKhoaHocBM07.getTuDanhGia()));
                    endCell = tableSanPhamEn.getLastRow().getFirstCell();
                    tableSanPhamEn.appendChild(cloneD);

                }
            } else if (i==1) {
                sizeChiTietSanPham = deTai.getThongTinKetQua().getSanPhamDaoTaos().size();
                for (int k = 0; k < sizeChiTietSanPham; k++) {
                    Row last = tableSanPhamEn.getLastRow();
                    Row cloneD = (Row) last.deepClone(true);

                    ChiTietSanPhamBM07 sanPhamDaoTaoBM07 = deTai.getThongTinKetQua().getSanPhamDaoTaos().get(k);
                    last.getCells().get(1).getFirstParagraph().appendChild(new Run(document, sanPhamDaoTaoBM07.getSanPhamTheoThuyetMinh().getTenSanPham()));
                    last.getCells().get(2).getFirstParagraph().appendChild(new Run(document, sanPhamDaoTaoBM07.getSanPhamDaDatDuoc()));
                    last.getCells().get(3).getFirstParagraph().appendChild(new Run(document, sanPhamDaoTaoBM07.getTuDanhGia()));

                    endCell = tableSanPhamEn.getLastRow().getFirstCell();

                    tableSanPhamEn.appendChild(cloneD);
                }
            } else if (i==2) {
                sizeChiTietSanPham = deTai.getThongTinKetQua().getSanPhamUngDungs().size();
                for (int k = 0; k < sizeChiTietSanPham; k++) {
                    Row last = tableSanPhamEn.getLastRow();
                    Row cloneD = (Row) last.deepClone(true);

                    ChiTietSanPhamBM07 sanPhamUngDungBM07 = deTai.getThongTinKetQua().getSanPhamUngDungs().get(k);
                    last.getCells().get(1).getFirstParagraph().appendChild(new Run(document, sanPhamUngDungBM07.getSanPhamTheoThuyetMinh().getTenSanPham()));
                    last.getCells().get(2).getFirstParagraph().appendChild(new Run(document, sanPhamUngDungBM07.getSanPhamDaDatDuoc()));
                    last.getCells().get(3).getFirstParagraph().appendChild(new Run(document, sanPhamUngDungBM07.getTuDanhGia()));

                    endCell = tableSanPhamEn.getLastRow().getFirstCell();

                    tableSanPhamEn.appendChild(cloneD);
                }

            } else{
                sizeChiTietSanPham = deTai.getThongTinKetQua().getSanPhamKhacs().size();
                for (int k = 0; k < sizeChiTietSanPham; k++) {
                    Row last = tableSanPhamEn.getLastRow();
                    Row cloneD = (Row) last.deepClone(true);

                    ChiTietSanPhamKhacBM07 sanPhamKhacBM07 = deTai.getThongTinKetQua().getSanPhamKhacs().get(k);
                    last.getCells().get(1).getFirstParagraph().appendChild(new Run(document, sanPhamKhacBM07.getSanPhamTheoThuyetMinh()));
                    last.getCells().get(2).getFirstParagraph().appendChild(new Run(document, sanPhamKhacBM07.getSanPhamDaDatDuoc()));
                    last.getCells().get(3).getFirstParagraph().appendChild(new Run(document, sanPhamKhacBM07.getTuDanhGia()));

                    endCell = tableSanPhamEn.getLastRow().getFirstCell();

                    tableSanPhamEn.appendChild(cloneD);
                }
            }
            if(sizeChiTietSanPham>1) {
                mergeCells(startCell, endCell);
            }
        }
        tableSanPhamEn.getLastRow().remove();
        document.getFirstSection().getBody().getFirstParagraph().remove();
        document.getLastSection().getBody().getFirstParagraph().remove();

        document.save(fileName, SaveFormat.DOCX);
        return new File(fileName).getAbsoluteFile();
    }

    @Override
    public File xuatDonXinHuy(DeTai deTai, DonXinHuy donXinHuy) throws Exception {
        applyALicense();

        Document document = new Document(getClass().getResourceAsStream("/bieumau/BM09.docx"));
        DocumentBuilder builder = new DocumentBuilder(document);

        String fileName = downloadFolder + "/BM09-" + deTai.getTenDeTai()+ "-" + new Date().getTime() + ".docx";
        Range range = document.getDocument().getRange();
        String texts = range.getText();
        LocalDate current = LocalDate.now();
        FindReplaceOptions options = new FindReplaceOptions(FindReplaceDirection.FORWARD);
        FindReplaceOptions otherOption = new FindReplaceOptions();

        //Style
        Style tableDataStyle = document.getStyles().add(StyleType.CHARACTER, "table");
        tableDataStyle.getFont().setName("Times New Roman");
        tableDataStyle.getFont().setSize(13.0);

        //Các text thay thế
        if(texts.contains("_donVi_")){
            range.replace("_donVi_", hrmServiceClient.getDonViById(deTai.getDonViId()).getTenDonVi(), options);
        }
        if(texts.contains("_ngay_")){
            range.replace("_ngay_", current.getDayOfMonth()+"", options);
        }
        if(texts.contains("_thang_")){
            range.replace("_thang_", current.getMonthValue()+"",options);
        }
        if(texts.contains("_nam_")) {
            range.replace("_nam_", current.getYear() + "", options);
        }
        if (texts.contains("_tenDeTai_")){
            range.replace("_tenDeTai_", deTai.getTenDeTai(), options);
        }
        if (texts.contains("_maSoDeTai_")){
            range.replace("_maSoDeTai_", deTai.getMaSo(), options);
        }
        if(texts.contains("_thoiGianBatDau_")){
            range.replace("_thoiGianBatDau_", dateFormat.format(deTai.getThoiGianQuyTrinh().getBatDauThucHien()), options);
        }
        if(texts.contains("_thoiGianKetThuc_")){
            range.replace("_thoiGianKetThuc_", dateFormat.format(deTai.getThoiGianQuyTrinh().getKetThucThucHien()), options);
        }
        if(texts.contains("_lyDoHuyDeTai_")){
            otherOption.setReplacingCallback(new ReplaceWithHtmlEvaluator(donXinHuy.getLyDo()));
            range.replace("_lyDoHuyDeTai_", "" ,otherOption);
        }
        if(texts.contains("_kinhPhiPhanBo_")){
            range.replace("_kinhPhiPhanBo_", decimalFormat.format(new BigDecimal(deTai.getKinhPhiDuocPhanBo())), options);
        }
        if(texts.contains("_tamUng_")){
            range.replace("_tamUng_", decimalFormat.format(new BigDecimal(donXinHuy.getSoTienDaTamUng()))+"", options);
        }
        if(texts.contains("_ngayTamUng_")){
            range.replace("_ngayTamUng_", dateFormat.format(donXinHuy.getThoiGianTamUng()).split("/")[0]+"", options);
        }
        if(texts.contains("_thangTamUng_")) {
            range.replace("_thangTamUng_", dateFormat.format(donXinHuy.getThoiGianTamUng()).split("/")[1] + "", options);
        }
        if(texts.contains("_namTamUng_")){
            range.replace("_namTamUng_", dateFormat.format(donXinHuy.getThoiGianTamUng()).split("/")[2], options);
        }


        Table tableDanhSachChuNhiemVaThanhVienThamGia =(Table) document.getChild(NodeType.TABLE, 2, true);
        Row row =tableDanhSachChuNhiemVaThanhVienThamGia.getLastRow();
        Row cloneRow = (Row) row.deepClone(true);

        Run stt = new Run(document, 1+"");
        stt.getFont().setStyle(tableDataStyle);

        Run tenChuNhiemDeTai = new Run(document);
        tenChuNhiemDeTai.getFont().setStyle(tableDataStyle);
        tenChuNhiemDeTai.setText("Chủ nhiệm: "+ deTai.getChuNhiemDeTai().getHoTen());

        Run donViCongTac = new Run(document, deTai.getChuNhiemDeTai().getDonVi());
        donViCongTac.getFont().setStyle(tableDataStyle);

        Run mscb = new Run(document, deTai.getChuNhiemDeTai().getSoHieuCongChuc());
        mscb.getFont().setStyle(tableDataStyle);

        row.getCells().get(0).getFirstParagraph().appendChild(stt);
        row.getCells().get(1).getFirstParagraph().appendChild(tenChuNhiemDeTai);
        row.getCells().get(2).getFirstParagraph().appendChild(donViCongTac);
        row.getCells().get(3).getFirstParagraph().appendChild(mscb);

        row.getCells().get(0).getFirstParagraph().getParagraphFormat().setAlignment(1);
        row.getCells().get(2).getFirstParagraph().getParagraphFormat().setAlignment(1);
        row.getCells().get(3).getFirstParagraph().getParagraphFormat().setAlignment(1);

        tableDanhSachChuNhiemVaThanhVienThamGia.appendChild(cloneRow);

        for(int i=0; i<deTai.getThanhVienCungThamGias().size(); i++){
            Row last = tableDanhSachChuNhiemVaThanhVienThamGia.getLastRow();
            Row cloneD = (Row) last.deepClone(true);

            Run sttTv = new Run(document, 2+i+"");
            sttTv.getFont().setStyle(tableDataStyle);

            Run tenThanhVien = new Run(document);
            tenThanhVien.getFont().setStyle(tableDataStyle);
            tenThanhVien.setText("Thành viên: "+ deTai.getThanhVienCungThamGias().get(i).getHoTen());

            Run donViCongTacTv = new Run(document, deTai.getThanhVienCungThamGias().get(i).getDonViCongTac());
            donViCongTacTv.getFont().setStyle(tableDataStyle);

            last.getCells().get(0).getFirstParagraph().appendChild(sttTv);
            last.getCells().get(1).getFirstParagraph().appendChild(tenThanhVien);
            last.getCells().get(2).getFirstParagraph().appendChild(donViCongTacTv);
            last.getCells().get(0).getFirstParagraph().getParagraphFormat().setAlignment(1);
            last.getCells().get(2).getFirstParagraph().getParagraphFormat().setAlignment(1);
            last.getCells().get(3).getFirstParagraph().getParagraphFormat().setAlignment(1);
            tableDanhSachChuNhiemVaThanhVienThamGia.appendChild(cloneD);
        }
        tableDanhSachChuNhiemVaThanhVienThamGia.getLastRow().remove();
        document.save(fileName, SaveFormat.DOCX);
        return new File(fileName).getAbsoluteFile();
    }



    @Override
    public File xuatGiaiTrinhChinhSua(DeTai deTai) throws Exception {
        applyALicense();
        Document document = new Document(getClass().getResourceAsStream("/bieumau/BM16.docx"));
        DocumentBuilder builder = new DocumentBuilder(document);

        String fileName = downloadFolder + "/BM16-" + deTai.getId() + new Date().getTime() + ".docx";
        Range range = document.getDocument().getRange();
        String texts = range.getText();
        LocalDate current = LocalDate.now();
        FindReplaceOptions options = new FindReplaceOptions(FindReplaceDirection.FORWARD);

        if(texts.contains("_donVi_")){
            range.replace("_donVi_", hrmServiceClient.getDonViById(deTai.getDonViId()).getTenDonVi(), options);
        }
        if(texts.contains("_ngay_")){
            range.replace("_ngay_", current.getDayOfMonth()+"", options);
        }
        if(texts.contains("_thang_")){
            range.replace("_thang_", current.getMonthValue()+"",options);
        }
        if(texts.contains("_nam_")) {
            range.replace("_nam_", current.getYear() + "", options);
        }
        if (texts.contains("_tenDeTai_")){
            range.replace("_tenDeTai_", deTai.getTenDeTai(), options);
        }
        if (texts.contains("_maSo_")){
            range.replace("_maSo_", deTai.getMaSo(), options);
        }
        if (texts.contains("_chuNhiemDeTai_")){
            range.replace("_chuNhiemDeTai_", deTai.getChuNhiemDeTai().getHoTen(), options);
        }
        if (texts.contains("_donViCongTac_")){
            range.replace("_donViCongTac_", deTai.getChuNhiemDeTai().getDonVi(), options);
        }
        document.save(fileName, SaveFormat.DOCX);
        return new File(fileName).getAbsoluteFile();
    }

    @Override
    public File xuatBienBanBanGiaoThietBi(DeTai deTai) throws Exception {
        applyALicense();
        Document document = new Document(getClass().getResourceAsStream("/bieumau/BM17.docx"));
        DocumentBuilder builder = new DocumentBuilder(document);

        String fileName = downloadFolder + "/BM17-" + deTai.getId() + new Date().getTime() + ".docx";
        Range range = document.getDocument().getRange();
        String texts = range.getText();
        LocalDate current = LocalDate.now();
        FindReplaceOptions options = new FindReplaceOptions(FindReplaceDirection.FORWARD);

        if(texts.contains("_donVi_")){
            range.replace("_donVi_", hrmServiceClient.getDonViById(deTai.getDonViId()).getTenDonVi(), options);
        }
        if(texts.contains("_ngay_")){
            range.replace("_ngay_", current.getDayOfMonth()+"", options);
        }
        if(texts.contains("_thang_")){
            range.replace("_thang_", current.getMonthValue()+"",options);
        }
        if(texts.contains("_nam_")) {
            range.replace("_nam_", current.getYear() + "", options);
        }
        if (texts.contains("_tenDeTai_")){
            range.replace("_tenDeTai_", deTai.getTenDeTai(), options);
        }
        if (texts.contains("_maSo_")){
            range.replace("_maSo_", deTai.getMaSo(), options);
        }
        if (texts.contains("_chuNhiemDeTai_")){
            range.replace("_chuNhiemDeTai_", deTai.getChuNhiemDeTai().getHoTen(), options);
        }
        if (texts.contains("_donViChuNhiemDeTai_")){
            range.replace("_donViChuNhiemDeTai_", deTai.getChuNhiemDeTai().getDonVi(), options);
        }
        if (texts.contains("_tenNguoiNhan_")){
            range.replace("_tenNguoiNhan_", cauHinhBieuMauService.getCauHinhCore().getTenBenA(),options);
        }
        if (texts.contains("_donViNguoiNhan_")){
            range.replace("_donViNguoiNhan_", cauHinhBieuMauService.getCauHinhCore().getDonVi(), options);
        }
        if (texts.contains("_chuVuNguoiNhan_")){
            range.replace("_chuVuNguoiNhan_", cauHinhBieuMauService.getCauHinhCore().getChucVuBenA(), options);
        }
        document.save(fileName, SaveFormat.DOCX);
        return new File(fileName).getAbsoluteFile();
    }

    @Override
    public File xuatDeNghiThanhToan(DeTai deTai) throws Exception {
        applyALicense();
        Document document = new Document(getClass().getResourceAsStream("/bieumau/BM18.docx"));
        DocumentBuilder builder = new DocumentBuilder(document);

        String fileName = downloadFolder + "/BM18-" + deTai.getId() + new Date().getTime() + ".docx";
        Range range = document.getDocument().getRange();
        String texts = range.getText();
        LocalDate current = LocalDate.now();
        Calendar calendar = Calendar.getInstance(TimeZone.getDefault());
        FindReplaceOptions options = new FindReplaceOptions(FindReplaceDirection.FORWARD);

        if(texts.contains("_ngay_")){
            range.replace("_ngay_", current.getDayOfMonth()+"", options);
        }
        if(texts.contains("_thang_")){
            range.replace("_thang_", current.getMonthValue()+"",options);
        }
        if(texts.contains("_nam_")) {
            range.replace("_nam_", current.getYear() + "", options);
        }
        if (texts.contains("_tenDeTai_")){
            range.replace("_tenDeTai_", deTai.getTenDeTai(), options);
        }
        if (texts.contains("_maSo_")){
            range.replace("_maSo_", deTai.getMaSo(), options);
        }
        if (texts.contains("_chuNhiemDeTai_")){
            range.replace("_chuNhiemDeTai_", deTai.getChuNhiemDeTai().getHoTen(), options);
        }
        if (texts.contains("_kinhPhiThucHien_")){
            range.replace("_kinhPhiThucHien_", decimalFormat.format(new BigDecimal(deTai.getKinhPhiDuocPhanBo())) +"", options);
        }
        calendar.setTime(deTai.getThoiGianQuyTrinh().getKetThucNghiemThu2());
        String ngayNghiemThu2 = calendar.get(Calendar.DAY_OF_MONTH) + 1 + "";
        if (texts.contains("_ngayNghiemThu2_")) {
            range.replace("_ngayNghiemThu2_", ngayNghiemThu2, options);
        }

        calendar.setTime(deTai.getThoiGianQuyTrinh().getKetThucNghiemThu2());
        String thangNghiemThu2 = calendar.get(Calendar.MONTH) + "";
        if (texts.contains("_thangNghiemThu2_")) {
            range.replace("_thangNghiemThu2_", thangNghiemThu2, options);
        }

        calendar.setTime(deTai.getThoiGianQuyTrinh().getKetThucNghiemThu2());
        String namNghiemThu2 = calendar.get(Calendar.YEAR) + "";
        if (texts.contains("_namNghiemThu2_")) {
            range.replace("_namNghiemThu2_", namNghiemThu2, options);
        }
        document.save(fileName, SaveFormat.DOCX);
        return new File(fileName).getAbsoluteFile();
    }

    @Override
    public File xuatThanhLiHopDong(DeTai deTai) throws Exception {
        applyALicense();
        Document document = new Document(getClass().getResourceAsStream("/bieumau/BM19.docx"));
        DocumentBuilder builder = new DocumentBuilder(document);

        String fileName = downloadFolder + "/BM19-" + deTai.getId() + new Date().getTime() + ".docx";
        Range range = document.getDocument().getRange();
        String texts = range.getText();
        LocalDate current = LocalDate.now();
        Calendar calendar = Calendar.getInstance(TimeZone.getDefault());
        FindReplaceOptions options = new FindReplaceOptions(FindReplaceDirection.FORWARD);

        if(texts.contains("_ngay_")){
            range.replace("_ngay_", current.getDayOfMonth() +"", options);
        }
        if(texts.contains("_tenDeTai_")){
            range.replace("_tenDeTai_", deTai.getTenDeTai() +"", options);
        }
        if(texts.contains("_thang_")){
            range.replace("_thang_", current.getMonth().getValue() +"", options);
        }
        if(texts.contains("_nam_")){
            range.replace("_nam_", current.getYear() +"", options);
        }
        //Bên A
        if (texts.contains("_tenBenA_")) {
            range.replace("_tenBenA_", cauHinhBieuMauService.getCauHinhCore().getTenBenA(), options);
        }
        if (texts.contains("_chucVuBenA_")) {
            range.replace("_chucVuBenA_", cauHinhBieuMauService.getCauHinhCore().getChucVuBenA(), options);
        }
        if (texts.contains("_thongTinTaiKhoanBenA_")) {
            range.replace("_thongTinTaiKhoanBenA_", cauHinhBieuMauService.getCauHinhCore().getThongTinTaiKhoanBenA(), options);
        }

        //Bên B
        if (texts.contains("_tenChuNhiem_")) {
            range.replace("_tenChuNhiem_", deTai.getChuNhiemDeTai().getHoTen(), options);
        }
        if (texts.contains("_tenDonVi_")) {
            range.replace("_tenDonVi_", deTai.getChuNhiemDeTai().getDonVi(), options);
        }
        if (texts.contains("_soTaiKhoanBenB_")) {
            range.replace("_soTaiKhoanBenB_", deTai.getChuNhiemDeTai().getTaiKhoanNganHang().getSoTaiKhoan(), options);
        }
        if (texts.contains("_nganHangBenB_")) {
            range.replace("_nganHangBenB_", deTai.getChuNhiemDeTai().getTaiKhoanNganHang().getNganHang().getTenNganHang(), options);
        }

        document.save(fileName, SaveFormat.DOCX);
        return new File(fileName).getAbsoluteFile();
    }

    @Override
    public File xuatDeXuatThanhVienHoiDongNghiemThu(HoiDongNghiemThu hoiDongNghiemThu) throws Exception {
        applyALicense();
        Document document = new Document(getClass().getResourceAsStream("/bieumau/BM12.docx"));
        DocumentBuilder builder = new DocumentBuilder(document);

        String fileName = downloadFolder + "/BM12-" + hoiDongNghiemThu.getId() + "-" + new Date().getTime() + ".docx";
        Range range = document.getDocument().getRange();
        LocalDate current = LocalDate.now();
        String texts = range.getText();
        FindReplaceOptions options = new FindReplaceOptions(FindReplaceDirection.FORWARD);

        if(texts.contains("_donVi_")){
            range.replace("_donVi_", hrmServiceClient.getDonViById(hoiDongNghiemThu.getDeTai().getDonViId()).getTenDonVi(), options);
        }
        if(texts.contains("_ngay_")){
            range.replace("_ngay_", current.getDayOfMonth()+"", options);
        }
        if(texts.contains("_thang_")){
            range.replace("_thang_", current.getMonthValue()+"",options);
        }
        if(texts.contains("_nam_")) {
            range.replace("_nam_", current.getYear() + "", options);
        }
        if (texts.contains("_tenDeTai_")){
            range.replace("_tenDeTai_", hoiDongNghiemThu.getDeTai().getTenDeTai(), options);
        }
        if (texts.contains("_maSo_")){
            range.replace("_maSo_", hoiDongNghiemThu.getDeTai().getMaSo(), options);
        }
        if (texts.contains("_chuNhiemDeTai_")){
            range.replace("_chuNhiemDeTai_", hoiDongNghiemThu.getDeTai().getChuNhiemDeTai().getHoTen(), options);
        }

        Table tableDeXuatHoiDongNghiemThu = (Table) document.getChild(NodeType.TABLE, 1, true);
        List<ThanhVienHoiDongNghiemThu>thanhVienHoiDongNghiemThuDeXuats = new ArrayList<>();
        hoiDongNghiemThu.getThanhVienHoiDongs().forEach(thanhVienHoiDongNghiemThu -> {
            if(ObjectUtils.isEmpty(thanhVienHoiDongNghiemThu.getTrangThaiDuyetThanhVien())){
                thanhVienHoiDongNghiemThuDeXuats.add(thanhVienHoiDongNghiemThu);
            }
        });

        for(int i=0; i<thanhVienHoiDongNghiemThuDeXuats.size(); i++){
            Row rowL = tableDeXuatHoiDongNghiemThu.getLastRow();
            Row cloneRowL = (Row) rowL.deepClone(true);
            ThanhVienHoiDongNghiemThu thanhVienHoiDongNghiemThu = thanhVienHoiDongNghiemThuDeXuats.get(i);
            rowL.getCells().get(0).getFirstParagraph().getParagraphFormat().setAlignment(ParagraphAlignment.CENTER);
            rowL.getCells().get(0).getFirstParagraph().appendChild(new Run(document, i + 1 +""));
            rowL.getCells().get(1).getFirstParagraph().getParagraphFormat().setAlignment(ParagraphAlignment.CENTER);
            rowL.getCells().get(1).getFirstParagraph().appendChild(new Run(document,  thanhVienHoiDongNghiemThu.getHoTen()));
            rowL.getCells().get(2).getFirstParagraph().getParagraphFormat().setAlignment(ParagraphAlignment.CENTER);
            rowL.getCells().get(2).getFirstParagraph().appendChild(new Run(document, thanhVienHoiDongNghiemThu.getChuyenMon()));
            rowL.getCells().get(3).getFirstParagraph().getParagraphFormat().setAlignment(ParagraphAlignment.CENTER);
            rowL.getCells().get(3).getFirstParagraph().appendChild(new Run(document, thanhVienHoiDongNghiemThu.getDonViCongTac()));
            rowL.getCells().get(4).getFirstParagraph().getParagraphFormat().setAlignment(ParagraphAlignment.CENTER);
            String trangThai = "";
            if(thanhVienHoiDongNghiemThu.getNhiemVuHoiDong().equals(EnumVaiTroNhiemVuHoiDongNghiemThu.PHAN_BIEN_NGOAI_TRUONG)){
                trangThai = "Phản biện ngoài trường";
            }else if(thanhVienHoiDongNghiemThu.getNhiemVuHoiDong().equals(EnumVaiTroNhiemVuHoiDongNghiemThu.PHAN_BIEN_TRONG_TRUONG)){
                trangThai = "Phản biện trong trường";
            }else trangThai = "Thành viên";
            rowL.getCells().get(4).getFirstParagraph().appendChild(new Run(document, trangThai));
            rowL.getCells().get(5).getFirstParagraph().getParagraphFormat().setAlignment(ParagraphAlignment.CENTER);
            rowL.getCells().get(5).getFirstParagraph().appendChild(new Run(document, thanhVienHoiDongNghiemThu.getEmail()));
            rowL.getCells().get(6).getFirstParagraph().getParagraphFormat().setAlignment(ParagraphAlignment.CENTER);
            rowL.getCells().get(6).getFirstParagraph().appendChild(new Run(document, thanhVienHoiDongNghiemThu.getSoDienThoai()));
            tableDeXuatHoiDongNghiemThu.appendChild(cloneRowL);
        }
        tableDeXuatHoiDongNghiemThu.getLastRow().remove();
        document.save(fileName, SaveFormat.DOCX);
        return new File(fileName).getAbsoluteFile();
    }

    @Override
    public File xuatPhieuDanhGiaNghiemThu(HoiDongNghiemThu hoiDongNghiemThu) throws Exception {
        applyALicense();
        Document document = new Document();
        Document bieuMau13 = new Document(getClass().getResourceAsStream("/bieumau/BM13.docx"));
        DocumentBuilder builder = new DocumentBuilder(document);
        String fileName = downloadFolder + "/BM13-" + hoiDongNghiemThu.getId()+"-"   + new Date().getTime() + ".docx";
        LocalDate current = LocalDate.now();
        FindReplaceOptions options = new FindReplaceOptions(FindReplaceDirection.FORWARD);

        document.removeAllChildren();
        for (ThanhVienHoiDongNghiemThu thanhVienHoiDongNghiemThu : hoiDongNghiemThu.getThanhVienHoiDongs()) {
            Range range = document.getDocument().getRange();
            document.appendDocument(bieuMau13, ImportFormatMode.KEEP_SOURCE_FORMATTING);
            String texts = range.getText();
            if(texts.contains("_ngay_")){
                range.replace("_ngay_", current.getDayOfMonth() +"", options);
            }
            if(texts.contains("_thang_")){
                range.replace("_thang_", current.getMonth().getValue() +"", options);
            }
            if(texts.contains("_nam_")){
                range.replace("_nam_", current.getYear() +"", options);
            }
            if (texts.contains("_tenThanhVien_")) {
                range.replace("_tenThanhVien_", thanhVienHoiDongNghiemThu.getHoTen(), options);
            }
            if (texts.contains("_tenDeTai_")) {
                range.replace("_tenDeTai_", hoiDongNghiemThu.getDeTai().getTenDeTai(), options);
            }
            if (texts.contains("_chuNhiemDeTai_")) {
                range.replace("_chuNhiemDeTai_", hoiDongNghiemThu.getDeTai().getChuNhiemDeTai().getHoTen(), options);
            }
            if (texts.contains("_soQuyetDinh_")) {
                range.replace("_soQuyetDinh_", hoiDongNghiemThu.getSoQuyetDinh(), options);
            }
            if (texts.contains("_coQuanChuTri_")) {
                range.replace("_coQuanChuTri_", cauHinhBieuMauService.getCauHinhCore().getCoQuanChuTri(), options);
            }
            if (texts.contains("_ngayHop_")) {
                range.replace("_ngayHop_", dateFormat.format(hoiDongNghiemThu.getNgayHop())+ "", options);
            }
            if (texts.contains("_diaDiem_")) {
                range.replace("_diaDiem_", hoiDongNghiemThu.getDiaDiem() + "", options);
            }
            if (texts.contains("_coQuan_")){
                range.replace("_coQuan_", thanhVienHoiDongNghiemThu.getDonViCongTac(), options);
            }
            if (texts.contains("_maSo")){
                range.replace("_maSo_", hoiDongNghiemThu.getDeTai().getMaSo(), options);
            }
            if (texts.contains("_ngayQuyetDinh_")){
                range.replace("_ngayQuyetDinh_", dateFormat.format(hoiDongNghiemThu.getNgayQuyetDinh()) +"", options);
            }
        }
        document.getFirstSection().getBody().getFirstParagraph().remove();
        document.getLastSection().getBody().getFirstParagraph().remove();
        document.save(fileName, SaveFormat.DOCX);
        return new File(fileName).getAbsoluteFile();
    }

    @Override
    public File xuatBienBanHopHoiDongNghiemThu(HoiDongNghiemThu hoiDongNghiemThu) throws Exception {
        applyALicense();
        Document document = new Document(getClass().getResourceAsStream("/bieumau/BM14.docx"));
        DocumentBuilder builder = new DocumentBuilder(document);
        String fileName = downloadFolder + "/BM14-" + hoiDongNghiemThu.getId()+"-"   + new Date().getTime() + ".docx";
        LocalDate current = LocalDate.now();
        FindReplaceOptions options = new FindReplaceOptions(FindReplaceDirection.FORWARD);
        Range range = document.getDocument().getRange();
        String texts = range.getText();

        if(texts.contains("_ngay_")){
            range.replace("_ngay_", current.getDayOfMonth() +"", options);
        }
        if(texts.contains("_thang_")){
            range.replace("_thang_", current.getMonth().getValue() +"", options);
        }
        if(texts.contains("_nam_")){
            range.replace("_nam_", current.getYear() +"", options);
        }
        if (texts.contains("_tenDeTai_")) {
            range.replace("_tenDeTai_", hoiDongNghiemThu.getDeTai().getTenDeTai(), options);
        }
        if (texts.contains("_chuNhiemDeTai_")) {
            range.replace("_chuNhiemDeTai_", hoiDongNghiemThu.getDeTai().getChuNhiemDeTai().getHoTen(), options);
        }
        if (texts.contains("_soQuyetDinh_")) {
            range.replace("_soQuyetDinh_", hoiDongNghiemThu.getSoQuyetDinh(), options);
        }
        if (texts.contains("_coQuanChuTri_")) {
            range.replace("_coQuanChuTri_", cauHinhBieuMauService.getCauHinhCore().getCoQuanChuTri(), options);
        }
        if (texts.contains("_ngayHop_")) {
            range.replace("_ngayHop_", dateFormat.format(hoiDongNghiemThu.getNgayHop())+ "", options);
        }
        if (texts.contains("_diaDiem_")) {
            range.replace("_diaDiem_", hoiDongNghiemThu.getDiaDiem() + "", options);
        }
        if (texts.contains("_maSo_")){
            range.replace("_maSo_", hoiDongNghiemThu.getDeTai().getMaSo(), options);
        }
        if (texts.contains("_khachMoi_")){
            range.replace("_khachMoi_", hoiDongNghiemThu.getKhachMoi(), options);
        }

        document.save(fileName, SaveFormat.DOCX);
        return new File(fileName).getAbsoluteFile();
    }

    @Override
    public File xuatPhieuNhanXetPhanBien(HoiDongNghiemThu hoiDongNghiemThu) throws Exception {
        applyALicense();
        Document document = new Document();
        Document bieuMau15 = new Document(getClass().getResourceAsStream("/bieumau/BM15.docx"));
        DocumentBuilder builder = new DocumentBuilder(document);
        String fileName = downloadFolder + "/BM15-" + hoiDongNghiemThu.getId()+"-"   + new Date().getTime() + ".docx";
        LocalDate current = LocalDate.now();
        FindReplaceOptions options = new FindReplaceOptions(FindReplaceDirection.FORWARD);

        document.removeAllChildren();
        for (ThanhVienHoiDongNghiemThu thanhVienHoiDongNghiemThu : hoiDongNghiemThu.getThanhVienHoiDongs()) {
            Range range = document.getDocument().getRange();
            document.appendDocument(bieuMau15, ImportFormatMode.KEEP_SOURCE_FORMATTING);
            String texts = range.getText();
            if(texts.contains("_ngay_")){
                range.replace("_ngay_", current.getDayOfMonth() +"", options);
            }
            if(texts.contains("_thang_")){
                range.replace("_thang_", current.getMonth().getValue() +"", options);
            }
            if(texts.contains("_nam_")){
                range.replace("_nam_", current.getYear() +"", options);
            }
            if (texts.contains("_tenThanhVien_")) {
                range.replace("_tenThanhVien_", thanhVienHoiDongNghiemThu.getHoTen(), options);
            }
            if (texts.contains("_tenDeTai_")) {
                range.replace("_tenDeTai_", hoiDongNghiemThu.getDeTai().getTenDeTai(), options);
            }
            if (texts.contains("_chuNhiemDeTai_")) {
                range.replace("_chuNhiemDeTai_", hoiDongNghiemThu.getDeTai().getChuNhiemDeTai().getHoTen(), options);
            }
            if (texts.contains("_coQuanChuTri_")) {
                range.replace("_coQuanChuTri_", cauHinhBieuMauService.getCauHinhCore().getCoQuanChuTri(), options);
            }
            if (texts.contains("_coQuan_")){
                range.replace("_coQuan_", thanhVienHoiDongNghiemThu.getDonViCongTac(), options);
            }
            if (texts.contains("_maSo")){
                range.replace("_maSo_", hoiDongNghiemThu.getDeTai().getMaSo(), options);
            }
        }
//        document.getFirstSection().getBody().getFirstParagraph().remove();
//        document.getLastSection().getBody().getFirstParagraph().remove();
        document.save(fileName, SaveFormat.DOCX);
        return new File(fileName).getAbsoluteFile();
    }

    //<editor-fold desc="private method">
    public static void mergeCells(Cell startCell, Cell endCell) {
        Table parentTable = startCell.getParentRow().getParentTable();

        // Find the row and cell indices for the start and end cell.
        Point startCellPos = new Point(startCell.getParentRow().indexOf(startCell), parentTable.indexOf(startCell.getParentRow()));
        Point endCellPos = new Point(endCell.getParentRow().indexOf(endCell), parentTable.indexOf(endCell.getParentRow()));
        // Create the range of cells to be merged based off these indices. Inverse each index if the end cell if before the start cell.
        Rectangle mergeRange = new Rectangle(Math.min(startCellPos.x, endCellPos.x), Math.min(startCellPos.y, endCellPos.y), Math.abs(endCellPos.x - startCellPos.x) + 1,
                Math.abs(endCellPos.y - startCellPos.y) + 1);

        for (Row row : parentTable.getRows()) {
            for (Cell cell : row.getCells()) {
                Point currentPos = new Point(row.indexOf(cell), parentTable.indexOf(row));

                // Check if the current cell is inside our merge range then merge it.
                if (mergeRange.contains(currentPos)) {
                    if (currentPos.x == mergeRange.x)
                        cell.getCellFormat().setHorizontalMerge(CellMerge.FIRST);
                    else
                        cell.getCellFormat().setHorizontalMerge(CellMerge.PREVIOUS);

                    if (currentPos.y == mergeRange.y)
                        cell.getCellFormat().setVerticalMerge(CellMerge.FIRST);
                    else
                        cell.getCellFormat().setVerticalMerge(CellMerge.PREVIOUS);
                }
            }
        }
    }

    private void applyALicense() throws Exception {
        InputStream inLicense = new ClassPathResource("/license/license.xml").getInputStream();
        com.aspose.words.License license = new com.aspose.words.License();
        license.setLicense(inLicense);
    }


    private static void insertDocument(Node insertAfterNode, Document srcDoc) throws Exception {
        // Make sure that the node is either a paragraph or table.
        if ((insertAfterNode.getNodeType() != NodeType.PARAGRAPH) & (insertAfterNode.getNodeType() != NodeType.TABLE))
            throw new IllegalArgumentException("The destination node should be either a paragraph or table.");

        // We will be inserting into the parent of the destination paragraph.
        CompositeNode dstStory = insertAfterNode.getParentNode();

        // This object will be translating styles and lists during the import.
        NodeImporter importer = new NodeImporter(srcDoc, insertAfterNode.getDocument(), ImportFormatMode.USE_DESTINATION_STYLES);

        // Loop through all sections in the source document.
        for (Section srcSection : srcDoc.getSections()) {
            // Loop through all block level nodes (paragraphs and tables) in the body of the section.
            for (Node srcNode : (Iterable<Node>) srcSection.getBody()) {
                // Let's skip the node if it is a last empty paragraph in a section.
                if (srcNode.getNodeType() == (NodeType.PARAGRAPH)) {
                    Paragraph para = (Paragraph) srcNode;
                    if (para.isEndOfSection() && !para.hasChildNodes())
                        continue;
                }

                // This creates a clone of the node, suitable for insertion into the destination document.
                Node newNode = importer.importNode(srcNode, true);

                // Insert new node after the reference node.
                dstStory.insertAfter(newNode, insertAfterNode);
                insertAfterNode = newNode;
            }
        }
    }
    //</editor-fold>

    private static class ReplaceWithHtmlEvaluator implements IReplacingCallback {
        private final String mReplacement;

        private ReplaceWithHtmlEvaluator(String mReplacement) {
            this.mReplacement = mReplacement;
        }

        public int replacing(ReplacingArgs e) throws Exception {

            // This is a Run node that contains either the beginning or the complete match.
            Node currentNode = e.getMatchNode();
            // create Document Buidler and insert MergeField
            DocumentBuilder builder = new DocumentBuilder((Document) e.getMatchNode().getDocument());
            builder.moveTo(currentNode);
            // Replace '<CustomerName>' text with a red bold name.
            builder.insertHtml(mReplacement);e.getReplacement();
            if(builder.getCurrentParagraph().hasChildNodes()) {
                builder.getCurrentParagraph().remove();
            }
            currentNode.remove();
            //Signal to the replace engine to do nothing because we have already done all what we wanted.
            return ReplaceAction.SKIP;
        }
    }

}
