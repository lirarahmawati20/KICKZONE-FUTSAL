package com.pub.backend.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pub.backend.model.User;
import com.pub.backend.repository.UserRepository;

@CrossOrigin(origins ="http://localhost:5173")
@RequestMapping("/api/users")
@RestController
public class UserController {
     @Autowired
    UserRepository repository;

     @GetMapping
    public List<User> getAll() {
    return repository.findAll();
    }


     @GetMapping("/{id}")
    public Object getById(@PathVariable Long id) {
        User user = repository.findById(id).orElse(null);
        if (user!= null) {
            return user;
        } else {
            return " useruser with ID " + id + " not found";
        }
    }

    @PostMapping
    public String create(@RequestBody User user) {
        repository.save(user);
        return "sewa successfully added";
    }

 @DeleteMapping("/{id}")
    public String deleteById(@PathVariable Long id) {
        repository.deleteById(id);
        return "users successfully deleted";
    }
    
}
