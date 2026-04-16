# YouTube Masterclass Lesson 13: PostgreSQL Trip Entities & Public APIs

## Instructor Opening Script (To Camera)
"Welcome back! Our Tripy frontend currently runs entirely on hardcoded dummy data. This is great for prototyping, but unacceptable for a production-grade application.

Today, we go deep into the Spring Boot backend. We are going to build the `TripEntity` JPA class, link it to the Business Vendor who created it, and establish a public API endpoint so our React frontend can query live inventory directly from our PostgreSQL database. Time to write some hardcore backend logic."

---

## Part 1: Constructing the Trip Database Model

### Instructor Script (Screen Recording IDE)
"First, we define how a 'Trip' is actually mapped in the database. Like our User entity, we will use Jakarta Persistence. But crucially, every trip needs to belong to a specific vendor. Let's create our Foreign Key relationship!"

### Code to Type (`backend/src/main/java/com/tripy/backend/models/TripEntity.java`)
"Inside your `src/main/.../models` folder, create `TripEntity.java`:"

```java
package com.tripy.backend.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Entity
@Table(name = "trips")
public class TripEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String title;

    @NotBlank
    private String location;

    @Min(1)
    private double price;

    @Column(columnDefinition="TEXT")
    private String description;

    private String imageUrl;
    
    private boolean isNanoVerified = false;
    private double rating = 0.0;

    // Relational Mapping: Many Trips belong to One Business User!
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vendor_id", nullable = false)
    private UserEntity vendor;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    // Standard Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public boolean isNanoVerified() { return isNanoVerified; }
    public void setNanoVerified(boolean isNanoVerified) { this.isNanoVerified = isNanoVerified; }
    public double getRating() { return rating; }
    public void setRating(double rating) { this.rating = rating; }
    public UserEntity getVendor() { return vendor; }
    public void setVendor(UserEntity vendor) { this.vendor = vendor; }
}
```

### Explanation for the Audience:
"The cornerstone of this model is the `@ManyToOne` annotation. It automatically configures a Foreign Key (`vendor_id`) in Postgres connecting the `trips` table to the `users` table. Meaning, if we ever ban or delete a bad Business Vendor, via Spring Data JPA we can seamlessly cascade and wipe out all of their associated trips simultaneously! Flawless architecture."

---

## Part 2: The Trip Repository & Controller

### Instructor Script
"Now that the Schema is drafted, we quickly establish our Repository to query the base, and we build our public-facing Controller endpoint so React can consume this data."

### Code to Type (`backend/src/main/.../repositories/TripRepository.java`)
"Inside the `repositories` package, create `TripRepository.java`:"

```java
package com.tripy.backend.repositories;

import com.tripy.backend.models.TripEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TripRepository extends JpaRepository<TripEntity, Long> {
    // Custom SQL Query generation via method naming!
    List<TripEntity> findByLocationContainingIgnoreCase(String location);
    List<TripEntity> findByIsNanoVerifiedTrue();
}
```

### Code to Type (`backend/src/main/.../controllers/TripController.java`)
"Inside `controllers`, create `TripController.java`:"

```java
package com.tripy.backend.controllers;

import com.tripy.backend.models.TripEntity;
import com.tripy.backend.repositories.TripRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/public/trips")
public class TripController {

    @Autowired
    TripRepository tripRepository;

    // Public Endpoint: Return all DB trips for the React Catalog!
    @GetMapping("/all")
    public ResponseEntity<List<TripEntity>> getAllTrips() {
        List<TripEntity> trips = tripRepository.findAll();
        return ResponseEntity.ok(trips);
    }
    
    // Feature Extension: Filter by location dynamically
    @GetMapping("/search")
    public ResponseEntity<List<TripEntity>> searchTrips(@RequestParam String location) {
        return ResponseEntity.ok(tripRepository.findByLocationContainingIgnoreCase(location));
    }
}
```

### Explanation for the Audience:
"The `TripRepository` gives us `findAll()` absolutely free of charge. In our controller, we mapped this to the `@GetMapping("/all")` endpoint.
Notice that the pathway is `/api/public/trips`. If you remember from our WebSecurityConfig lesson, any route with `/public/` bypasses our rigorous JWT firewalls. This is exactly what we want! We want ANY unauthenticated user on the internet to be able to window-shop our Catalog to drive conversions and entice them to register!"

---

## Instructor Outro (To Camera)
"Our backend database is officially extended. Not only do we have Users and Role schemas, but we now have actual Trip Products deeply woven into our database via Foreign Keys. 

Before the next video, make sure you manually drop a few mock rows into your PostgreSQL database. Because in our next lesson, we jump back to React, delete our hardcoded dummy logic, and wire our Tripy Catalog component strictly to the live API instance. Catch you then!"
