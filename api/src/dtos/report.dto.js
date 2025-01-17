import { check } from "express-validator";

const reportDto = [
  check("start").optional({ nullable: true }).isISO8601().withMessage("Tanggal mulai harus berupa tanggal ISO 8601"),
  check("end").optional({ nullable: true }).isISO8601().withMessage("Tanggal akhir harus berupa tanggal ISO 8601"),
];

export default reportDto;