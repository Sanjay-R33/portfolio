import { useState, useEffect } from "react";
import API from "../services/api";
import ReactMarkdown from "react-markdown";

export default function BlogEditor({ onBlogAdded, editingBlog, onUpdate }) {
  const [form, setForm] = useState({
    title: "",
    slug: "",
    content: "",
    tags: "",
    published: true,
  });

  useEffect(()=>{
    if (editingBlog){
      setForm(editingBlog);
    }
    else{
      setForm({
        title: "",
        slug: "",
        content: "",
        tags: "",
        published: true,
      });
    }
  }, [editingBlog]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(editingBlog){
      const editBlog= await API.put(`/blog/${editingBlog.id}`, form);
      onUpdate(editBlog.data);
      return;
    }
    const res = await API.post("/blog", form);
    onBlogAdded(res.data);

    // reset form
    setForm({
      title: "",
      slug: "",
      content: "",
      tags: "",
      published: true,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-900 p-6 rounded-xl mb-6">
      <h2 className="text-2xl mb-4">{editingBlog ? "Edit Blog" : "Create Blog"}</h2>

      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        className="input"
      />

      <input
        name="slug"
        placeholder="Slug (e.g. jwt-in-spring)"
        value={form.slug}
        onChange={handleChange}
        className="input"
      />

      <input
        name="tags"
        placeholder="Tags (comma separated)"
        value={form.tags}
        onChange={handleChange}
        className="input"
      />

      <label className="flex items-center gap-2 my-2">
        <input
          type="checkbox"
          name="published"
          checked={form.published}
          onChange={handleChange}
        />
        Publish
      </label>

      {/* ✨ EDITOR + PREVIEW */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        
        {/* LEFT: Editor */}
        <textarea
          name="content"
          placeholder="Write markdown here..."
          value={form.content}
          onChange={handleChange}
          className="input h-64"
        />

        {/* RIGHT: Preview */}
        <div className="bg-gray-800 p-4 rounded overflow-auto">
          <ReactMarkdown>{form.content}</ReactMarkdown>
        </div>

      </div>

      <button className="bg-green-500 px-4 py-2 mt-4 w-full rounded">
        {editingBlog? "Update Blog" : "Publish Blog"}
      </button>
    </form>
  );
}