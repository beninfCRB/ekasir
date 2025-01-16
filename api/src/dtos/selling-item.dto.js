import { check } from "express-validator";

const sellingItemDto = [
  check("code").notEmpty().withMessage("Kode stok tidak boleh kosong").isString().withMessage("Kode stok harus berupa string"),
  check("sellingId").notEmpty().withMessage("Head tidak boleh kosong").isString().withMessage("Head harus berupa string"),
  check("amount").notEmpty().withMessage("Jumlah tidak boleh kosong").isNumeric().withMessage("Jumlah harus berupa angka"),
];

export default sellingItemDto;