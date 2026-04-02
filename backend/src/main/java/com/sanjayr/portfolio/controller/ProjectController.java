package com.sanjayr.portfolio.controller;

import com.sanjayr.portfolio.entity.Project;
import com.sanjayr.portfolio.repository.ProjectRepository;
import com.sanjayr.portfolio.service.ProjectService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService){
        this.projectService=projectService;
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Project createProject(@RequestBody Project project){
        return projectService.createProject(project);
    }

    @GetMapping
    public List<Project> getAllProjects(){
        return projectService.getAllProject();
    }

    @GetMapping("/{id}")
    public Project getProject(@PathVariable Long id){
        return projectService.getProject(id);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteProject(@PathVariable Long id){
        projectService.deleteProject(id);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public Project updateProject(@PathVariable Long id, @RequestBody Project project){
        return projectService.updateProject(id, project);
    }
}
