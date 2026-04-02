import { useEffect, useState } from "react";
import { getProjects } from "../services/projectService";
import { getSkills } from "../services/skillService";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    getProjects().then(res => setProjects(res.data));
    getSkills().then(res => setSkills(res.data));
  }, []);

  return (
    <>
    <Navbar />
    <div className="bg-black text-white min-h-screen">

      {/* HERO */}
      <section className="h-screen flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-5xl font-bold mb-4">
          Hi, I'm Sanjay 👋
        </h1>

        <p className="text-gray-400 text-lg mb-6">
          Full Stack Developer | Spring Boot | React
        </p>

        <div className="flex gap-4">
          <a href="#projects" className="bg-green-500 px-6 py-2 rounded">
            View Projects
          </a>

          <Link to="/blog" className="border border-gray-500 px-6 py-2 rounded">
            Read Blog
          </Link>
        </div>

      </section>
          {/* SKILLS */}
      <section id="skills" className="px-6 py-16">
        <h2 className="text-3xl mb-6">Skills</h2>
        

        <div className="grid md:grid-cols-2 gap-4">
          {skills.map(skill => (
            <div key={skill.id}>
              <p>{skill.name}</p>

              <div className="w-full bg-gray-700 h-2 rounded">
                <div
                  className="bg-green-400 h-2 rounded"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
              {skill.level}%
            </div>
          ))}
        </div>
      </section>

            {/* PROJECTS */}
      <section id="projects" className="px-6 py-16">
        <h2 className="text-3xl mb-6">Projects</h2>

        <div className="grid md:grid-cols-2 gap-6">
          {projects
            .filter(p => p.featured)
            .map(p => (
              <div
                key={p.id}
                className="bg-gray-900 p-5 rounded-xl hover:scale-105 transition"
              >
                <h3 className="text-xl font-bold">{p.title}</h3>

                <p className="text-gray-400 mt-2">
                  {p.description}
                </p>

                <p className="text-sm text-green-400 mt-2">
                  {p.techStack}
                </p>

                <div className="mt-4 flex gap-3">
                  <a
                    href={p.githubUrl}
                    target="_blank"
                    className="text-blue-400"
                  >
                    GitHub
                  </a>

                  <a
                    href={p.liveUrl}
                    target="_blank"
                    className="text-green-400"
                  >
                    Live
                  </a>
                </div>
              </div>
            ))}
        </div>
      </section>

            {/* CTA */}
      <section className="text-center py-16">
        <h2 className="text-3xl mb-4">
          Let's build something together 🚀
        </h2>

        <p className="text-gray-400 mb-6">
          Feel free to reach out if you have an opportunity or idea
        </p>

        <a
          href="/contact"
          className="bg-green-500 px-6 py-3 rounded"
        >
          Contact Me
        </a>
      </section>

    </div>
  </>
  );
}