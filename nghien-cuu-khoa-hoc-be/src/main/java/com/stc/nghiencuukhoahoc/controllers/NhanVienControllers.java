package com.stc.nghiencuukhoahoc.controllers;

import com.stc.nghiencuukhoahoc.entities.embeded.NhanVienEd;
import com.stc.nghiencuukhoahoc.services.nhanvien.NhanVienService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

/**
 * Created by: IntelliJ IDEA
 * User: vlong
 * Date: 19/5/2021
 * Time: 10:20 AM
 * Filename: NhanVienControllers
 */
@RestController
@RequestMapping("/rest/nhan-vien")
public class NhanVienControllers {

    private final NhanVienService nhanVienService;
    public NhanVienControllers(NhanVienService nhanVienService){

        this.nhanVienService = nhanVienService;
    }

    @GetMapping("/don-vi/{donViId}")
    @ApiOperation(value = "Get danh sách nhân viên theo đơn vị")
    public ResponseEntity<List<NhanVienEd>> getListNhanVienByDonVi(@PathVariable String donViId){
        return new ResponseEntity<>(nhanVienService.getAllNhanVienByDonVi(donViId), HttpStatus.OK);
    }

    @GetMapping
    @ApiOperation(value = "Get current user")
    public ResponseEntity<NhanVienEd>getCurrentUser(Principal principal){
        return new ResponseEntity<>(nhanVienService.getCurrent(principal), HttpStatus.OK);
    }

    @GetMapping("/email/{email}")
    @ApiOperation(value = "Get nhân viên by email")
    public ResponseEntity<NhanVienEd> getNhanVienByEmail(@PathVariable String email){
        return new ResponseEntity<>(nhanVienService.getByEmail(email), HttpStatus.OK);
    }

}
