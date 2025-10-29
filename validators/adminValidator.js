import { body } from "express-validator";

const permissionAddValidator = () => {
  return [
    body("permission_name")
      .trim()
      .notEmpty()
      .withMessage("permission name is required"),
  ];
};

const permissionDeleteValidator = () => {
  return [body("id").trim().notEmpty().withMessage("id is required")];
};
const permissionUpdateValidator = () => {
  return [
    body("id").trim().notEmpty().withMessage("id is required"),
    body("permission_name")
      .trim()
      .notEmpty()
      .withMessage("permission name is requierd"),
  ];
};
const catogeryAddValidator = () => {
  return [
    body("catogery_name")
      .trim()
      .notEmpty()
      .withMessage("catogery_name is required !"),
  ];
};
const catogeryDeleteValidator = () => {
  return [body("id").trim().notEmpty().withMessage("catogery id is require")];
};

const catogeryUpdateValidator = () => {
  return [
    body("id").trim().notEmpty().withMessage("catogery id is require"),
    body("catogery_name")
      .trim()
      .notEmpty()
      .withMessage("catogery name is required !"),
  ];
};

export {
  permissionAddValidator,
  permissionDeleteValidator,
  permissionUpdateValidator,
  catogeryAddValidator,
  catogeryDeleteValidator,
  catogeryUpdateValidator,
};
