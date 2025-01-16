import { check } from "express-validator";

const stockDto = [
  check("code").notEmpty().withMessage("Kode stok tidak boleh kosong").isString().withMessage("Kode stok harus berupa string"),
  check("productId").notEmpty().withMessage("Produk tidak boleh kosong").isString().withMessage("Produk harus berupa string"),
  check("amount").notEmpty().withMessage("Jumlah tidak boleh kosong").isNumeric().withMessage("Jumlah harus berupa angka"),
  check("expiredAt").optional({ nullable: true }).isISO8601().withMessage("Expire harus berupa tanggal ISO 8601"),
];

export default stockDto;