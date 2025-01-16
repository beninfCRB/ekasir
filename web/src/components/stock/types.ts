import { productType } from "../product/types";

export interface stockType {
  id?: string;
  code?: string;
  productId?: string;
  amount?: number;
  expiredAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;

  product?: productType;
}