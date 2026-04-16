# YouTube Masterclass Lesson 16: Deep Cloudinary Integration (Image Uploads)

## Instructor Opening Script (To Camera)
"Welcome back! At this exact moment, business vendors have a beautiful React form, but the 'Submit' button just runs a fake timer. Because they are trying to submit huge JPG and PNG image files, we cannot just send standard JSON text strings. 

We need to deal with `multipart/form-data`. Today, we dive back into Spring Boot. We are going to establish a `CloudinaryService` module that blasts uploaded photos up to a live Cloud Storage bucket, scrapes the permanent image URL returned by the cloud, and strictly binds it directly to our PostgreSQL Trip database! Let's code."

---

## Part 1: Integrating the Cloud Storage Service

### Instructor Script (Screen Recording IDE)
"First, assuming you've created a free Cloudinary account and have your API keys, we need to create a dedicated Service class. This class intercepts the raw byte-stream of the photo and securely transports it."

### Code to Type (`backend/src/main/.../services/CloudinaryService.java`)
"Inside your `backend`, create a `services` package and craft `CloudinaryService.java`:"

```java
package com.tripy.backend.services;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import jakarta.annotation.PostConstruct;

import java.io.IOException;
import java.util.Map;

@Service
public class CloudinaryService {

    private Cloudinary cloudinary;

    // We pull these values from application.properties organically
    @Value("${cloudinary.cloud_name:dummy_cloud}")
    private String cloudName;

    @Value("${cloudinary.api_key:dummy_key}")
    private String apiKey;

    @Value("${cloudinary.api_secret:dummy_secret}")
    private String apiSecret;

    @PostConstruct
    public void initializeCloudinary() {
        cloudinary = new Cloudinary(ObjectUtils.asMap(
                "cloud_name", cloudName,
                "api_key", apiKey,
                "api_secret", apiSecret,
                "secure", true
        ));
    }

    public String uploadImage(MultipartFile file) throws IOException {
        // Blasts the byte stream to Cloudinary and extracts the resultant URL
        Map<?, ?> uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
        return uploadResult.get("secure_url").toString();
    }
}
```

### Explanation for the Audience:
"With this `@Service`, we compartmentalized our logic. When Spring Boot powers up, the `@PostConstruct` block consumes your secret environment variables and logs into the Cloudinary servers. The `uploadImage` function takes a `MultipartFile`—which is Spring Boot's representation of your user's physical JPG—and returns an indestructible `secure_url` linking to that picture on the web!"

---

## Part 2: The Form-Data Injection Controller

### Instructor Script
"Now we need to update our `TripController`. We must open a route exclusively for our authenticated BUSINESS vendors that can intercept both the Image file AND the text text details simultaneously!"

### Code to Type (`backend/src/main/.../controllers/TripController.java`)
"Open up `TripController.java` and let's add our POST route:"

```java
// existing imports...
import com.tripy.backend.services.CloudinaryService;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.security.access.prepost.PreAuthorize;

// ... inside the TripController class:

    @Autowired
    private CloudinaryService cloudinaryService;

    @PostMapping("/create")
    @PreAuthorize("hasAuthority('BUSINESS')") // JWT Bodyguard!
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

            // Save to PostgreSQL
            tripRepository.save(newTrip);

            return ResponseEntity.ok("Trip listing successfully created!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error processing upload: " + e.getMessage());
        }
    }
```

### Explanation for the Audience:
"Normally we expect standard JSON and use `@RequestBody`. However, because we are handling files, we MUST use `@RequestParam` to intercept specific data fragments from a `multipart/form-data` payload.
Also, note the epic `@PreAuthorize("hasAuthority('BUSINESS')")` annotation sitting atop our method! If a mere 'Customer' tries to hack this endpoint using POSTMAN, Spring Security will outright block them before the code even executes!"

---

## Instructor Outro (To Camera)
"Our backend is totally optimized! 

In our next massive video, we head back toward the React interface for Step 17. We will write the complex Axios code required to bundle a massive JavaScript `FormData` object, staple our JWT to it, and send it precisely to the `/create` endpoint we just designed! Hit Subscribe, and let's finish this wizard!"
