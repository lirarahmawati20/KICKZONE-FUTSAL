package com.pub.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pub.backend.model.Payment;

public interface PaymentRepository extends JpaRepository<Payment,Long>{
    
}
