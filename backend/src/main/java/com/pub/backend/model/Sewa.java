package com.pub.backend.model;

import java.time.LocalDateTime;
import java.time.LocalTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Sewa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
   
    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User  user_id ;

    @ManyToOne
    @JoinColumn(name = "field_id", referencedColumnName = "id")
    private Field field_id;

    private LocalDateTime tanggalPesan;

    private Integer lamaSewa;

    private LocalTime waktuMulai;
    private LocalTime waktuBerakhir;
    private Double harga;
    private Double total;
}


// {
//   "user": {
//     "id": 1
//   },
//   "field_id": {
//     "id": 7
//   },
//   "tanggalPesan": "2024-08-31T10:00:00",
//   "lamaSewa": 4,
//   "waktuMulai": "10:00",
//   "waktuBerakhir": "14:00",
//   "harga": 20000,
//   "total": 80000
// }