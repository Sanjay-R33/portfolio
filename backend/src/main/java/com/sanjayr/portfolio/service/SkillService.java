package com.sanjayr.portfolio.service;

import com.sanjayr.portfolio.entity.Skill;
import com.sanjayr.portfolio.repository.SkillRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SkillService {

    private final SkillRepository skillRepository;
    public SkillService(SkillRepository skillRepository){
        this.skillRepository=skillRepository;
    }

    public Skill updateSkill(Long id, Skill skill) {
        Skill existing= skillRepository.findById(id).orElseThrow(()->new RuntimeException("skill not found"));

        existing.setCategory(skill.getCategory());
        existing.setName(skill.getName());
        existing.setLevel(skill.getLevel());

        return skillRepository.save(existing);
    }

    public Skill CreateSkill(Skill skill){
        return skillRepository.save(skill);
    }

    public List<Skill> getAllSkills(){
        return skillRepository.findAll();
    }

    public List<Skill> getSkillsByCategory(String category){
        return skillRepository.findByCategory(category);
    }

    public void deleteSkill(Long id){
        skillRepository.deleteById(id);
    }
}
