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

import com.pub.backend.model.Field;
import com.pub.backend.repository.FieldRepository;




@CrossOrigin(origins ="http://localhost:5173")
@RequestMapping("/api/fields")
@RestController
public class FieldController {

    @Autowired
    FieldRepository repository;

    // Get all fields
    @GetMapping("/get")
    public List<Field> getAll() {
        return repository.findAll();
    }

    // Get a field by ID
    @GetMapping("/{id}")
    public Object getById(@PathVariable Long id) {
        Field field = repository.findById(id).orElse(null);
        if (field != null) {
            return field;
        } else {
            return "Field with ID " + id + " not found";
        }
    }

    // Create a new field
    @PostMapping
    public String create(@RequestBody Field field) {
        repository.save(field);
        return "Field successfully added";
    }

    // Update a field
    @PutMapping("/{id}")
    public String update(@PathVariable Long id,@RequestBody Field field) {
        field.setId(id);
        repository.save(field);
        return "Field successfully updated";
    }

    // Delete a field by ID
    @DeleteMapping("/{id}")
    public String deleteById(@PathVariable Long id) {
        repository.deleteById(id);
        return "Field successfully deleted";
    }
}