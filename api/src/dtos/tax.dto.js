import { check } from "express-validator";

const taxDto = [
  check("name").notEmpty().withMessage("Nama pajak tidak boleh kosong").isString().withMessage("Nama pajak harus berupa string"),
  check("percent").notEmpty().withMessage("Nama pajak tidak boleh kosong").isNumeric().withMessage("Persen harus berupa angka"),
  check("desc").optional({ nullable: true }).isString().withMessage("Nama pajak harus berupa string"),
];

export default taxDto;