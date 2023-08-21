package com.hoaxify.ws.file;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Base64;
import java.util.UUID;

import org.springframework.stereotype.Service;

@Service
public class FileService {

    public String saveBase64StringAsFile(String image) {
        String filename = UUID.randomUUID().toString();

        File file = new File(filename);
        try {
            OutputStream outputStream = new FileOutputStream(file);
            byte[] base64decoded = Base64.getDecoder().decode(image.split(",")[1]);
            outputStream.write(base64decoded);
            outputStream.close();
            return filename;
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
        
    }
    
}
