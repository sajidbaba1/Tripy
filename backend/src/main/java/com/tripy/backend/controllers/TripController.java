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
