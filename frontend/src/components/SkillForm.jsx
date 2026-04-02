import { useState, useEffect } from "react";
import API from "../services/api";

export default function SkillForm({ onAdd, editingSkill, onUpdate }) {
  const [form, setForm] = useState({
    name: "",
    category: "",
    level: 50,
  });

  useEffect(() => {
    if (editingSkill) {
      setForm(editingSkill);
    } else {
      setForm({
        name: "",
        category: "",
        level: 50,
      });
    }
  }, [editingSkill]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingSkill) {
      const res = await API.put(`/skills/${editingSkill.id}`, form);
      onUpdate(res.data);
    } else {
      const res = await API.post("/skills", form);
      onAdd(res.data);
      setForm({
        name: "",
        category: "",
        level: 50,
      });
    }
  };

  return (
    <form className="bg-gray-900 p-4 rounded mb-6" onSubmit={handleSubmit}>
      <h2 className="text-xl mb-3">
        {editingSkill ? "Edit Skill" : "Add Skill"}
      </h2>

      <input
        name="name"
        placeholder="Skill Name"
        value={form.name}
        onChange={handleChange}
        className="input"
      />

      <input
        name="category"
        placeholder="Category (Frontend, Backend...)"
        value={form.category}
        onChange={handleChange}
        className="input"
      />

      <input
        type="number"
        name="level"
        min="0"
        max="100"
        value={form.level}
        onChange={handleChange}
        className="input"
      />

      <button className="bg-green-500 px-4 py-2 w-full rounded mt-2">
        {editingSkill ? "Update Skill" : "Add Skill"}
      </button>
    </form>
  );
}