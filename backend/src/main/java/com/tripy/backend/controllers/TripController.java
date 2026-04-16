package com.tripy.backend.controllers;

import com.tripy.backend.models.TripEntity;
import com.tripy.backend.repositories.TripRepository;
import com.tripy.backend.services.CloudinaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/trips")
public class TripController {

    @Autowired
    TripRepository tripRepository;

    @Autowired
    CloudinaryService cloudinaryService;

    // Public Endpoint: Return all DB trips for the React Catalog!
    @GetMapping("/public/all")
    public ResponseEntity<List<TripEntity>> getAllTrips() {
        List<TripEntity> trips = tripRepository.findAll();
        return ResponseEntity.ok(trips);
    }
    
    // Feature Extension: Filter by location dynamically
    @GetMapping("/public/search")
    public ResponseEntity<List<TripEntity>> searchTrips(@RequestParam String location) {
        return ResponseEntity.ok(tripRepository.findByLocationContainingIgnoreCase(location));
    }

    // Protected Endpoint for Business Vendors to upload Trips
    @PostMapping("/create")
    @PreAuthorize("hasAuthority('BUSINESS')")
    public ResponseEntity<?> createTripPackage(
            @RequestParam("title") String title,
            @RequestParam("location") String location,
            @RequestParam("price") double price,
            @RequestParam("description") String description,
            @RequestParam(value = "image", required = false) MultipartFile imageFile) {

        try {
            TripEntity newTrip = new TripEntity();
            newTrip.setTitle(title);
            newTrip.setLocation(location);
            newTrip.setPrice(price);
            newTrip.setDescription(description);

            // If the vendor included an image, blast it to Cloudinary!
            if (imageFile != null && !imageFile.isEmpty()) {
                String secureUrl = cloudinaryService.uploadImage(imageFile);
                newTrip.setImageUrl(secureUrl);
            }

            tripRepository.save(newTrip);

            return ResponseEntity.ok("Trip listing successfully created!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error processing upload: " + e.getMessage());
        }
    }
}
