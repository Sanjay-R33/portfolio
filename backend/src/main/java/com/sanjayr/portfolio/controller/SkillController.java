package com.sanjayr.portfolio.controller;

import com.sanjayr.portfolio.entity.Skill;
import com.sanjayr.portfolio.service.SkillService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/skills")
public class SkillController {
    private final SkillService skillService;

    SkillController(SkillService skillService){
        this.skillService=skillService;
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Skill createSkill(@RequestBody Skill skill){
        return skillService.CreateSkill(skill);
    }

    @GetMapping
    public List<Skill> getAllSkills(){
        return skillService.getAllSkills();
    }

    @GetMapping("/category/{category}")
    public List<Skill> getSkillsByCategory(@PathVariable String category){
        return skillService.getSkillsByCategory(category);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public Skill updateSkill(@PathVariable Long id, @RequestBody Skill skill){
        return skillService.updateSkill(id,skill);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteSkill(@PathVariable Long id){
        skillService.deleteSkill(id);
    }
}
