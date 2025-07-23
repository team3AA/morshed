import { create } from "zustand";
import axios from "../lib/axiosInstance";
import { toast } from "react-hot-toast";

const useBlogStore = create((set) => ({
  blogs: [],
  blog: null,
  loading: false,

  getBlogs: async () => {
    set({ loading: true });
    try {
      const res = await axios.get("/blog/getBlogs");
      set({ blogs: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "فشل في جلب المدونات");
    } finally {
      set({ loading: false });
    }
  },

  getBlog: async (id) => {
    set({ loading: true });
    try {
      const res = await axios.get(`/blog/getBlog/${id}`);
      set({ blog: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "فشل في جلب المدونة");
    } finally {
      set({ loading: false });
    }
  },

  createBlog: async (blogData) => {
    set({ loading: true });
    try {
      const res = await axios.post("/blog/createBlog", blogData);
      set((state) => ({ blogs: [res.data, ...state.blogs] }));
      toast.success("تم إنشاء المدونة بنجاح");
    } catch (error) {
      toast.error(error.response?.data?.message || "فشل في إنشاء المدونة");
      console.log(error);
      
    } finally {
      set({ loading: false });
    }
  },

  updateBlog: async (id, blogData) => {
    set({ loading: true });
    try {
      const res = await axios.put(`/blog/updateBlog/${id}`, blogData);
      set((state) => ({
        blogs: state.blogs.map((b) => (b._id === id ? res.data : b)),
        blog: res.data,
      }));
      toast.success("تم تحديث المدونة بنجاح");
    } catch (error) {
      toast.error(error.response?.data?.message || "فشل في تحديث المدونة");
    } finally {
      set({ loading: false });
    }
  },

  deleteBlog: async (id) => {
    set({ loading: true });
    try {
      await axios.delete(`/blog/deleteBlog/${id}`);
      set((state) => ({ blogs: state.blogs.filter((b) => b._id !== id) }));
      toast.success("تم حذف المدونة بنجاح");
    } catch (error) {
      toast.error(error.response?.data?.message || "فشل في حذف المدونة");
    } finally {
      set({ loading: false });
    }
  },
}));

export default useBlogStore;
