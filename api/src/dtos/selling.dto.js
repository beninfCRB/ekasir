import { check } from "express-validator";

const sellingDto = [
  check("cashPrice").notEmpty().withMessage("Tunai tidak boleh kosong").isNumeric().withMessage("Nama produk harus berupa angka")
];

export default sellingDto;