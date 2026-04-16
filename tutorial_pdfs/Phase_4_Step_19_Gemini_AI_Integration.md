# YouTube Masterclass Lesson 19: Gemini AI Spring Boot Injection

## Instructor Opening Script (To Camera)
"Welcome back! Right now, our Tripy Agent chat UI is beautiful, but it is just a puppet. It has no brain.

Today, we bring Tripy to life. We are going to plunge into our Spring Boot backend and write the `AiService`. This service will connect directly to Google's Gemini Large Language Model via their raw REST API endpoint! We will then wrap it in an `AiController` so our React frontend can literally transmit user messages directly into the AI core in real-time. Prepare to build a true AI application."

---

## Part 1: The Gemini Core Engine

### Instructor Script (Screen Recording IDE)
"Because we want maximum speed and reliability, we are bypassing heavy AI SDK packages and using native Java `RestTemplate`. It is incredibly raw, incredibly fast, and gives us ultimate control over our prompt architecture."

### Code to Type (`backend/src/main/.../services/AiService.java`)
"Inside your `services` package, create `AiService.java`:"

```java
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
        String systemPrompt = "You are 'Tripy', a highly energetic, 5-star travel agent specialized in selling the following package: [" + context + "]. Negotiate politely, offer exciting details, and never break character. User asks: " + userPrompt;

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
```

### Explanation for the Audience:
"Look closely at variable `systemPrompt`. This is the secret weapon of AI Engineering. Before the user's message is even sent to Google, we prepend a block of text telling the AI *who* it is and *what* it is selling! The end-user never sees this block of text—they only see the customized response tailored precisely for their specific Tripy destination! It's pure magic."

---

## Part 2: Opening the Endpoints

### Instructor Script
"Now, we build the door. We need a Controller route that our React UI can hit to transmit the user's chat messages."

### Code to Type (`backend/src/main/.../controllers/AiController.java`)
"Inside `controllers`, create `AiController.java`:"

```java
package com.tripy.backend.controllers;

import com.tripy.backend.services.AiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/public/ai")
public class AiController {

    @Autowired
    private AiService aiService;

    // Public endpoint so any user can negotiate trips!
    @PostMapping("/chat")
    public ResponseEntity<?> negotiateChat(@RequestBody Map<String, String> payload) {
        String userMessage = payload.get("message");
        String tripContext = payload.get("context");

        if (userMessage == null || userMessage.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("reply", "I couldn't hear you over the ocean waves! Try again!"));
        }

        String aiReply = aiService.generateAgentResponse(userMessage, tripContext);
        
        // We return a simple JSON map for easy extraction in React
        return ResponseEntity.ok(Map.of("reply", aiReply));
    }
}
```

### Explanation for the Audience:
"This controller maps to `/api/public/ai/chat`. We placed it inside the `/public/` layer because we want unauthenticated visitors to be able to talk to our AI Agent. You never know—an anonymous user might be convinced by our AI to spend $3000 on a Maldives package, so we don't want to lock them out with JWT boundaries!"

---

## Instructor Outro (To Camera)
"Our Java framework is entirely complete. We have JWT Security, PostgreSQL Relational persistence, Cloudinary Multipart Image parsing, and now, Google Gemini Neural-Net intelligence wired natively into the environment!

In the next lesson, we hop back to React. We delete our 1.5-second fake timer, use Axios to bounce our Chat messages against this new Spring Boot endpoint, and we deal with Voice Synthesis! Subscribe, and let's bring it all together."
