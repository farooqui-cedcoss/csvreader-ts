import { Button } from "@shopify/polaris";
import axios from "axios";
import React, { useState } from "react";
import { Product, ProductInterface } from "../interfaces/productInterface";

const FetchButton = (): JSX.Element => {
  const [products, setProducts] = useState<ProductInterface[]>([]);

  const handleClick = async (): Promise<void> => {
    const { data } = await axios.get("https://fakestoreapi.com/products");
    // const data = await res.data;
    // console.log(res.data);
    setProducts(data);
    // return products;
  };

  products.map((product) => console.log(product.title));

  return (
    <div>
      <Button primary onClick={handleClick}>
        Fetch
      </Button>
    </div>
  );
};

export default FetchButton;
