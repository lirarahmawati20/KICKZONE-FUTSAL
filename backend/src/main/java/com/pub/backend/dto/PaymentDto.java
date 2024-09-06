package com.pub.backend.dto;

import com.pub.backend.model.Sewa;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PaymentDto {
    private Long Id; 
    private Long idSewa;
    private String bukti; 
    private String konfirmasi; 
}
