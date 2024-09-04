// package com.pub.backend.config;

// import java.io.IOException;

// // import org.apache.catalina.filters.RequestFilter;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
// import org.springframework.security.core.context.SecurityContextHolder;
// import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
// import org.springframework.stereotype.Component;
// import org.springframework.web.filter.OncePerRequestFilter;

// import com.pub.backend.model.User;
// import com.pub.backend.repository.UserRepository;
// import com.pub.backend.service.JwtService;

// import io.micrometer.common.lang.NonNull;
// import jakarta.servlet.FilterChain;
// import jakarta.servlet.ServletException;
// import jakarta.servlet.http.Cookie;
// import jakarta.servlet.http.HttpServletRequest;
// import jakarta.servlet.http.HttpServletResponse;

// @Component
// public class RequestFilter extends OncePerRequestFilter {

//     private final JwtService jwtService;
//     private final UserRepository userRepository;

//     @Autowired
//     public RequestFilter(JwtService jwtService, UserRepository userRepository) {
//         this.jwtService = jwtService;
//         this.userRepository = userRepository;
//     }

//     public void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response,
//             @NonNull FilterChain filterChain)
//             throws IOException, ServletException {

//         Cookie[] cookies = request.getCookies();

//         if (cookies != null) {
//             Long id = null;

//             for (Cookie cookie : cookies) {
//                 if ("token".equals(cookie.getName())) {
//                     String token = cookie.getValue();
//                     String subject;
//                     try {
//                         subject = jwtService.verify(token);
//                         id = Long.parseLong(subject);
//                     } catch (Exception e) {
//                         jwtService.signOut(response);
//                     }
//                     break;
//                 }
//             }

//             if (id != null) {
//                 User user = userRepository.findById(id).orElse(null);
//                 if (user != null) {
//                     UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(user, null,
//                             user.getAuthorities());
//                     authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
//                     SecurityContextHolder.getContext().setAuthentication(authToken);
//                 } else {
//                     jwtService.signOut(response);
//                 }
//             }
//         }

//         filterChain.doFilter(request, response);
//     }
// }