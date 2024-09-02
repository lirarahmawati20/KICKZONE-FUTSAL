
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
    @JoinColumn(name = "Id_sewa", referencedColumnName = "id")
    private Sewa Id_sewa ;
    
    private String bukti; 
    private LocalDate tanggal_uplode;
    private String konfirmasi; 
}

// {
//   "user": {
//     "id": 1
//   },
//   "Id_sewa": {
//     "id": 7
//   },
//   "bukti": "path/to/bukti.jpg",
//   "tanggal_uplode": "2024-08-31",
//   "konfirmasi": "pending"
// }
