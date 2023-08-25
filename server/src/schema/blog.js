import joi from "joi";

export const blogSchema = joi.object({
  title: joi.string().min(6).required().messages({
    "string.empty": "Tiêu đề blog không được để trống",
    "any.required": "Tiêu đề blog là bắt buộc",
    "string.min": "Tiêu đề phải có ít nhất 6 kí tự",
  }),
  description: joi.string().required().max(100).messages({
    "string.empty": "Mô tả không được để trống",
    "any.required": "Mô tả là bắt buộc",
    "string.max": "Mô tả ngắn hơn 100 kí tự",
  }),
  content: joi.string().min(100).messages({
    "string.min": "Nội dung không được dưới 100 kí tự",
  }),
  gallery: joi.any()
});
