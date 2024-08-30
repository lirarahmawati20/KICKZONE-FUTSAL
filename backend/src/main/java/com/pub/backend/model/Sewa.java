package com.pub.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Getter
@Setter
@Entity
public class Sewa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "field_id", referencedColumnName = "id")
    private Field field_id;

    private LocalDateTime tanggalPesan;

    private Integer lamaSewa;

    private LocalTime waktuMulai;
    private LocalTime waktuBerakhir;

    private Integer harga;
    private Integer total;
}
