package com.sanjayr.portfolio.controller;

import com.sanjayr.portfolio.dto.AuthResponse;
import com.sanjayr.portfolio.entity.User;
import com.sanjayr.portfolio.repository.UserRepository;
import com.sanjayr.portfolio.security.JwtUtil;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    public AuthController(JwtUtil jwtUtil, AuthenticationManager authenticationManager, PasswordEncoder passwordEncoder, UserRepository userRepository){
        this.authenticationManager=authenticationManager;
        this.jwtUtil=jwtUtil;
        this.passwordEncoder=passwordEncoder;
        this.userRepository=userRepository;
    }

    @PostMapping("/register")
    public String register(@RequestBody User user){
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole("ADMIN");
        userRepository.save(user);
        return "Admin created successfully";
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody Map<String,String> request){
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.get("username"), request.get("password")));
        String token= jwtUtil.generateToken(request.get("username"));
        return new AuthResponse(token);
    }
}
