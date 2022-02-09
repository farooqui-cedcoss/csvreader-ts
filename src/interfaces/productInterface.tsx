export interface ProductInterface {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: {
    count: number;
    rate: number;
  };
  title: string;
}

export interface Product {
  [key: string]: string | number | { [key: string]: string | number };
}
