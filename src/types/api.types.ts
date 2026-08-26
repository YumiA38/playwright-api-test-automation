export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
}

export interface ProductListResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface Todo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}
