package com.sanjayr.portfolio.service;

import com.sanjayr.portfolio.entity.Project;
import com.sanjayr.portfolio.repository.ProjectRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {
    private final ProjectRepository projectRepository;

    ProjectService(ProjectRepository projectRepository){
        this.projectRepository=projectRepository;
    }

    public Project createProject(Project project){
        return projectRepository.save(project);
    }

    public List<Project> getAllProject(){
        return projectRepository.findAll();
    }
    public Project getProject(Long id){
        return projectRepository.findById(id).orElseThrow(()-> new RuntimeException("project not found"));
    }

    public void deleteProject(Long id){
        projectRepository.deleteById(id);
    }

    public Project updateProject(Long id, Project project) {
        Project existing= getProject(id);

        existing.setTitle(project.getTitle());
        existing.setDescription(project.getDescription());
        existing.setTechStack(project.getTechStack());
        existing.setGithubUrl(project.getGithubUrl());
        existing.setLiveUrl(project.getLiveUrl());
        existing.setImageUrl(project.getImageUrl());
        existing.setFeatured(project.isFeatured());

        return projectRepository.save(existing);
    }
}
