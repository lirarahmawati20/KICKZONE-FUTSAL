package com.pub.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pub.backend.model.Sewa;
import com.pub.backend.repository.SewaRepository;


@CrossOrigin(origins ="http://localhost:5173")
@RequestMapping("/api/sewa")
@RestController
public class SewaController {

    @Autowired
    SewaRepository repository;

    @GetMapping
    public List<Sewa> getAll() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public Object getById(@PathVariable Long id) {
        Sewa sewa = repository.findById(id).orElse(null);
        if (sewa!= null) {
            return sewa;
        } else {
            return " sewa with ID " + id + " not found";
        }
    }


    @PostMapping
    public String create(@RequestBody Sewa sewa) {
        repository.save(sewa);
        return "sewa successfully added";
    }

    
    @PutMapping
    public String update(@RequestBody Sewa sewa) {
        repository.save(sewa);
        return "sewa successfully updated";
    }

   
    @DeleteMapping("/{id}")
    public String deleteById(@PathVariable Long id) {
        repository.deleteById(id);
        return "sewa successfully deleted";
    }
}