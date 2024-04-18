import React, { useEffect, useState } from "react";
import { ProductService } from "../api/api";

const AddProductForm = () => {
  let productService: ProductService;
  async function callStuff() {
    productService = new ProductService("http://127.0.0.1:3001");
    const response = await productService.fetchProductsById(
      "661fbd9de68642c2ba3fc4f1"
    );
    console.log(response.data);
  }
  useEffect(() => {
    callStuff();
  }, []);

  return <div>Yo world</div>;
};

export default AddProductForm;
