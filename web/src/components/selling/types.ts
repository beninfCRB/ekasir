import { sellingItemType } from "../selling-item/types";
import { taxType } from "../tax/types";

export interface sellingType {
  id?: string;
  code?: string;
  taxId?: string;
  taxPrice?: number;
  grandTotal?: number;
  cashPrice?: number;
  returnPrice?: number;
  createdAt?: Date;
  updatedAt?: Date;

  tax?: taxType;
  selling_item?: sellingItemType[];
}