package com.pub.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.pub.backend.model.Field;

public interface  FieldRepository extends JpaRepository<Field, Long>  {
    
}
