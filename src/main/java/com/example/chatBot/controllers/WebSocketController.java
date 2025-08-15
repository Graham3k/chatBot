package com.example.chatBot.controllers;

import com.example.chatBot.Services.ChatBotService;
import com.example.chatBot.dto.ChatMessage;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class WebSocketController {

    private final ChatBotService chatBotService;

    public WebSocketController(ChatBotService chatBotService)
    {
        this.chatBotService = chatBotService;
    }

    @MessageMapping("/message")
    @SendTo("/topic/reply")
    public String chat(@Payload ChatMessage chatMessage)
    {
        if(chatMessage.getMessage() == null || chatMessage.getMessage().trim().isEmpty())
        {
            return "Empty prompt!";
        }

        return chatBotService.getResponse(chatMessage.getMessage());
    }

}
