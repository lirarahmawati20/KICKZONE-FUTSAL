package com.pub.backend.controller;

import java.util.HashMap;
import java.util.Map;

import com.pub.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.nimbusds.jose.JOSEException;
import com.pub.backend.model.User;
import com.pub.backend.repository.UserRepository;
import com.pub.backend.service.JwtService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

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



@CrossOrigin (origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AuthController(JwtService jwtService, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.jwtService = jwtService;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

 @PostMapping("/sign-up")
    public ResponseEntity<Map<String, String>> register(@RequestBody Map<String, String> userMap) {
        String email = userMap.get("email");
        String username = userMap.get("username");
        String password = userMap.get("password");
        String jenisKelamin = userMap.get("jenisKelamin");
        String noHp = userMap.get("noHp");

        String role = userMap.get("role"); // Ambil role dari request

        // Validasi input atau logika tambahan sesuai kebutuhan
        if (userRepository.existsByEmail(email)) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Email already in use");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }

        // Buat objek User baru
        User user = new User();
        user.setEmail(email);
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(password)); // Hash password
        user.setJenisKelamin(jenisKelamin);
        user.setNoHp(noHp);
        user.setRole(role); // Set role yang dipilih

        // Simpan user ke database
        userRepository.save(user);

        Map<String, String> success = new HashMap<>();
        success.put("message", "User registered successfully");
        return ResponseEntity.ok(success);
    }
    @PostMapping("/sign-in")
    public ResponseEntity<Map<String, String>> signIn(@RequestBody Map<String, String> userMap,
            HttpServletResponse response) throws JOSEException {
        String email = userMap.get("email");
        String password = userMap.get("password");
        
        User user = userRepository.findByEmail(email);
        if (user != null) {
            if (passwordEncoder.matches(password, user.getPassword())) {
                String token = jwtService.create(user.getId().toString());
    
                Cookie cookie = new Cookie("token", token);
                cookie.setHttpOnly(true);
                cookie.setMaxAge(60 * 60 * 24 * 7);
                cookie.setPath("/");
                response.addCookie(cookie);
    
                Map<String, String> result = new HashMap<>();
                result.put("token", token);
                result.put("role", user.getRole()); // Menyertakan peran pengguna dalam respons
                return ResponseEntity.ok(result);
            } else {
                Map<String, String> error = new HashMap<>();
                error.put("message", "Invalid password");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
            }
        } else {
            Map<String, String> error = new HashMap<>();
            error.put("message", "User not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
        }
    }
        @GetMapping("me")
    public User me() {
        return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    @PostMapping("sign-out")
    public void signOut(HttpServletResponse response) {
        jwtService.signOut(response);
    }
}

//  @Autowired
//     private UserRepository userRepository;

//     @Autowired
//     private PasswordEncoder passwordEncoder;

//     @Autowired
//     private JWTUtils jwtUtils;

//     @Autowired
//     private AuthenticationManager authenticationManager;


//     @Override
//     public Response register(User user) {
//         Response response = new Response();

//         try {
//             if (user.getRole() == null || user.getRole().isBlank()) {
//                 user.setRole("USER");
//             }
//             if (userRepository.existsByEmail(user.getEmail())) {
//                 throw new OurException(user.getEmail() + " " + "Already Exists");
//             }

//             user.setPassword(passwordEncoder.encode(user.getPassword()));
//             User savedUser = userRepository.save(user);
//             UserDTO userDTO = Utils.mapUserEntityToUserDTO(savedUser);

//             response.setStatusCode(200);
//             response.setUser(userDTO);
//             response.setMessage("successful");

//         } catch (OurException e) {
//             response.setStatusCode(400);
//             response.setMessage(e.getMessage());

//         } catch (Exception e) {
//             response.setStatusCode(500);
//             response.setMessage("Error Saving a User" + e.getMessage());

//         }
//         return response;
//     }

//     @Override
//     public Response login(LoginRequest loginRequest) {
//         Response response = new Response();

//         try {
//             authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
//             var user = userRepository.findByEmail(loginRequest.getEmail()).orElseThrow(() -> new OurException("User Not Found"));
//             var token = jwtUtils.generateToken(user);

//             response.setToken(token);
//             response.setExpirationTime("7 days");
//             response.setRole(user.getRole());
//             response.setMessage("successful");
//             response.setStatusCode(200);

//         } catch (OurException e) {
//             response.setStatusCode(404);
//             response.setMessage(e.getMessage());

//         } catch (Exception e) {
//             response.setStatusCode(500);
//             response.setMessage("Error Logging in " + e.getMessage());

//         }
//         return response;
//     }

//     @Override
//     public Response getAllUsers() {
//         Response response = new Response();

//         try {
//             List<User> userList = userRepository.findAll();
//             List<UserDTO> userDTOList = Utils.mapUserListEntityToUserListDTO(userList);

//             response.setUserList(userDTOList);
//             response.setMessage("successful");
//             response.setStatusCode(200);

//         } catch (Exception e) {
//             response.setStatusCode(500);
//             response.setMessage("Error getting all users " + e.getMessage());

//         }
//         return response;
//     }

//     @Override
//     public Response getUSerBookingHistory(String userId) {
//         Response response = new Response();

//         try {
//             User user = userRepository.findById(Long.valueOf(userId)).orElseThrow(()-> new OurException("User Not Found"));
//             UserDTO userDTO = Utils.mapUserEntityToUserDTOPlusUserBookingsAndRoom(user);

//             response.setMessage("successful");
//             response.setStatusCode(200);
//             response.setUser(userDTO);

//         } catch (OurException e) {
//             response.setStatusCode(404);
//             response.setMessage(e.getMessage());

//         } catch (Exception e) {
//             response.setStatusCode(500);
//             response.setMessage("Error getting user bookings in " + e.getMessage());

//         }
//         return response;
//     }

//     @Override
//     public Response deleteUser(String userId) {
//         Response response = new Response();

//         try {
//             userRepository.findById(Long.valueOf(userId)).orElseThrow(()-> new OurException("User Not Found"));
//             userRepository.deleteById(Long.valueOf(userId));

//             response.setMessage("successful");
//             response.setStatusCode(200);

//         } catch (OurException e) {
//             response.setStatusCode(404);
//             response.setMessage(e.getMessage());

//         } catch (Exception e) {
//             response.setStatusCode(500);
//             response.setMessage("Error deleting a user " + e.getMessage());

//         }
//         return response;
//     }

//     @Override
//     public Response getUserById(String userId) {
//         Response response = new Response();

//         try {
//             User user = userRepository.findById(Long.valueOf(userId)).orElseThrow(()-> new OurException("User Not Found"));
//             UserDTO userDTO = Utils.mapUserEntityToUserDTO(user);

//             response.setMessage("successful");
//             response.setStatusCode(200);
//             response.setUser(userDTO);

//         } catch (OurException e) {
//             response.setStatusCode(404);
//             response.setMessage(e.getMessage());

//         } catch (Exception e) {
//             response.setStatusCode(500);
//             response.setMessage("Error getting a user by id " + e.getMessage());

//         }
//         return response;
//     }

//     @Override
//     public Response getMyInfo(String email) {
//         Response response = new Response();

//         try {
//             User user = userRepository.findByEmail(email).orElseThrow(()-> new OurException("User Not Found"));
//             UserDTO userDTO = Utils.mapUserEntityToUserDTO(user);

//             response.setMessage("successful");
//             response.setStatusCode(200);
//             response.setUser(userDTO);

//         } catch (OurException e) {
//             response.setStatusCode(404);
//             response.setMessage(e.getMessage());

//         } catch (Exception e) {
//             response.setStatusCode(500);
//             response.setMessage("Error getting a user info " + e.getMessage());

//         }
//         return response;
//     }
