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
