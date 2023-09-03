import Review from "../model/review.js";
import { reviewSchema } from "../schema/review.js";

export const createReview = async (req, res) => {
  try {
    const body = req.body;
    const { error } = reviewSchema.validate(body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }
    const data = await Review.create(body);
    if (!data) {
      return res.status(400).json({
        message: "Không thể tạo Review do dữ liệu không hợp lệ",
      });
    }
    return res.status(201).json({
      message: "Thêm customer review thành công",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getAllReview = async (req, res) => {
  try {
    const dataReview = await Review.find();
    if (!dataReview) {
      return res.status(404).json({
        message: "Không có Review nào !",
      });
    }
    return res.status(200).json({
      message: "Lấy Review thành công",
      dataReview,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getReviewById = async (req, res) => {
  try {
    const { id } = req.params;
    const resDataReview = await Review.findById(id);
    if (!resDataReview) {
      return res.status(404).json({
        message: "Không thể tìm thấy Review",
      });
    }
    return res.status(200).json(resDataReview);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateReview = async (req, res) => {
  try {
    const ReviewNeedUpdate = await Review.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!ReviewNeedUpdate) {
      return res.status(404).json({
        message: "Không thể tìm thấy Review cần update",
      });
    }
    return res.status(200).json({
      message: "Update Review thành công",
      ReviewNeedUpdate,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const removeReview = async (req, res) => {
  try {
    const ReviewNeedRemove = await Review.findByIdAndDelete(req.params.id);
    if (!ReviewNeedRemove) {
      return res.status(404).json({
        message: "Không thể tìm thấy Review để xóa",
      });
    }

    return res.status(200).json({
      message: "Xóa Review thành công!",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
