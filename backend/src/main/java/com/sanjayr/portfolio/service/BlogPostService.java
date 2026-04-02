package com.sanjayr.portfolio.service;

import com.sanjayr.portfolio.entity.BlogPost;
import com.sanjayr.portfolio.repository.BlogPostRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class BlogPostService {

    private final BlogPostRepository blogPostRepository;

    public BlogPostService(BlogPostRepository blogPostRepository){
        this.blogPostRepository=blogPostRepository;
    }

    public BlogPost create(BlogPost post){
        post.setCreatedAt(LocalDateTime.now());
        return blogPostRepository.save(post);
    }

    public BlogPost getBySlug(String slug){
        return blogPostRepository.findBySlug(slug).orElseThrow(()-> new RuntimeException("Post not found"));
    }

    public List<BlogPost> getAllByPublished(){
        return blogPostRepository.findByPublishedTrue();
    }

    public List<BlogPost> getAll(){
        return blogPostRepository.findAll();
    }

    public void delete(Long id){
        blogPostRepository.deleteById(id);
    }

    public BlogPost update(Long id, BlogPost post) {
        BlogPost existing= blogPostRepository.findById(id).orElseThrow(()-> new RuntimeException("post not found"));

        existing.setTitle(post.getTitle());
        existing.setSlug(post.getSlug());
        existing.setContent(post.getContent());
        existing.setTags(post.getTags());
        existing.setPublished(post.isPublished());

        return blogPostRepository.save(existing);
    }
}
