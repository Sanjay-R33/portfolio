import { useState, useEffect } from "react";
import API from "../services/api";

export default function AddProjectForm({ onProjectAdded, editingProject, onUpdate }) {
  const [form, setForm] = useState(
  editingProject || {
    title: "",
    description: "",
    techStack: "",
    githubUrl: "",
    liveUrl: "",
    imageUrl: "",
    featured: false,
  }
);

useEffect(() => {
  if (editingProject) {
    setForm(editingProject);
  } else {
    setForm({
      title: "",
      description: "",
      techStack: "",
      githubUrl: "",
      liveUrl: "",
      imageUrl: "",
      featured: false,
    });
  }
}, [editingProject]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (editingProject) {
    const res = await API.put(`/projects/${editingProject.id}`, form);
    onUpdate(res.data);
  } else {
    const res = await API.post("/projects", form);
    onProjectAdded(res.data);
  }
  setForm({
    title: "",
    description: "",
    techStack: "",
    githubUrl: "",
    liveUrl: "",
    imageUrl: "",
    featured: false,
  });
};

  return (
    <form onSubmit={handleSubmit} className="bg-gray-900 p-4 rounded-xl mb-6">
      <h2 className="text-xl mb-4">{editingProject ? "Edit Project" : "Add Project"}</h2>

      <input name="title" placeholder="Title" onChange={handleChange} value={form.title} className="input" />

      <textarea name="description" placeholder="Description" onChange={handleChange} value={form.description} className="input" />

      <input name="techStack" placeholder="Tech Stack" onChange={handleChange} value={form.techStack} className="input" />

      <input name="githubUrl" placeholder="GitHub URL" onChange={handleChange} value={form.githubUrl} className="input" />

      <input name="liveUrl" placeholder="Live URL" onChange={handleChange} value={form.liveUrl} className="input" />

      <input name="imageUrl" placeholder="Image URL" onChange={handleChange} value={form.imageUrl} className="input" />

      <label className="flex items-center gap-2 my-2">
        <input type="checkbox" name="featured" onChange={handleChange} checked={form.featured} />
        Featured
      </label>

      <button className="bg-green-500 px-4 py-2 w-full rounded">
  {editingProject ? "Update Project" : "Add Project"}
</button>
    </form>
  );
}