package com.example.chatBot.Services;

import com.google.genai.Client;
import com.google.genai.types.GenerateContentResponse;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

@Service
public class ChatBotService {

    public String getResponse(String message)
    {
        try{
            String content = Files.readString(Paths.get("src/main/resources/api_key")).trim();

            try(Client client = Client.builder().apiKey(content).build())
            {
                GenerateContentResponse response =
                        client.models.generateContent("gemini-2.5-flash",message,null);

                return response.text();
            } catch (Exception ex)
            {
                ex.printStackTrace();
                return "Error while generating response";
            }

        } catch (IOException exception)
        {
            exception.printStackTrace();
            return "Error while reading API key";
        }



    }

}
