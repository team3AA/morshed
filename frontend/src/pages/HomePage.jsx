import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "../stores/useUserStore";

const HomePage = () => {
  const { user } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/blogs");
    }
  }, [user, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200">
      <div className="bg-white bg-opacity-90 rounded-xl shadow-lg p-8 max-w-xl w-full text-center">
        <h1 className="text-4xl font-bold mb-4 text-purple-700">أهلا بيك في مرشد !</h1>
        <p className="text-lg text-gray-700 mb-6">
          الموقع عن التبليغ على المشاكل التي تحدث في الدولة من رمي القمامة, التخريب, الخ.
          <br />
          سجّل حسابك وابدأ رحلتك في عالم التدوين!
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="/login"
            className="px-6 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition"
          >
            تسجيل الدخول
          </a>
          <a
            href="/register"
            className="px-6 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition"
          >
            إنشاء حساب جديد
          </a>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
