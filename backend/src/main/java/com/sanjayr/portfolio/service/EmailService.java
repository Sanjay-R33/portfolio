package com.sanjayr.portfolio.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender){
        this.mailSender=mailSender;
    }

    public void sendContactEmail(String name, String email, String message){
        SimpleMailMessage mail= new SimpleMailMessage();

        mail.setFrom("sanjayr200433@gmail.com");
        mail.setTo("sanjayr200433@gmail.com");
        mail.setReplyTo(email);
        mail.setSubject("New contact message from portfolio");
        mail.setText("Name: "+ name + "\n" +
                     "Email: "+ email + "\n" +
                     "Message: "+ message
                    );
        mailSender.send(mail);
    }
}
