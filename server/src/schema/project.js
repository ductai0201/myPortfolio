import joi from "joi";

export const projectSchema = joi.object({
  name: joi.string().min(6).required().messages({
    "string.empty": "Tên project không được để trống",
    "any.required": "Tên project là bắt buộc",
    "string.min": "Tên project phải có ít nhất 6 kí tự",
  }),
  gallery: joi.any(),
  tagId: joi.any()
});
