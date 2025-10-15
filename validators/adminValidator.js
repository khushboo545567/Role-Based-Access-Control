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

export { permissionAddValidator, permissionDeleteValidator };
