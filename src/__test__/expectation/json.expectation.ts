import { InteractionObject } from "@pact-foundation/pact";
import { allProducts, productById } from "./json.reqRes";

export const getProductById: InteractionObject = {
  state: "A product 662131b5e68642c2ba3fc637 exists",
  uponReceiving: "A get request to get a product",
  willRespondWith: {
    status: 200,
    body: productById,
    headers: {
      "Content-Type": "application/json",
    },
  },
  withRequest: {
    method: "GET",
    path: "/products/661fbd9de68642c2ba3fc4f1",
    headers: { api_key: "[]" }, //@i dont know what is this
  },
};

export const getAllProducts: InteractionObject = {
  state: "Fetch Product List",
  uponReceiving: "A get request to get list of products",
  willRespondWith: {
    status: 200,
    body: allProducts,
    headers: {
      "Content-Type": "application/json",
    },
  },
  withRequest: {
    method: "GET",
    path: "/products",
    headers: { api_key: "[]" }, //@i dont know what is this
  },
};
