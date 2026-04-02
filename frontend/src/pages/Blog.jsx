import { useEffect, useState } from "react";
import { getBlogs } from "../services/blogService";
import { Link } from "react-router-dom";

export default function Blog() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    getBlogs().then(res => setBlogs(res.data));
  }, []);

  return (
    <div className="p-6 min-h-screen bg-black text-white">
      <h1 className="text-3xl font-bold mb-6">Blog</h1>

      {blogs.map(blog => (
        <Link key={blog.id} to={`/blog/${blog.slug}`}>
          <div className="bg-gray-800 p-4 mb-4 rounded-xl hover:scale-105 transition">
            <h2 className="text-xl font-semibold">{blog.title}</h2>
            <p className="text-gray-400">{blog.tags}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}