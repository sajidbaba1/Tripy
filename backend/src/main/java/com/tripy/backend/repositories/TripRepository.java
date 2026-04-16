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
