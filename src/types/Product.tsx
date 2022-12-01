import { Category } from './Category';

export type Product = {
  id: number,
  name: string,
  categoryId: number,
  category: Category | null,
};
