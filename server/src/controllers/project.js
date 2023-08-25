import Project from "../model/project";
import Tag from "../model/tag";
import { projectSchema } from "../schema/project";

export const createProject = async (req, res) => {
  try {
    const body = req.body;
    const { error } = projectSchema.validate(body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }
    const data = await Project.create(body);
    if (!data) {
      return res.status(400).json({
        message: "Không thể tạo Project do dữ liệu không hợp lệ",
      });
    }
    const tagId = data?.tagId.map((tag) => tag);
    for (let idTag of tagId) {
      await Tag.findByIdAndUpdate(idTag, {
        $addToSet: {
          project: data._id,
        },
      });
    }
    return res.status(201).json({
      message: "Thêm Project thành công",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getAllProject = async (req, res) => {
  try {
    const dataProject = await Project.find();
    if (!dataProject) {
      return res.status(404).json({
        message: "Không có Project nào !",
      });
    }
    return res.status(200).json({
      message: "Lấy Project thành công",
      dataProject,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const resDataProject = await Project.findById(id);
    if (!resDataProject) {
      return res.status(404).json({
        message: "Không thể tìm thấy Project",
      });
    }
    return res.status(200).json(resDataProject);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateProject = async (req, res) => {
  try {
    const ProjectNeedUpdate = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!ProjectNeedUpdate) {
      return res.status(404).json({
        message: "Không thể tìm thấy Project cần update",
      });
    }
    return res.status(200).json({
      message: "Update Project thành công",
      ProjectNeedUpdate,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const removeProject = async (req, res) => {
  try {
    const tags = await Tag.find({ project: req.params.id });
    for (let tag of tags) {
      tag.project.pull(req.params.id);
      await tag.save();
    }
    const ProjectNeedRemove = await Project.findByIdAndDelete(req.params.id);
    if (!ProjectNeedRemove) {
      return res.status(404).json({
        message: "Không thể tìm thấy Project để xóa",
      });
    }

    return res.status(200).json({
      message: "Xóa Project thành công!",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
