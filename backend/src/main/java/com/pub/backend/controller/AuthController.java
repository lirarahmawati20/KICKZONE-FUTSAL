package com.pub.backend.controller;

// import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// import java.util.Map;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.security.core.context.SecurityContextHolder;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.web.bind.annotation.CrossOrigin;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestMapping;
// // import org.springframework.web.bind.annotation.RequestParam;
// import org.springframework.web.bind.annotation.RestController;

// import com.nimbusds.jose.JOSEException;
// import com.pub.backend.model.User;
// import com.pub.backend.repository.UserRepository;
// import com.pub.backend.service.JwtService;

// import jakarta.servlet.http.Cookie;
// import jakarta.servlet.http.HttpServletResponse;

// @RestController
// @CrossOrigin(origins ="http://localhost:5173")
// @RequestMapping("api/auth")
// public class AuthController {

//     private final JwtService jwtService;
//     private final UserRepository userRepository;
//     private final PasswordEncoder passwordEncoder;

//     @Autowired
//     public AuthController(JwtService jwtService, UserRepository userRepository, PasswordEncoder passwordEncoder) {
//         this.jwtService = jwtService;
//         this.userRepository = userRepository;
//         this.passwordEncoder = passwordEncoder;
//     }

//     @PostMapping("register")
//     public ResponseEntity<User> register(@RequestBody User user) {
//        try {
//             user.setPassword(passwordEncoder.encode(user.getPassword()));
//             return ResponseEntity.ok(userRepository.save(user));
//         } catch (Exception e) {
//             return ResponseEntity.badRequest().build();
//         }
//     }

//     @PostMapping("sign-in")
//     public ResponseEntity<String> signIn(@RequestParam String email, @RequestParam String password,
//             HttpServletResponse response) throws JOSEException {
//          User user = userRepository.findByEmail(email);
//         if (user != null) {
//             if (passwordEncoder.matches(password, user.getPassword())) {
//                 String token = jwtService.create(user.getId().toString());

//                 Cookie cookie = new Cookie("token", token);
//                 cookie.setHttpOnly(true);
//                 cookie.setMaxAge(60 * 60 * 24 * 7);
//                 cookie.setPath("/");
//                 response.addCookie(cookie);

//                 return ResponseEntity.ok(token);
//             } else {
//                 return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
//             }
//         } else {
//             return ResponseEntity.notFound().build();
//         }
//     }

//     @GetMapping("me")
//     public User me() {
//         return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//     }

//     @PostMapping("sign-out")
//     public void signOut(HttpServletResponse response) {
//         jwtService.signOut(response);
//     }
// }



// @CrossOrigin (origins = "http://localhost:5173")
// @RestController
// @RequestMapping("/api/auth")
// public class AuthController {

//     private final JwtService jwtService;
//     private final UserRepository userRepository;
//     private final PasswordEncoder passwordEncoder;

//     @Autowired
//     public AuthController(JwtService jwtService, UserRepository userRepository, PasswordEncoder passwordEncoder) {
//         this.jwtService = jwtService;
//         this.userRepository = userRepository;
//         this.passwordEncoder = passwordEncoder;
//     }

//  @PostMapping("/sign-up")
//     public ResponseEntity<Map<String, String>> register(@RequestBody Map<String, String> userMap) {
//         String email = userMap.get("email");
//         String username = userMap.get("username");
//         String password = userMap.get("password");
//         String jenisKelamin = userMap.get("jenisKelamin");
//         String noHp = userMap.get("noHp");

//         String role = userMap.get("role"); // Ambil role dari request

//         // Validasi input atau logika tambahan sesuai kebutuhan
//         if (userRepository.existsByEmail(email)) {
//             Map<String, String> error = new HashMap<>();
//             error.put("message", "Email already in use");
//             return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
//         }

//         // Buat objek User baru
//         User user = new User();
//         user.setEmail(email);
//         user.setUsername(username);
//         user.setPassword(passwordEncoder.encode(password)); // Hash password
//         user.setJenisKelamin(jenisKelamin);
//         user.setNoHp(noHp);
//         user.setRole(role); // Set role yang dipilih

//         // Simpan user ke database
//         userRepository.save(user);

//         Map<String, String> success = new HashMap<>();
//         success.put("message", "User registered successfully");
//         return ResponseEntity.ok(success);
//     }
//     @PostMapping("/sign-in")
//     public ResponseEntity<Map<String, String>> signIn(@RequestBody Map<String, String> userMap,
//             HttpServletResponse response) throws JOSEException {
//         String email = userMap.get("email");
//         String password = userMap.get("password");
        
//         User user = userRepository.findByEmail(email);
//         if (user != null) {
//             if (passwordEncoder.matches(password, user.getPassword())) {
//                 String token = jwtService.create(user.getId().toString());
    
//                 Cookie cookie = new Cookie("token", token);
//                 cookie.setHttpOnly(true);
//                 cookie.setMaxAge(60 * 60 * 24 * 7);
//                 cookie.setPath("/");
//                 response.addCookie(cookie);
    
//                 Map<String, String> result = new HashMap<>();
//                 result.put("token", token);
//                 result.put("role", user.getRole()); // Menyertakan peran pengguna dalam respons
//                 return ResponseEntity.ok(result);
//             } else {
//                 Map<String, String> error = new HashMap<>();
//                 error.put("message", "Invalid password");
//                 return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
//             }
//         } else {
//             Map<String, String> error = new HashMap<>();
//             error.put("message", "User not found");
//             return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
//         }
//     }
//         @GetMapping("me")
//     public User me() {
//         return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//     }

//     @PostMapping("sign-out")
//     public void signOut(HttpServletResponse response) {
//         jwtService.signOut(response);
//     }
// }

@RestController
@RequestMapping("/auth")
public class AuthController {
     @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<Response> register(@RequestBody User user){
        Response response = userService.register(user);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }
    @PostMapping("/login")
    public ResponseEntity<Response> login(@RequestBody LoginRequest loginRequest){
        Response response = userService.login(loginRequest);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }
}