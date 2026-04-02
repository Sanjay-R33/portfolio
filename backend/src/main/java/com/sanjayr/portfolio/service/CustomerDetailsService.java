package com.sanjayr.portfolio.service;

import com.sanjayr.portfolio.entity.User;
import com.sanjayr.portfolio.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomerDetailsService implements UserDetailsService {
    private final UserRepository userRepository;

    public CustomerDetailsService(UserRepository userRepository){
        this.userRepository=userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

            User user= userRepository.findByUsername(username).orElseThrow(()-> new UsernameNotFoundException("user not found"));
            return org.springframework.security.core.userdetails.User
                    .withUsername(user.getUsername())
                    .password(user.getPassword())
                    .roles(user.getRole())
                    .build();
    }
}
