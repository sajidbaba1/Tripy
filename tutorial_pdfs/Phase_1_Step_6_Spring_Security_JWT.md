# YouTube Masterclass Lesson 6: Impregnable Spring Security & JWT Architecture

## Instructor Opening Script (To Camera)
"Welcome back! In our previous video, we created our preliminary Authentication Controller. But there was a glaring flaw: we saved our passwords in plain text! If a platform like Tripy handles user wallets and massive business payouts, security cannot be an afterthought. 

Today is all about fortifying the gates. We are implementing Spring Security. We will encode all passwords with Bcrypt hashing algorithms and we are going to build a JWT (JSON Web Token) Utility class. This JWT is what we will hand back to our React frontend as a 'digital passport' upon successful login."

---

## Part 1: Generating the Digital Passport (JWT Utils)

### Instructor Script (Screen Recording IDE)
"First, let's establish how we generate our tokens. We are going to use the `io.jsonwebtoken` library. When a user logs in, we sign a unique hash using our server's 'secret key' and bake their username right into the payload."

### Code to Type (`backend/src/main/java/com/tripy/backend/security/JwtUtils.java`)
"Create a new package named `security`, and craft `JwtUtils.java`:"

```java
package com.tripy.backend.security;

import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import java.util.Date;

@Component
public class JwtUtils {

    @Value("${tripy.app.jwtSecret}")
    private String jwtSecret;

    @Value("${tripy.app.jwtExpirationMs}")
    private int jwtExpirationMs;

    public String generateJwtToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();
    }

    public String getUserNameFromJwtToken(String token) {
        return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getSubject();
    }

    public boolean validateJwtToken(String authToken) {
        try {
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            System.err.println("Invalid JWT Token: " + e.getMessage());
        }
        return false;
    }
}
```

### Explanation for the Audience:
"The `generateJwtToken` method is our money maker. It takes the authenticated username, attaches an expiration timer (usually 24 hours), and uses the `HS512` cryptographic algorithm wrapped with our Secret Key to build the token. If an attacker tampers with even a single letter of the token in the browser, `validateJwtToken` will automatically reject it because the hashes won't match. Cryptography is beautiful."

---

## Part 2: The Security Configuration Firewall

### Instructor Script
"Now, we tell the Spring Engine how we want our firewall structured. We need to tell Spring to disable CSRF (since we use JWTs), open up our `/api/auth/` routes to the public, and scramble our passwords."

### Code to Type (`backend/src/main/java/com/tripy/backend/security/WebSecurityConfig.java`)
"Still inside the `security` package, create `WebSecurityConfig.java`:"

```java
package com.tripy.backend.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;

import java.util.List;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.cors(cors -> cors.configurationSource(request -> {
                CorsConfiguration config = new CorsConfiguration();
                config.setAllowedOrigins(List.of("*"));
                config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
                config.setAllowedHeaders(List.of("*"));
                return config;
            }))
            .csrf(csrf -> csrf.disable())
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> 
                auth.requestMatchers("/api/auth/**").permitAll()
                    .requestMatchers("/api/public/**").permitAll()
                    .anyRequest().authenticated()
            );

        return http.build();
    }
}
```

### Explanation for the Audience:
"There's a lot of configuration here, but it dictates the safety of our entire Tripy architecture. 
First, `SessionCreationPolicy.STATELESS` ensures the server forgets everything the second an API request finishes—it trusts ONLY the JWT token we just built. 
Second, `.requestMatchers("/api/auth/**").permitAll()` ensures anyone can hit our Signup and Login pathways. However, `.anyRequest().authenticated()` locks down absolutely everything else."

---

## Instructor Outro (To Camera)
"Tripy now possesses bank-grade security. We have the JWT machinery ready, our API firewall is strictly enforcing authentication perimeters, and our Password Encoder is ready to scramble passwords. 

In our next video, we will go *back* to the React frontend. We will hook up our Framer Motion Login Modal with `Axios`, dispatch our payload to our newly secure Java backend, and store the resulting JWT directly in our `Zustand` global application state! See you in the next lesson!"
