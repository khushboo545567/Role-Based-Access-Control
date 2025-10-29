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

export {
  permissionAddValidator,
  permissionDeleteValidator,
  permissionUpdateValidator,
};
