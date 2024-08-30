
package com.pub.backend.model;



import java.time.LocalDate;

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
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id; 

    @ManyToOne
    @JoinColumn(name = "Id_ewa", referencedColumnName = "id")
    private Sewa Id_sewa ;
    
    private String bukti; 
    private LocalDate tanggal_uplode;
    private String konfirmasi; 
}