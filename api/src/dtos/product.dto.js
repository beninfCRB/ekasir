import { check } from "express-validator";

const productDto = [
  check("name").notEmpty().withMessage("Nama produk tidak boleh kosong").isString().withMessage("Nama produk harus berupa string"),
  check("price").notEmpty().withMessage("Harga tidak boleh kosong").isNumeric().withMessage("Harga harus berupa angka"),
];

export default productDto;