 package com.pub.backend.config;

// // import org.springframework.boot.autoconfigure.info.ProjectInfoProperties;
// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.http.HttpMethod;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
// import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
// import org.springframework.security.crypto.factory.PasswordEncoderFactories;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.security.web.SecurityFilterChain;
// import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

// @Configuration
// @EnableWebSecurity
// public class SecurityConfig {

//     @Bean
//     public SecurityFilterChain securityFilterChain(HttpSecurity http, RequestFilter requestFilter) throws Exception {
//         return http
//                 .csrf(AbstractHttpConfigurer::disable)
//                 .authorizeHttpRequests((auth) -> {
//                     auth.requestMatchers(HttpMethod.GET, "/api/auth/me").authenticated();
//                     auth.requestMatchers(HttpMethod.GET, "/api/auth/sign-out").authenticated();

//                     auth.requestMatchers(HttpMethod.GET, "/api/homeUser").authenticated();
//                     auth.anyRequest().permitAll();
//                 })
//                  .addFilterBefore(requestFilter, UsernamePasswordAuthenticationFilter.class)
//                 .build();
//     }

//     @Bean
//     public PasswordEncoder passwordEncoder() {
//         return PasswordEncoderFactories.createDelegatingPasswordEncoder();
//     }
// }



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
// import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
// import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

// @Configuration
// @EnableWebSecurity
// public class SecurityConfig {

//     @Bean
//     public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//         return http
//                 .csrf(AbstractHttpConfigurer::disable) // Menonaktifkan CSRF jika menggunakan cookie
//                 .cors() // Mengaktifkan CORS
//                 .and()
//                 .authorizeHttpRequests((auth) -> {
//                     auth.requestMatchers(HttpMethod.GET, "/api/**").permitAll(); // Mengizinkan akses GET untuk API
//                     auth.requestMatchers(HttpMethod.POST, "/api/auth/sign-in").permitAll(); // Mengizinkan akses POST untuk sign-in
//                     auth.requestMatchers(HttpMethod.POST, "/api/auth/sign-up").permitAll(); // Mengizinkan akses POST untuk sign-in
//                     auth.anyRequest().authenticated(); // Semua permintaan lainnya memerlukan otentikasi
//                 })
//                 .build();
//     }
//     @Bean
//     public PasswordEncoder passwordEncoder() {
//         return PasswordEncoderFactories.createDelegatingPasswordEncoder();
//     }

// }


@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    RequestFilter requestFilter;

    @SuppressWarnings("removal")
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        // return http
        //         .csrf(AbstractHttpConfigurer::disable) // Menonaktifkan CSRF jika menggunakan cookie
        //         .cors() // Mengaktifkan CORS
        //         .and()
        //         .authorizeHttpRequests((auth) -> {
        //             auth.requestMatchers(HttpMethod.GET, "/api/**").permitAll();
        //             auth.requestMatchers(HttpMethod.POST, "/api/auth/sign-in").permitAll();
        //             auth.requestMatchers(HttpMethod.POST, "/api/auth/sign-up").permitAll();
        //             auth.requestMatchers(HttpMethod.PUT, "/api/**").permitAll();
        //             auth.requestMatchers(HttpMethod.DELETE, "/api/**").permitAll();
        //             auth.requestMatchers(HttpMethod.POST, "/api/**").permitAll();
        //             auth.requestMatchers(HttpMethod.POST, "/api/sewa").permitAll();

        //             // auth.anyRequest().authenticated(); // Semua permintaan lainnya memerlukan otentikasi
        //         })
        //         .build();
        http
                .cors().and()
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                    .requestMatchers(
                    "/api/users/**",
                    "/api/payment/** ",
                    "/api/sewa/**",
                    "/api/fields/**",
                    "/api/auth/**").permitAll()
                    .anyRequest().authenticated()
                )
                .addFilterAfter(requestFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }
}
