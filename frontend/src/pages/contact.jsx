import { useState } from "react";
import API from "../services/api";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // success / error

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    // 🧹 Clear previous success/error when user starts typing
    if (status) setStatus(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setStatus(null);

    try {
      await API.post("/contact", form);

      setStatus({ type: "success", msg: "Message sent successfully 🚀" });

      setForm({
        name: "",
        email: "",
        message: "",
      });

    } catch (err) {
      setStatus({ type: "error", msg: "Failed to send message ❌" });
    }

    setLoading(false);
  };

  return (
    <div className="relative min-h-screen bg-black text-white flex items-center justify-center px-4">

      {/* 🔄 LOADING OVERLAY */}
      {loading && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="flex flex-col items-center gap-3">
            
            <div className="w-10 h-10 border-4 border-green-400 border-t-transparent rounded-full animate-spin"></div>
            
            <p className="text-gray-300">Sending your message...</p>

          </div>
        </div>
      )}

      {/* FORM CARD */}
      <div className="w-full max-w-4xl bg-gray-900 p-8 rounded-2xl shadow-lg">

        <h1 className="text-3xl font-bold mb-2 text-center">
          Contact Me
        </h1>

        <p className="text-gray-400 text-center mb-6">
          Got an opportunity or idea? Let’s talk.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
            disabled={loading}
            className="w-full p-3 rounded bg-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400 disabled:opacity-50"
          />

          <input
            name="email"
            type="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
            disabled={loading}
            className="w-full p-3 rounded bg-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400 disabled:opacity-50"
          />

          <textarea
            name="message"
            placeholder="Your Message..."
            value={form.message}
            onChange={handleChange}
            required
            rows="5"
            disabled={loading}
            className="w-full p-3 rounded bg-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400 disabled:opacity-50"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 py-3 rounded font-semibold hover:bg-green-600 transition disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>

        </form>

        {/* ✅ STATUS MESSAGE */}
        {status && (
          <p
            className={`text-center mt-4 ${
              status.type === "success"
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {status.msg}
          </p>
        )}

      </div>
    </div>
  );
}