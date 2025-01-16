import { check } from "express-validator";

const categoryDto = [
  check("name").notEmpty().withMessage("Nama kategori tidak boleh kosong").isString().withMessage("Nama kategori harus berupa string"),
  check("desc").optional({ nullable: true }).isString().withMessage("Keterangan kategori harus berupa string"),
];

export default categoryDto;