export interface User {
  id: number,
  name: string,
  sex: string,
}

export interface Categorys {
  id: number,
  title: string,
  icon: string,
  user?: User
}

export interface Product {
  id: number,
  name: string,
  categoryId: number,
  user?: User
  category?: Categorys
}
