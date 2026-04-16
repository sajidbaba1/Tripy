# YouTube Masterclass Lesson 4: Designing the Backend Database Entities

## Instructor Opening Script (To Camera)
"Welcome back! Our Tripy frontend is looking gorgeous, but a UI is completely useless without an engine running behind it. Today, we are opening up our Spring Boot environment. 

In this video, we rely heavily on JPA (Java Persistence API) to sculpt our PostgreSQL database directly through our Java code. We are going to build the architecture for our triple-authentication system by defining the `User` entity and the `Role` enums (Admin, Business, Customer). Time to write some hardcore backend logic."

---

## Part 1: Establishing User Roles (Enum)

### Instructor Script (Screen Recording IDE)
"In a large-scale SaaS platform like Tripy, hardcoding String roles is dangerous. We want type safety. So, we start by creating a `Role` enum that will define every permission scope in our system."

### Code to Type (`backend/src/main/java/com/tripy/backend/models/Role.java`)
"Inside your `src` directory, create a new package called `models`, and create `Role.java`:"

```java
package com.tripy.backend.models;

public enum Role {
    SUPER_ADMIN,
    ADMIN,
    BUSINESS,
    CUSTOMER
}
```

### Explanation for the Audience:
"This simple file acts as the ultimate gatekeeper for our platform. Later on, when we secure our endpoints, we will tell Spring Security: 'Only users with the `BUSINESS` Role can upload trip packages', and 'Only an `ADMIN` can ban a user'."

---

## Part 2: Building the Core User Entity

### Instructor Script
"Now, let's build the User Model. Because 'User' is often a reserved keyword in PostgreSQL, we will map it to a table called `users`. We are adding fields for our OTP systems, avatars, and our Role enums."

### Code to Type (`backend/src/main/java/com/tripy/backend/models/UserEntity.java`)
"Inside the `models` package, create `UserEntity.java`:"

```java
package com.tripy.backend.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(unique = true)
    private String username;

    @NotBlank
    @Email
    @Column(unique = true)
    private String email;

    @NotBlank
    private String password;

    private String avatarUrl; // For Cloudinary Profile Pictures

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    private boolean isBanned = false; // For Admin Moderation
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    // Getters and Setters...
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public String getAvatarUrl() { return avatarUrl; }
    public void setAvatarUrl(String avatarUrl) { this.avatarUrl = avatarUrl; }
    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }
    public boolean isBanned() { return isBanned; }
    public void setBanned(boolean banned) { this.isBanned = banned; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
```

### Explanation for the Audience:
"There's magic happening here. First, `@Entity` and `@Table(name = "users")` tell Spring to auto-generate this literal table inside our Postgres database when we boot up. 
Second, our `@Enumerated(EnumType.STRING)` annotation is crucial. Instead of saving our Enum as a random integer in the database, it forces Postgres to save it as readable text like 'CUSTOMER' or 'BUSINESS', making debugging infinitely easier. Lastly, we added `isBanned` to prep for our SuperAdmin moderation panel!"

---

## Instructor Outro (To Camera)
"We just mapped our entire foundational User schema in minutes. Spring Boot makes persistence incredibly fast. Make sure your local PostgreSQL server is running! In the next video, we will write our JPA Repositories and create the 'Authentication Controller' to officially register our first users into the database. Smash that like button, and I'll see you in the next lesson!"
