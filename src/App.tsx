import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import ProductList from "./components/ProductComponent/ProductList";
import AddProductForm from "./components/ProductComponent/AddProductForm";

interface Product {
  _id: string;
  name: string;
  price: string;
  stock: string;
  description: string;
}
// TODO: Move the product Interfaces to
const App: React.FC = () => {
  const [productData, setProductData] = useState<Product>();

  return (
    <div className="container">
      <h1 className="text-center">Product Management Center</h1>
      <AddProductForm formData={productData} />
      <ProductList updateProductData={(product) => setProductData(product)} />
    </div>
  );
};

export default App;
