import { Link } from "react-router-dom";
import useUserStore from "../stores/useUserStore";

export default function Navbar() {
  const { user, logout } = useUserStore();
  return (
    <div>
      <nav className="flex items-center justify-between px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg shadow-md">
        <Link to={"/"} className="font-bold text-2xl tracking-wide">مرشد</Link>

        <div>
          {user ? (
            <div className="flex items-center gap-4">
              <span className="font-semibold">
                Hello, {user.name || "User"}
              </span>
              <button
                className="bg-white text-blue-700 rounded-full px-6 py-2 font-semibold shadow hover:bg-yellow-300 hover:text-blue-800 transition-colors duration-200"
                onClick={logout}
              >
                سجل خروج
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link
                className="bg-white text-blue-700 rounded-full px-6 py-2 font-semibold shadow hover:bg-yellow-300 hover:text-blue-800 transition-colors duration-200"
                to={"/login"}
              >
                سجل دخول
              </Link>
              <Link
                className="bg-yellow-300 text-blue-800 rounded-full px-6 py-2 font-semibold shadow hover:bg-white hover:text-blue-700 transition-colors duration-200"
                to={"/register"}
              >
                انشاء حساب
              </Link>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
