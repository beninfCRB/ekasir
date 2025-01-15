import { check } from "express-validator";

const signupDto = [
  check("username").notEmpty().isString().withMessage("Username tidak boleh kosong"),
  check("email").notEmpty().isEmail().withMessage("Email tidak valid").normalizeEmail(),
  check("password").notEmpty().withMessage("Password tidak boleh kosong"),
];

export default signupDto;