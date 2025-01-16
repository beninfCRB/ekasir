import { categoryType } from "../category/types";

export interface productType {
  id?: string;
  code?: string;
  name?: string;
  price?: string;
  createdAt?: Date;
  updatedAt?: Date;

  category?: categoryType;
}