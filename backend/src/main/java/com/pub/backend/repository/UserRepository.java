package com.pub.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.pub.backend.model.User;

public interface UserRepository extends JpaRepository<User, Long>{
   User findByEmail(String email);
} 
