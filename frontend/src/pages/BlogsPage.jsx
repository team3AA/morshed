import { useEffect } from "react";
import useBlogStore from "../stores/useBlogStore";
import { Link } from "react-router-dom";

const BlogsPage = () => {
  const { blogs, loading, getBlogs } = useBlogStore();

  useEffect(() => {
    getBlogs();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 py-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-purple-700 mb-8">
          المدونات
        </h1>
        <div className="flex justify-end mb-6">
          <Link
            to="/create "
            className="bg-purple-600 text-white px-5 py-2 rounded-full font-semibold shadow hover:bg-purple-700 transition"
          >
            إنشاء مدونة جديدة
          </Link>
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        ) : blogs.length === 0 ? (
          <div className="bg-white bg-opacity-90 rounded-xl shadow p-8 text-center text-gray-600">
            لا توجد مدونات بعد.
          </div>
        ) : (
          <div className="space-y-6">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white bg-opacity-90 rounded-xl shadow p-6 hover:shadow-lg transition"
              >
                {/* Blog Image */}
                {blog.image && (
                  <div className="mb-4 flex justify-center">
                    <img
                      src={blog.image?.url}
                      alt={blog.title}
                      className="rounded-lg max-h-64 object-contain w-full"
                    />
                  </div>
                )}
                <h2 className="text-2xl font-semibold text-purple-800 mb-2">
                  {blog.title}
                </h2>
                <p className="text-gray-700 mb-3">{blog.content}</p>
                <div className="flex flex-wrap justify-between items-center text-sm text-gray-500 gap-2">
                  <span>
                    الكاتب:{" "}
                    <span className="font-bold text-purple-600">
                      {blog.author?.name || "مجهول"}
                    </span>
                  </span>
                  {/* Location with icon */}
                  {blog.location && (
                    <span className="flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-red-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 11c1.104 0 2-.896 2-2s-.896-2-2-2-2 .896-2 2 .896 2 2 2zm0 10c-4.418 0-8-5.373-8-10a8 8 0 1116 0c0 4.627-3.582 10-8 10z"
                        />
                      </svg>
                      <span className="font-medium">{blog.location}</span>
                    </span>
                  )}
                  <span>
                    {new Date(blog.createdAt).toLocaleDateString("ar-EG", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogsPage;
