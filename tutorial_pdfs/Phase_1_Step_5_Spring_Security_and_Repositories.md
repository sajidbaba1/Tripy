# YouTube Masterclass Lesson 5: Repositories and Authentication Logic

## Instructor Opening Script (To Camera)
"Welcome back! In our last video, we sculptured our PostgreSQL database schema using JPA Entities. We now have a secure mapping of our Users and their ecosystem roles.

Today, we are bridging the gap. We are building our JPA Repository to allow our backend to search the database, and we are crafting our very first API Controller—the Authentication Controller. This is the exact endpoint our React frontend will hit when a user clicks 'Sign Up'. Let's build the engine."

---

## Part 1: Searching the Database with JPA Repositories

### Instructor Script (Screen Recording IDE)
"To interact with our PostgreSQL database, we don't write complex SQL statements. Instead, Spring Data JPA gives us magical interfaces. We just define the function name, and Spring writes the underlying query for us. Let's create our UserRepository."

### Code to Type (`backend/src/main/java/com/tripy/backend/repositories/UserRepository.java`)
"Inside `src`, create a new package named `repositories`, and create an interface called `UserRepository.java`:"

```java
package com.tripy.backend.repositories;

import com.tripy.backend.models.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
    
    // Spring magically creates the SQL for these method signatures
    Optional<UserEntity> findByUsername(String username);
    Optional<UserEntity> findByEmail(String email);
    Boolean existsByUsername(String username);
    Boolean existsByEmail(String email);
}
```

### Explanation for the Audience:
"By simply extending `JpaRepository`, our backend instantly inherits massive power: we can save, delete, and list all users with zero code. Furthermore, by defining intuitive method names like `existsByEmail`, Spring automatically generates the exact SQL logic required to prevent duplicate registrations. This is architecture at its finest."

---

## Part 2: Building the Auth Controller

### Instructor Script
"Now that we can search our database, we need to create the public gateway. We are going to build a REST Controller. When our Customer or Business submits a login form, this controller will intercept the HTTP data."

### Code to Type (`backend/src/main/java/com/tripy/backend/controllers/AuthController.java`)
"Create a new package named `controllers`, and create `AuthController.java` inside:"

```java
package com.tripy.backend.controllers;

import com.tripy.backend.models.UserEntity;
import com.tripy.backend.models.Role;
import com.tripy.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    UserRepository userRepository;

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody UserEntity signUpRequest) {
        
        // 1. Validation Check: Does the email already exist?
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body("Error: Email is already in use!");
        }

        // 2. We will hash the password later via Spring Security.
        // For now, prepare the base model.
        UserEntity user = new UserEntity();
        user.setUsername(signUpRequest.getUsername());
        user.setEmail(signUpRequest.getEmail());
        user.setPassword(signUpRequest.getPassword()); // TO-DO: Encode Password
        
        // Default assigned role is Customer unless specified via Admin Portal
        user.setRole(Role.CUSTOMER);

        // 3. Save to PostgreSQL database
        userRepository.save(user);

        return ResponseEntity.ok("User registered successfully!");
    }
}
```

### Explanation for the Audience:
"We utilized `@RestController` to define this class as a listener for JSON traffic. The `/api/auth/signup` pathway takes the React payload, verifies uniqueness using our new `UserRepository`, assigns the baseline `CUSTOMER` role, and firmly commits the user to our database!"

---

## Instructor Outro (To Camera)
"There we go! We went from an empty schema to a fully functional registration endpoint. Of course, right now, we are saving our passwords in plaintext, which is incredibly dangerous.

In our next massive Masterclass video, we delve into impenetrable security. We will configure Spring Security, set up Bcrypt Password Encoders, and build our JWT token generation logic so our system remains completely untouched by malicious actors. See you then!"
