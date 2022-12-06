import { Category } from "./category";
import { User } from "./user";

export interface Product {
  id: number,
  name: string,
  categoryId: number,
  category: Category | null,
  user: User | null,
}
