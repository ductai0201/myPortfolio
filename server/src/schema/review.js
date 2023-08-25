import joi from "joi";

export const reviewSchema = joi.object({
  name: joi.string().min(3).required().messages({
    "string.empty": "Trường tên không được để trống",
    "any.required": "Trường tên là bắt buộc",
    "string.min": "Trường tên phải có ít nhất 3 kí tự",
  }),
  content: joi.string(),
  gallery: joi.any(),
});
