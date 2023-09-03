import Blog from "../model/blog.js";
import { blogSchema } from "../schema/blog.js";

export const createBlog = async (req, res) => {
  try {
    const body = req.body;
    const { error } = blogSchema.validate(body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }
    const data = await Blog.create(body);
    if (!data) {
      return res.status(400).json({
        message: "Không thể tạo blog do dữ liệu không hợp lệ",
      });
    }
    return res.status(201).json({
      message: "Thêm blog thành công",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getAllBlog = async (req, res) => {
  try {
    const dataBlog = await Blog.find();
    if (!dataBlog) {
      return res.status(404).json({
        message: "Không có blog nào !",
      });
    }
    return res.status(200).json({
      message: "Lấy blog thành công",
      dataBlog,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const resDataBlog = await Blog.findById(id);
    if (!resDataBlog) {
      return res.status(404).json({
        message: "Không thể tìm thấy blog",
      });
    }
    return res.status(200).json(resDataBlog);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const BlogNeedUpdate = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!BlogNeedUpdate) {
      return res.status(404).json({
        message: "Không thể tìm thấy blog cần update"
      });
    }
    return res.status(200).json({
      message: "Update blog thành công",
      BlogNeedUpdate,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const removeBlog = async (req, res) => {
  try {
    const BlogNeedRemove = await Blog.findByIdAndDelete(req.params.id)
    if(!BlogNeedRemove){
      return res.status(404).json({
        message: 'Không thể tìm thấy blog để xóa'
      })
    }
    return res.status(200).json({
      message: 'Xóa blog thành công!'
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
