import { useState, useEffect } from "react";
import Pagination from "./Pagination";

interface Product {
  _id: string;
  name: string;
  price: string;
  stock: string;
  description: string;
}

interface Props {
  updateProductData: (data: Product) => void;
}

const ProductList = (props: Props) => {
  const [products, setProducts] = useState<Product[]>([]);
  // @ts-ignore
  const [limit, setLimit] = useState(7);
  const [skip, setSkip] = useState(0);
  // @ts-ignore
  const [itemsPerPage, setItemsPerPage] = useState(limit);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  //   const [product, setProduct] = useState<Product>();
  // TO:DO All API requests should be handled by a single component
  const baseUrl = "http://43.204.25.242:3001";

  // This function will run after the component renders
  useEffect(() => {
    setSkip(currentPage * limit);
    // console.log(limit, skip, currentPage);
    fetchProducts(limit, currentPage * limit);
  }, [currentPage]);
  // Empty dependency array means this effect will only run once, similar to componentDidMount in class components

  const fetchProducts = async (limit: number, skip: number) => {
    try {
      // TO:DO Add limit skip logic to frontend
      const response = await fetch(
        baseUrl + "/products" + "?limit=" + limit + "&offset=" + skip
      );
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      //   console.log(data);
      setProducts(data.products);
      setCount(data.productCount);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const deleteProduct = async (productId: string) => {
    try {
      await fetch(`${baseUrl}/products/${productId}`, {
        method: "DELETE",
      });
      setProducts(products.filter((product) => product._id !== productId));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const updateProduct = async (productId: string, index: number) => {
    try {
      console.log(productId, products[index]);
      props.updateProductData(products[index]);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <>
      <div>
        <h2>Product List</h2>
        <ul className="list-group">
          {products.map((product, index) => (
            <li
              key={product._id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {product.name} - ${product.price}
              <div>
                <button
                  className="btn btn-outline-primary mx-2"
                  onClick={() => updateProduct(product._id, index)}
                >
                  Update
                </button>
                <button
                  className="btn btn-warning"
                  onClick={() => deleteProduct(product._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <Pagination
        itemsPerPage={itemsPerPage}
        totalCount={count}
        getDataByPage={(page) => setCurrentPage(page)}
      />
    </>
  );
};

export default ProductList;
