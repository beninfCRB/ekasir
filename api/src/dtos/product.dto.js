import { check } from "express-validator";

const productDto = [
  check("name").notEmpty().withMessage("Nama produk tidak boleh kosong").isString().withMessage("Nama produk harus berupa string"),
  check("price").notEmpty().withMessage("Harga produk tidak boleh kosong").isNumeric().withMessage("Harga produk harus berupa angka"),
  check("categoryId").notEmpty().withMessage("Kategori produk tidak boleh kosong").isString().withMessage("Kategori produk harus berupa string"),
];

export default productDto;