// import java.util.List;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.web.bind.annotation.CrossOrigin;
// import org.springframework.web.bind.annotation.DeleteMapping;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.PutMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;

// import com.pub.backend.model.Payment;
// import com.pub.backend.model.Sewa;
// import com.pub.backend.repository.PaymentRepository;




// @CrossOrigin(origins ="http://localhost:5173")
// @RequestMapping("/api/payment")
// @RestController
// public class PaymentController {

//     @Autowired
//    PaymentRepository repository;

   
//     @GetMapping
//     public List<Payment> getAll() {
//         return repository.findAll();
//     }


   
//     @GetMapping("/{id}")
//     public Object getById(@PathVariable Long id) {
//         Payment payment = repository.findById(id).orElse(null);
//         if (payment != null) {
//             return payment;
//         } else {
//             return "Payment with ID " + id + " not found";
//         }
//     }

   
//     @PostMapping
//     public String create(@RequestBody Payment payment) {
//         repository.save(payment);
//         return "payment successfully added";
//     }

//      @PutMapping("/{id}")
//     public String update(@PathVariable Long id,@RequestBody  Payment payment) {
//         payment.setId(id);
//         repository.save(payment);
//         return " Payment successfully updated";
//     }
    
//     @DeleteMapping("/{id}")
//     public String deleteById(@PathVariable Long id) {
//         repository.deleteById(id);
//         return "Payment successfully deleted";
//     }
// }

package com.pub.backend.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.pub.backend.model.Payment;
import com.pub.backend.repository.PaymentRepository;

@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/payment")
@RestController
public class PaymentController {

    @Autowired
    private PaymentRepository repository;

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
    public ResponseEntity<String> create(@RequestBody Payment payment) {
        repository.save(payment);
        return ResponseEntity.status(HttpStatus.CREATED).body("Payment successfully added");
    }

    // Update payment
    @PutMapping("/{id}")
    public ResponseEntity<String> update(@PathVariable Long id, @RequestBody Payment paymentDetails) {
        Optional<Payment> existingPayment = repository.findById(id);
        if (existingPayment.isPresent()) {
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
