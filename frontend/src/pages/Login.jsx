import { useState } from "react";
import { Link } from "react-router-dom";
import useUserStore from "../stores/useUserStore";
import { toast } from "react-hot-toast";

export default function Login() {
  const { login } = useUserStore();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      toast.error("يرجى إدخال البريد الإلكتروني وكلمة المرور");
      return;
    }
    await login(form);
  };

  return (
    <div className="flex items-center justify-center h-[calc(100vh-72px)] bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 border border-blue-100">
        <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center tracking-wide">
          تسجيل الدخول
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              className="block mb-1 font-semibold text-blue-700"
              htmlFor="email"
            >
              البريد الإلكتروني
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              className="w-full px-4 py-2 rounded-full border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              value={form.email}
              onChange={handleChange}
              placeholder="ادخل بريدك الإلكتروني"
            />
          </div>
          <div>
            <label
              className="block mb-1 font-semibold text-blue-700"
              htmlFor="password"
            >
              كلمة المرور
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              className="w-full px-4 py-2 rounded-full border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              value={form.password}
              onChange={handleChange}
              placeholder="ادخل كلمة المرور"
            />
          </div>
          <button
            type="submit"
            className="cursor-pointer w-full bg-yellow-300 text-blue-800 rounded-full px-6 py-2 font-semibold shadow hover:bg-blue-700 hover:text-white transition-colors duration-200 mt-2"
          >
            تسجيل الدخول
          </button>
        </form>
        <div className="mt-6 text-center">
          <span className="text-blue-700 font-medium">ليس لديك حساب؟ </span>
          <Link
            to="/register"
            className="text-yellow-500 font-semibold hover:underline hover:text-blue-700 transition"
          >
            انشاء حساب
          </Link>
        </div>
      </div>
    </div>
  );
}
