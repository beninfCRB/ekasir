import { check } from "express-validator";

const signinDto = [
  check("email").notEmpty().isEmail().withMessage("Email tidak valid").normalizeEmail(),
  check("password").notEmpty().withMessage("Password tidak boleh kosong"),
];

export default signinDto;