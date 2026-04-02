package com.sanjayr.portfolio.controller;

import com.sanjayr.portfolio.entity.BlogPost;
import com.sanjayr.portfolio.service.BlogPostService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/blog")
public class BlogPostController {

    private final BlogPostService blogPostService;

    public BlogPostController(BlogPostService blogPostService){
        this.blogPostService=blogPostService;
    }

    @GetMapping
    public List<BlogPost> getPublished(){
        return blogPostService.getAllByPublished();
    }

    @GetMapping("/{slug}")
    public BlogPost getBySlug(@PathVariable String slug){
        return blogPostService.getBySlug(slug);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public BlogPost create(@RequestBody BlogPost post){
        return blogPostService.create(post);
    }

    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public List<BlogPost> getAll(){
        return blogPostService.getAll();
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void delete(@PathVariable Long id){
        blogPostService.delete(id);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public BlogPost update(@PathVariable Long id,@RequestBody BlogPost post){
        return blogPostService.update(id, post);
    }
}
