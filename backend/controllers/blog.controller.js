import Blog from "../models/blog.model.js";
import cloudinary from "../lib/cloudinary.js";

// Create a new blog post
export const createBlog = async (req, res) => {
  try {
    const { title, content, location, author, image } = req.body;
    if (
      !image ||
      typeof image !== "string" ||
      !image.startsWith("data:image")
    ) {
      return res.status(400).json({ message: "Invalid or missing image." });
    }

    const result = await cloudinary.uploader.upload(image, {
      folder: "blogs",
    });

    const blog = await Blog.create({
      title,
      content,
      location,
      author,
      image: {
        public_id: result.public_id,
        url: result.secure_url,
      },
    });

    res.status(201).json(blog);
  } catch (error) {
    console.error("Create Blog Error:", error);
    res.status(500).json({ message: "Failed to create blog", error });
  }
};

// Get all blogs
export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .sort({ createdAt: -1 })
      .populate("author", "name");
    res.status(200).json(blogs);
  } catch (error) {
    console.error("Get Blogs Error:", error);
    res.status(500).json({ message: "Failed to fetch blogs", error });
  }
};

// Get a single blog by ID
export const getBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("author", "name");
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.status(200).json(blog);
  } catch (error) {
    console.error("Get Blog Error:", error);
    res.status(500).json({ message: "Failed to fetch blog", error });
  }
};

// Update a blog
export const updateBlog = async (req, res) => {
  try {
    const { title, content, location, image } = req.body;

    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    // If a new image was provided (in base64 format), update it
    if (image && image.startsWith("data:image")) {
      // Delete old image from Cloudinary
      if (blog.image?.public_id) {
        await cloudinary.uploader.destroy(blog.image.public_id);
      }

      // Upload new image
      const result = await cloudinary.uploader.upload(image, {
        folder: "blogs",
      });

      blog.image = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    }

    // Update other fields
    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.location = location || blog.location;

    const updatedBlog = await blog.save();
    res.status(200).json(updatedBlog);
  } catch (error) {
    console.error("Update Blog Error:", error);
    res.status(500).json({ message: "Failed to update blog", error });
  }
};

// Delete a blog
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    // Delete image from Cloudinary
    if (blog.image?.public_id) {
      await cloudinary.uploader.destroy(blog.image.public_id);
    }

    res.status(200).json({ message: "Blog deleted" });
  } catch (error) {
    console.error("Delete Blog Error:", error);
    res.status(500).json({ message: "Failed to delete blog", error });
  }
};
