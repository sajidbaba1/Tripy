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
