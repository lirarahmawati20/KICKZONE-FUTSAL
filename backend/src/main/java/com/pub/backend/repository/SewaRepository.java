package com.pub.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.pub.backend.model.Sewa;

public interface  SewaRepository extends JpaRepository<Sewa,Long> {
    
}
