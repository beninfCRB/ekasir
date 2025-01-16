import { stockType } from "../stock/types";

export interface sellingItemType {
  id?: string;
  code?: string;
  sellingId?: string;
  stockId?: number;
  amount?: number;
  price?: number;
  total?: number;
  createdAt?: Date;
  updatedAt?: Date;

  stock?: stockType;
}