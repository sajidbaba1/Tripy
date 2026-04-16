package com.tripy.backend.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AiService {

    // Make sure your GEMINI_API_KEY is safely stored in application.properties!
    @Value("${gemini.api_key:default_key}")
    private String geminiApiKey;

    private final String GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=";

    public String generateAgentResponse(String userPrompt, String context) {
        RestTemplate restTemplate = new RestTemplate();
        
        // 1. We inject 'System Instructions' into the prompt secretly!
        String systemPrompt = "You are 'Tripy', a highly energetic, 5-star travel agent specialized in selling the following package: [" + context + "]. Negotiate politely, offer exciting details, and never break character. Keep responses relatively short (2-3 sentences max). User asks: " + userPrompt;

        // 2. Build the exact JSON structure Google Gemini demands
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("contents", List.of(
            Map.of("parts", List.of(
                Map.of("text", systemPrompt)
            ))
        ));

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        try {
            // 3. Blast the payload across the internet to Google
            ResponseEntity<Map> response = restTemplate.postForEntity(GEMINI_API_URL + geminiApiKey, entity, Map.class);
            
            // 4. Parse the massive JSON graph to extract only the pure text response
            Map<String, Object> responseBody = response.getBody();
            if (responseBody != null && responseBody.containsKey("candidates")) {
                List<Map<String, Object>> candidates = (List<Map<String, Object>>) responseBody.get("candidates");
                Map<String, Object> content = (Map<String, Object>) candidates.get(0).get("content");
                List<Map<String, Object>> parts = (List<Map<String, Object>>) content.get("parts");
                return parts.get(0).get("text").toString();
            }
            return "Systems are currently recovering from peak booking capacity! Please try again!";
        } catch (Exception e) {
            System.err.println("Gemini API Error: " + e.getMessage());
            return "Our AI agent is currently on vacation! 🍹 Please contact support directly for negotiations!";
        }
    }
}
