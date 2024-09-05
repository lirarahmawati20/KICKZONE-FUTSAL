package com.pub.backend.dto;

import java.time.LocalTime;

import com.pub.backend.model.Field;
import com.pub.backend.model.User;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SewaDto {
      
    private Long id;
    private Long user_id ;
    private Field field_id;
    private String tanggalPesan;
    private Integer lamaSewa;
    private LocalTime waktuMulai;
    private LocalTime waktuBerakhir;
    private Double harga;
    private Double total;

}
