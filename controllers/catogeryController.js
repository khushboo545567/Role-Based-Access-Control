import { validationResult } from "express-validator";
import { Catogery } from "../models/catogeryModel.js";

const addCatogery = async (req, res) => {
  try {
    const Errors = validationResult(req);
    if (!Errors.isEmpty()) {
      return res
        .status(400)
        .json({ success: false, msg: "Errors", errors: Errors.array() });
    }
    const { catogery_name } = req.body;
    const isExists = await Catogery.findOne({
      catName: { $regex: catogery_name, $options: "i" },
    });
    console.log(isExists);
    if (isExists) {
      return res.status(400).json({
        success: false,
        msg: "this catogery is already exists ",
      });
    }
    const catogery = new Catogery({
      catName: catogery_name,
    });
    const catogeryData = await catogery.save();

    return res.status(200).json({
      success: true,
      msg: "catogery created successfully ",
      data: catogeryData,
    });
  } catch (error) {
    console.error("Error while updating permission:", error);
    return res.status(400).json({
      success: false,
      msg: error.message || "Something went wrong while updating permission",
    });
  }
};

const getCatogery = async (req, res) => {
  try {
    const catogeries = await Catogery.find();
    return res.status(200).json({
      success: true,
      msg: "catogeries fetched successfully !",
      catogeries,
    });
  } catch (error) {
    console.error("Error while updating permission:", error);
    return res.status(400).json({
      success: false,
      msg: error.message || "Something went wrong while updating permission",
    });
  }
};

const deleteCatogery = async (req, res) => {
  try {
    const Errors = validationResult(req);
    if (!Errors.isEmpty()) {
      return res
        .status(400)
        .json({ success: false, msg: "Errors", errors: Errors.array() });
    }
    const { id } = req.body;
    const catData = await Catogery.find({ id });
    if (!catData) {
      return res
        .status(400)
        .json({ success: false, msg: "catogery do not exists" });
    }
    await Catogery.findByIdAndDelete({ _id: id });
    return res
      .status(200)
      .json({ success: true, msg: "catogery gets deleted successfully" });
  } catch (error) {
    console.error("Error while updating permission:", error);
    return res.status(400).json({
      success: false,
      msg: error.message || "Something went wrong while updating permission",
    });
  }
};

const updateCatogery = async (req, res) => {
  try {
    const Errors = validationResult(req);
    if (!Errors.isEmpty()) {
      return res
        .status(400)
        .json({ success: false, msg: "Errors", errors: Errors.array() });
    }

    const { id, catogery_name } = req.body;
    const isExists = await Catogery.findById(id);

    if (!isExists) {
      return res
        .status(400)
        .json({ success: false, msg: "catogery not found" });
    }

    // 3️⃣ Check if there is **actually any change**
    const isSame = isExists.catName === catogery_name;

    if (isSame) {
      return res.status(400).json({
        success: false,
        msg: "No changes detected — nothing to update.",
      });
    }

    // if the data is diffrent then perform the change
    isExists.catName = catogery_name;
    await isExists.save();

    return res.status(200).json({
      success: true,
      msg: "catogry updated sussfully",
      data: isExists,
    });
  } catch (error) {
    console.error("Error while updating permission:", error);
    return res.status(400).json({
      success: false,
      msg: error.message || "Something went wrong while updating permission",
    });
  }
};
export { addCatogery, getCatogery, deleteCatogery, updateCatogery };
