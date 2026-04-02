package com.sanjayr.portfolio.controller;

import com.sanjayr.portfolio.entity.ContactMessage;
import com.sanjayr.portfolio.service.ContactMessageService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/contact")
public class ContactController {

    private final ContactMessageService contactMessageService;

    public ContactController(ContactMessageService contactMessageService){
        this.contactMessageService=contactMessageService;
    }

    @PostMapping
    public ContactMessage sendMessage(@RequestBody ContactMessage message){
        return contactMessageService.saveMessage(message);
    }

    @GetMapping
    public List<ContactMessage> getMessages(){
        return contactMessageService.getAllMessages();
    }

    @DeleteMapping("/{id}")
    public void deleteMessage(@PathVariable Long id){
        contactMessageService.deleteMessage(id);
    }
}
