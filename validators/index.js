import { body } from "express-validator";

const userResgisterValidator = () => {
  return [
    body("name")
      .trim()
      .notEmpty()
      .withMessage("name is required")
      .isLength({ min: 3 })
      .withMessage("name atleast minimum of 3 character"),
    body("email")
      .trim()
      .notEmpty()
      .withMessage("email is required")
      .isEmail()
      .withMessage("email is invalid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("password is required")
      .isLength({ min: 8 })
      .withMessage("password is atleast minimum of 8 character"),
  ];
};

export { userResgisterValidator };
