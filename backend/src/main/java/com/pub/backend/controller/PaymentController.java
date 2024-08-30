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

import com.pub.backend.model.Payment;
import com.pub.backend.model.Sewa;
import com.pub.backend.repository.PaymentRepository;




@CrossOrigin(origins ="http://localhost:5173")
@RequestMapping("/api/payment")
@RestController
public class PaymentController {

    @Autowired
   PaymentRepository repository;

   
    @GetMapping
    public List<Payment> getAll() {
        return repository.findAll();
    }


   
    @GetMapping("/{id}")
    public Object getById(@PathVariable Long id) {
        Payment payment = repository.findById(id).orElse(null);
        if (payment != null) {
            return payment;
        } else {
            return "Payment with ID " + id + " not found";
        }
    }

   
    @PostMapping
    public String create(@RequestBody Payment payment) {
        repository.save(payment);
        return "payment successfully added";
    }

     @PutMapping("/{id}")
    public String update(@PathVariable Long id,@RequestBody  Payment payment) {
        payment.setId(id);
        repository.save(payment);
        return " Payment successfully updated";
    }
    
    @DeleteMapping("/{id}")
    public String deleteById(@PathVariable Long id) {
        repository.deleteById(id);
        return "Payment successfully deleted";
    }
}