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
    const isExists = Catogery.findOne({
      catName: { $regex: catogery_name, $options: "i" },
    });

    if (isExists) {
      return res.status(200).json({
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
export { addCatogery, getCatogery };
