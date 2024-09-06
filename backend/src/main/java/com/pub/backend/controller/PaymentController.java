package com.pub.backend.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.pub.backend.dto.PaymentDto;
import com.pub.backend.model.Payment;
import com.pub.backend.model.Sewa;
import com.pub.backend.repository.PaymentRepository;
import com.pub.backend.repository.SewaRepository;

@CrossOrigin(origins = "http://localhost:5173", allowCredentials="true")
@RequestMapping("/api/payment")
@RestController
public class PaymentController {

    @Autowired
    private PaymentRepository repository;

    @Autowired
    private SewaRepository sewaRepository;

    // Get all payments
    @GetMapping
    public ResponseEntity<List<Payment>> getAll() {
        List<Payment> payments = repository.findAll();
        return ResponseEntity.ok(payments); // Mengembalikan status 200 OK dengan data payment
    }

    // Get payment by ID
    @GetMapping("/{id}")
    public ResponseEntity<Object> getById(@PathVariable Long id) {
        Optional<Payment> payment = repository.findById(id);
        if (payment.isPresent()) {
            return ResponseEntity.ok(payment.get()); // Mengembalikan status 200 OK dengan data payment
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Payment with ID " + id + " not found");
        }
    }

    // Create new payment
    @PostMapping
    public ResponseEntity<String> create(@RequestBody PaymentDto payment) {
        Sewa sewa = sewaRepository.findById(payment.getIdSewa()).orElse(null);
        if (sewa!=null){
            if(!sewa.getBokingStatus().equalsIgnoreCase("paid")){
            sewa.setBokingStatus("paid");
            sewaRepository.save(sewa);
            Payment savePayment=new Payment();
            savePayment.setId_sewa(sewa);
            savePayment.setBukti(payment.getBukti());
            savePayment.setKonfirmasi(payment.getKonfirmasi());

            repository.save(savePayment);
            return ResponseEntity.status(HttpStatus.CREATED).body("Payment successfully added");
            }
            else{
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Sewa with ID " + payment.getIdSewa()+ " sudah di bayar");
            }
           
        }
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Sewa with ID " + payment.getIdSewa()+ " not found" );
        }
    }

    // Update payment
    @PutMapping("/{id}")

    public ResponseEntity<String> update(@PathVariable Long id, @RequestBody Payment paymentDetails) {
        Optional<Payment> existingPayment = repository.findById(id);
        if (existingPayment.isPresent()) {
            // Sewa sewa=sewarePository.findById(paymentDetails.)
            Payment paymentToUpdate = existingPayment.get();
            paymentToUpdate.setBukti(paymentDetails.getBukti());
            // paymentToUpdate.setTanggal_uplode(paymentDetails.getTanggal_uplode());
            paymentToUpdate.setKonfirmasi(paymentDetails.getKonfirmasi());
            paymentToUpdate.setId_sewa(paymentDetails.getId_sewa());

            repository.save(paymentToUpdate);
            return ResponseEntity.ok("Payment successfully updated");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Payment with ID " + id + " not found");
        }
    }

    // Delete payment by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteById(@PathVariable Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return ResponseEntity.ok("Payment successfully deleted");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Payment with ID " + id + " not found");
        }
    }
}
