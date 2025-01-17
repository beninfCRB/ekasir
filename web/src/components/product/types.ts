import { categoryType } from "../category/types";
import { stockType } from "../stock/types";

export interface productType {
  id?: string;
  code?: string;
  name?: string;
  price?: string;
  categoryId?: string;
  imageId?: string;
  imageUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;

  category?: categoryType;
  stock?: stockType[];
}