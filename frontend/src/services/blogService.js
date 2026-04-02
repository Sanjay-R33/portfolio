import api from "./api";

export const getBlogs= ()=> api.get("/blog");

export const getBlogBySlug = (slug)=> api.get(`/blog/${slug}`);