import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useBlogStore from "../stores/useBlogStore";
import useUserStore from "../stores/useUserStore";

const CreateBlog = () => {
  const { createBlog, loading } = useBlogStore();
  const { user } = useUserStore();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    content: "",
    location: "",
    image: "", // base64 string
  });

  const [preview, setPreview] = useState(null);

  // 🔍 Auto-fetch location when component mounts
  useEffect(() => {
    const fetchLocation = async () => {
      if (!navigator.geolocation) return;

      navigator.geolocation.getCurrentPosition(
        async ({ coords }) => {
          const { latitude, longitude } = coords;
          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await res.json();
            const place =
              data.address.city ||
              data.address.town ||
              data.address.village ||
              data.address.country;

            setForm((prev) => ({
              ...prev,
              location: `${data.address?.road}, ${data.address?.city}, ${data.address?.country}, ${data.address?.postcode}`,
            }));
          } catch (err) {
            console.error("Location fetch failed", err);
          }
        },
        (err) => console.error("Location error:", err),
        { enableHighAccuracy: true }
      );
    };

    fetchLocation();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({
        ...prev,
        image: reader.result, // this becomes the base64 string
      }));
    };

    reader.readAsDataURL(file); // VERY IMPORTANT
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting blog: ", form);
    await createBlog({...form, author: user?._id});
    navigate("/blogs");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex items-center justify-center py-10">
      <div className="bg-white bg-opacity-90 rounded-xl shadow-lg p-8 max-w-lg w-full">
        <h1 className="text-3xl font-bold text-purple-700 mb-6 text-center">
          إنشاء مدونة جديدة
        </h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              className="block mb-1 font-semibold text-blue-700"
              htmlFor="title"
            >
              العنوان
            </label>
            <input
              id="title"
              name="title"
              type="text"
              className="w-full px-4 py-2 rounded-full border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              value={form.title}
              onChange={handleChange}
              placeholder="ادخل عنوان المدونة"
              required
            />
          </div>

          <div>
            <label
              className="block mb-1 font-semibold text-blue-700"
              htmlFor="content"
            >
              المحتوى
            </label>
            <textarea
              id="content"
              name="content"
              className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              value={form.content}
              onChange={handleChange}
              placeholder="اكتب محتوى المدونة"
              rows={5}
              required
            />
          </div>

          <div>
            <label
              className="block mb-1 font-semibold text-blue-700"
              htmlFor="location"
            >
              الموقع
            </label>
            <input
              id="location"
              name="location"
              type="text"
              className="w-full px-4 py-2 rounded-full border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              value={form.location}
              onChange={handleChange}
              placeholder="ادخل الموقع"
            />
          </div>

          <div>
            <label
              className="block mb-1 font-semibold text-blue-700"
              htmlFor="image"
            >
              صورة
            </label>
            <div className="flex items-center gap-3">
              <label
                htmlFor="image"
                className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full font-semibold shadow transition-colors duration-200"
              >
                اختر صورة
              </label>
              <input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
              {form.image && (
                <span className="text-sm text-gray-700 truncate max-w-xs">
                  {form.imageName || "صورة تم تحميلها"}
                </span>
              )}
            </div>
            {preview && (
              <div className="mt-3 flex justify-center">
                <img
                  src={preview}
                  alt="Preview"
                  className="rounded-lg max-h-48 object-cover"
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 text-white rounded-full px-6 py-2 font-semibold shadow hover:bg-purple-700 transition-colors duration-200 mt-2"
          >
            {loading ? "جاري الإنشاء..." : "إنشاء المدونة"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
