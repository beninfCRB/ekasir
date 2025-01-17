import { check } from "express-validator";

export const productDto = [
  check("name").notEmpty().withMessage("Nama produk tidak boleh kosong").isString().withMessage("Nama produk harus berupa string"),
  check("price").notEmpty().withMessage("Harga produk tidak boleh kosong").isNumeric().withMessage("Harga produk harus berupa angka"),
  check("categoryId").notEmpty().withMessage("Kategori produk tidak boleh kosong").isString().withMessage("Kategori produk harus berupa string"),
  check("file").custom((value, { req }) => {
    if (!req.files || Object.keys(req.files).length === 0) {
      throw new Error("File tidak boleh kosong");
    }
    return true;
  }).withMessage("File harus diupload"),
];

export const productUpdateDto = [
  check("name").notEmpty().withMessage("Nama produk tidak boleh kosong").isString().withMessage("Nama produk harus berupa string"),
  check("price").notEmpty().withMessage("Harga produk tidak boleh kosong").isNumeric().withMessage("Harga produk harus berupa angka"),
  check("categoryId").notEmpty().withMessage("Kategori produk tidak boleh kosong").isString().withMessage("Kategori produk harus berupa string"),
]