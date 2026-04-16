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
