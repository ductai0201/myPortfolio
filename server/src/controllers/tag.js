import Tag from "../model/tag";
import joi from "joi";

const tagSchema = joi.object({
  name: joi.string().min(3).required().messages({
    "string.empty": "Tên tag không được để trống",
    "any.required": "Tên tag là bắt buộc",
    "string.min": "Tên tag phải có ít nhất 3 kí tự",
  }),
});

export const createTag = async (req, res) => {
  try {
    const body = req.body;
    const { error } = tagSchema.validate(body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }
    const data = await Tag.create(body);
    if (!data) {
      return res.status(400).json({
        message: "Không thể tạo Tag do dữ liệu không hợp lệ",
      });
    }
    return res.status(201).json({
      message: "Thêm Tag thành công",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getAllTag = async (req, res) => {
  try {
    const dataTag = await Tag.find();
    if (!dataTag) {
      return res.status(404).json({
        message: "Không có Tag nào !",
      });
    }
    return res.status(200).json({
      message: "Lấy Tag thành công",
      dataTag,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getTagById = async (req, res) => {
  try {
    const { id } = req.params;
    const resDataTag = await Tag.findById(id);
    if (!resDataTag) {
      return res.status(404).json({
        message: "Không thể tìm thấy Tag",
      });
    }
    return res.status(200).json(resDataTag);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateTag = async (req, res) => {
  try {
    const TagNeedUpdate = await Tag.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!TagNeedUpdate) {
      return res.status(404).json({
        message: "Không thể tìm thấy Tag cần update",
      });
    }
    return res.status(200).json({
      message: "Update Tag thành công",
      TagNeedUpdate,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const removeTag = async (req, res) => {
  try {
    const TagNeedRemove = await Tag.findByIdAndDelete(req.params.id);
    if (!TagNeedRemove) {
      return res.status(404).json({
        message: "Không thể tìm thấy Tag để xóa",
      });
    }
    return res.status(200).json({
      message: "Xóa Tag thành công!",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
