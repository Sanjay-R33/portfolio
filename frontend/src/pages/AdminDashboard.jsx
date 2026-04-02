import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import AddProjectForm from "../components/AddProjectForm";
import SkillForm from "../components/SkillForm";
import BlogEditor from "../components/blogEditor";

export default function AdminDashboard() {
  

  const [messages, setMessages] = useState([]);

  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);

  const [skills, setSkills] = useState([]);
  const [editingSkill, setEditingSkill] = useState(null);

  const [blogs, setBlogs] = useState([]);
  const [editingBlog, setEditingBlog] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    API.get("/contact").then(res => setMessages(res.data));
    API.get("/projects").then(res => setProjects(res.data));
    API.get("/skills").then(res => setSkills(res.data));
    API.get("/blog/admin").then(res =>setBlogs(res.data.reverse()));
  }, []);
  const handleLogout= ()=>{
    const confirm=window.confirm("Are you sure you want to logout?");
    if(confirm){
      localStorage.removeItem("token");
      navigate("/admin/login");
    }
  }
  

  const handleProjectAdded = (newProject) => {
    setProjects([newProject, ...projects]);
  };

  const handleUpdate = (updatedProject) => {
  setProjects(projects.map(p =>
    p.id === updatedProject.id ? updatedProject : p
  ));
  setEditingProject(null);
};

const handleSkillAdded = (skill) => {
  setSkills([skill, ...skills]);
};

const handleSkillUpdate = (updated) => {
  setSkills(skills.map(s =>
    s.id === updated.id ? updated : s
  ));
  setEditingSkill(null);
};

const handleDeleteSkill = async (id) => {
  await API.delete(`/skills/${id}`);
  setSkills(skills.filter(s => s.id !== id));
};

const handleBlogUpdate = (updatedBlog)=>{
  setBlogs(blogs.map(b => b.id===updatedBlog.id ? updatedBlog : b));
  setEditingBlog(null);
}

  const handleDelete = async (id) => {
  await API.delete(`/projects/${id}`);
  setProjects(projects.filter(p => p.id !== id));
};

const handleBlogAdded = (blog) => {
  setBlogs([blog, ...blogs]);
};

const handleDeleteBlog = async (id) => {
  await API.delete(`/blog/${id}`);
  setBlogs(blogs.filter(b => b.id !== id));
};

  return (
    <div className="p-6 text-white bg-black min-h-screen">
      <div className="flex justify-between items-center mb-6">
  
  <h1 className="text-3xl mb-6">
    Admin Dashboard
  </h1>

  <button
    onClick={handleLogout}
    className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition"
  >
    Logout
  </button>

</div>

      {/* ADD PROJECT FORM */}
      <AddProjectForm
  onProjectAdded={handleProjectAdded}
  editingProject={editingProject}
  onUpdate={handleUpdate}
/>
      {/* PROJECT LIST */}
      <h2 className="text-xl mb-4">Projects</h2>

      {projects.map(p => (
  <div key={p.id} className="bg-gray-800 p-4 mb-3 rounded">
    <h3 className="font-bold">{p.title}</h3>
    <p>{p.techStack}</p>

    <button
  onClick={() => setEditingProject(p)}
  className="bg-blue-500 px-3 py-1 rounded"
>
  Edit
</button>

    <div className="mt-2 flex gap-2">
      <button
        onClick={() => handleDelete(p.id)}
        className="bg-red-500 px-3 py-1 rounded"
      >
        Delete
      </button>
    </div>
  </div>
))}

<SkillForm
  onAdd={handleSkillAdded}
  editingSkill={editingSkill}
  onUpdate={handleSkillUpdate}
/>

<h2 className="text-xl mb-4">Skills</h2>

{skills.map(skill => (
  <div key={skill.id} className="bg-gray-800 p-4 mb-3 rounded">
    
    <h3 className="font-bold">{skill.name}</h3>
    <p className="text-gray-400">{skill.category}</p>

    <div className="w-full bg-gray-700 h-2 rounded mt-2">
      <div
        className="bg-green-400 h-2 rounded"
        style={{ width: `${skill.level}%` }}
      />
    </div>

    <div className="mt-2 flex gap-2">
      <button
        onClick={() => setEditingSkill(skill)}
        className="bg-blue-500 px-3 py-1 rounded"
      >
        Edit
      </button>

      <button
        onClick={() => handleDeleteSkill(skill.id)}
        className="bg-red-500 px-3 py-1 rounded"
      >
        Delete
      </button>
    </div>

  </div>
))}

      {/* BLOG EDITOR */}
      <BlogEditor  onBlogAdded={handleBlogAdded} editingBlog={editingBlog} onUpdate={handleBlogUpdate}/>

      <h2 className="text-xl mt-8 mb-4">Blogs</h2>

{blogs.map(blog => (
  <div key={blog.id} className="bg-gray-800 p-4 mb-3 rounded">
    
    {/* Display blog details */}
    <h3 className="font-bold text-lg">{blog.title}</h3>

    <p className="text-gray-300 mt-2 line-clamp-2">
  {blog.content.slice(0, 100)}...
</p>
    
    <p className="text-gray-400 text-sm">
      Slug: {blog.slug}
    </p>

    <p className="text-gray-400 text-sm">
      Tags: {blog.tags}
    </p>

    <p className="text-sm mt-1">
      Status: {blog.published ? "🟢 Published" : "🟡 Draft"}
    </p>

    <div className="mt-2 flex gap-2">
      <button className="bg-blue-500 px-3 py-1 rounded" onClick={()=>setEditingBlog(blog)}>
        Edit
      </button>

      <button
        onClick={() => handleDeleteBlog(blog.id)}
        className="bg-red-500 px-3 py-1 rounded"
      >
        Delete
      </button>
    </div>
  </div>
))}


      {/* CONTACT MESSAGES */}
      <h2 className="text-xl mt-8 mb-4">Messages</h2>

      {messages.map(m => (
        <div key={m.id} className="bg-gray-800 p-4 mb-3 rounded">
          <p><strong>{m.name}</strong></p>
          <p>{m.message}</p>
        </div>
      ))}
    </div>
  );
}