import { Matchers } from "@pact-foundation/pact";
const { term } = Matchers;

// @unused
export function matcherRegexString(status: string) {
  if (status === null) {
    return "";
  } else {
    return term({
      matcher: "\\w+",
      generate: "string",
    });
  }
}

export const productById = {
  name: "Super G453 Gaming Mouse",
  description:
    "The super G453 is an affordable wireless mouse with reliable connectivity,12 months battery life and modern design",
  price: 987,
  stock: 2,
  _id: "662131b5e68642c2ba3fc637",
  __v: 0,
};

export const allProducts = {
  products: [
    {
      _id: "661e485983e066e9f06b0281",
      name: "Pet Safa Churan",
      description: "Ayuryedic Churan",
      price: 670,
      stock: 23,
      __v: 0,
    },
    {
      _id: "661e4b26434ee10310ed2516",
      name: "Intelligent Fresh Tuna",
      description:
        "The Apollotech B340 is an affordable wireless mouse with reliable connectivity,12 months battery life and modern design",
      price: 269,
      stock: 593,
      __v: 0,
    },
  ],
  productCount: 11,
};
