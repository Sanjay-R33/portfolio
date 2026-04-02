import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBlogBySlug } from "../services/blogService";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function BlogDetail() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    getBlogBySlug(slug).then(res => setBlog(res.data));
  }, [slug]);

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Loading article...
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen px-4 py-10">
      
      {/* CONTAINER */}
      <div className="bg-gray-900 max-w-3xl mx-auto rounded-lg">

        {/* TITLE */}
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
          {blog.title}
        </h1>

        {/* META INFO */}
        <div className="text-gray-400 text-sm mb-6 flex flex-wrap gap-3">
          <span>
            {new Date(blog.createdAt).toLocaleDateString()}
          </span>

          <span>•</span>

          <span>{blog.tags}</span>
        </div>

        {/* DIVIDER */}
        <div className="border-b border-gray-700 mb-8"></div>

        {/* MARKDOWN CONTENT */}
        <div className="space-y-6 leading-relaxed text-gray-300">

  <ReactMarkdown
    components={{
      h1: ({children}) => (
        <h1 className="text-3xl font-bold mt-6">{children}</h1>
      ),
      h2: ({children}) => (
        <h2 className="text-2xl font-semibold mt-5">{children}</h2>
      ),
      p: ({children}) => (
        <p className="text-lg text-gray-300">{children}</p>
      ),
      li: ({children}) => (
        <li className="ml-6 list-disc">{children}</li>
      ),
      code: ({inline, children}) => (
        <code className="bg-gray-800 px-1 py-0.5 rounded text-green-400">
          {children}
        </code>
      ),
    }}
  >
    {blog.content}
  </ReactMarkdown>

</div>

      </div>
    </div>
  );
}