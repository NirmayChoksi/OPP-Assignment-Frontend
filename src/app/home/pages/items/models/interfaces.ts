export interface ProductResponse {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface ProductRequest {
  name: string;
  quantity: number;
  price: number;
}

export interface Product {
  id: number;
  name: number;
  price: number;
  quantity: number;
  userId: string;
}
