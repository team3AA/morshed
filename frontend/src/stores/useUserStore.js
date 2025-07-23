import { create } from "zustand";
import axios from "../lib/axiosInstance";
import { toast } from "react-hot-toast";

const useUserStore = create((set) => ({
  user: null,
  signup: async (userData) => {
    try {
      const res = await axios.post("/auth/signup", userData);

      set({ user: res.data.user });
      toast.success("تم إنشاء الحساب بنجاح");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
  login: async (userData) => {
    try {
      const res = await axios.post("/auth/login", userData);
      set({ user: res.data.user });
      toast.success("تم تسجيل الدخول بنجاح");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
  logout: async () => {
    try {
      await axios.post("/auth/logout");
      set({ user: null });
      toast.success("تم تسجيل الخروج بنجاح");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
  getUser: async () => {
    const res = await axios.get("/auth/getUser");
    set({ user: res.data.user });
  },
}));

export default useUserStore;
