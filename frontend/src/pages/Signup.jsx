import { useState } from "react";
import { Link } from "react-router-dom";
import useUserStore from "../stores/useUserStore";
import { toast } from "react-hot-toast";

export default function Signup() {
  const { signup } = useUserStore();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      toast.error("كلمات المرور غير متطابقة");
      return;
    }
    await signup(form);
  };
  return (
    <div className="flex items-center justify-center h-[calc(100vh-72px)] bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 border border-blue-100">
        <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center tracking-wide">
          انشاء حساب جديد
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              className="block mb-1 font-semibold text-blue-700"
              htmlFor="name"
            >
              الاسم الكامل
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              className="w-full px-4 py-2 rounded-full border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              value={form.name}
              onChange={handleChange}
              placeholder="ادخل اسمك الكامل"
            />
          </div>
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
              autoComplete="new-password"
              className="w-full px-4 py-2 rounded-full border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              value={form.password}
              onChange={handleChange}
              placeholder="ادخل كلمة المرور"
            />
          </div>
          <div>
            <label
              className="block mb-1 font-semibold text-blue-700"
              htmlFor="confirmPassword"
            >
              تأكيد كلمة المرور
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              className="w-full px-4 py-2 rounded-full border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="اعد كتابة كلمة المرور"
            />
          </div>

          <button
            type="submit"
            className="cursor-pointer w-full bg-yellow-300 text-blue-800 rounded-full px-6 py-2 font-semibold shadow hover:bg-blue-700 hover:text-white transition-colors duration-200 mt-2"
          >
            انشاء حساب
          </button>
        </form>
        <div className="mt-6 text-center">
          <span className="text-blue-700 font-medium">لديك حساب بالفعل؟ </span>
          <Link
            to="/login"
            className="text-yellow-500 font-semibold hover:underline hover:text-blue-700 transition"
          >
            سجل دخول
          </Link>
        </div>
      </div>
    </div>
  );
}
