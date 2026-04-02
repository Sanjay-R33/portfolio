package com.sanjayr.portfolio.service;

import com.sanjayr.portfolio.entity.ContactMessage;
import com.sanjayr.portfolio.repository.ContactMessageRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ContactMessageService {
    private final ContactMessageRepository contactMessageRepository;
    private final EmailService emailService;

    public ContactMessageService(ContactMessageRepository contactMessageRepository, EmailService emailService){
        this.contactMessageRepository=contactMessageRepository;
        this.emailService=emailService;
    }
    public ContactMessage saveMessage(ContactMessage message){
        message.setCreatedAt(LocalDateTime.now());
        ContactMessage saved= contactMessageRepository.save(message);
        try {
            emailService.sendContactEmail(message.getName(), message.getEmail(), message.getMessage());
        } catch(Exception e){
            e.printStackTrace();
        }
        return saved;
    }

    public List<ContactMessage> getAllMessages(){
        return contactMessageRepository.findAll();
    }

    public void deleteMessage(Long id){
        contactMessageRepository.deleteById(id);
    }
}
