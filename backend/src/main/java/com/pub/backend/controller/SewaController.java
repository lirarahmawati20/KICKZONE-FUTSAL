package com.pub.backend.controller;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pub.backend.dto.SewaDto;
import com.pub.backend.model.Field;
import com.pub.backend.model.Sewa;
import com.pub.backend.model.User;
import com.pub.backend.repository.FieldRepository;
import com.pub.backend.repository.SewaRepository;


@CrossOrigin(origins ="http://localhost:5173")
@RequestMapping("/api/sewa")
@RestController
public class SewaController {

    @Autowired
    SewaRepository repository;

    @Autowired
    FieldRepository repositoryField;

    @GetMapping
    public List<Sewa> getAll() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public Object getById(@PathVariable Long id) {
        Sewa sewa = repository.findById(id).orElse(null);
        if (sewa!= null) {
            return sewa;
        } else {
            return " sewa with ID " + id + " not found";
        }
    }


    @PostMapping
    public String create(@RequestBody SewaDto sewaDto) {
        System.out.println(sewaDto.getUser_id());
         Field field = repositoryField.findById(sewaDto.getField_id().getId()).orElse(null);
        if (field != null) {
        Sewa sewa= new Sewa();
        sewa.setField_id(sewaDto.getField_id());
        sewa.setLamaSewa(sewaDto.getLamaSewa());
        sewa.setUser_id(new User(sewaDto.getUser_id()));
        sewa.setWaktuBerakhir(sewaDto.getWaktuBerakhir());
        sewa.setWaktuMulai(sewaDto.getWaktuMulai());
        sewa.setTotal(field.getPrice()*sewaDto.getLamaSewa());
        sewa.setHarga(field.getPrice());
        sewa.setStatus("pending");
        sewa.setTanggalPesan(convertToLocalDateTime(sewaDto.getTanggalPesan()));
        repository.save(sewa);
        return "sewa successfully added";
        } else {
            return "Field with ID " + sewaDto.getField_id().getId()+ " not found";
        }
       
    }


    @PutMapping("/{id}")
    public String update(@PathVariable Long id,@RequestBody Sewa sewa) {
        sewa.setId(id);
        repository.save(sewa);
        return "Sewa successfully updated";
    }
   
    @DeleteMapping("/{id}")
    public String deleteById(@PathVariable Long id) {
        repository.deleteById(id);
        return "sewa successfully deleted";
    }

    public static LocalDateTime convertToLocalDateTime(String dateStr) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate date = LocalDate.parse(dateStr, formatter);
        return date.atStartOfDay();}
}