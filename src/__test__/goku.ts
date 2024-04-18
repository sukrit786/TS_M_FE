// import { PactV3, MatchersV3 } from "@pact-foundation/pact";
import { PactV3 } from "@pact-foundation/pact";
import * as path from "path";
import { ProductService } from "../api/api";
// import { somethingLike } from "@pact-foundation/pact/src/dsl/matchers";

// Create a 'pact' between the two applications in the integration we are testing
const provider = new PactV3({
  dir: path.resolve(process.cwd(), "pacts"),
  consumer: "ProductConsumer",
  provider: "MyProvider",
  //   host: "http://43.204.25.242:3001/",
  port: 3001,
  logLevel: "debug",
});

// const productExample = {
//   products: [
//     {
//       _id: "661e4b73434ee10310ed251a",
//       name: "Handcrafted Plastic Shoes",
//       description:
//         "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
//       price: 8675,
//       stock: 962,
//       __v: 0,
//     },
//     {
//       _id: "661e4ba3434ee10310ed251c",
//       name: "Alienware Tenkeyless Gaming Keyboard - AW420K",
//       description:
//         "Compact Tenkeyless (TKL) form factor eliminates the 10-key numeric pad to reduce clutter and improve portability. Integrated cable routing allows for easy adaptability, and Cherry MX Red switches provide consistent high-performance gaming.",
//       price: 9412,
//       stock: 7,
//       __v: 0,
//     },
//     {
//       _id: "661e4e3e134bb9b0b36424f2",
//       name: "Logitech G453 Gaming Mouse",
//       description:
//         "The Logitech G453 is an affordable wireless mouse with reliable connectivity,12 months battery life and modern design",
//       price: 269,
//       stock: 593,
//       __v: 0,
//     },
//   ],
//   productCount: 9,
// };
// const EXPECTED_BODY = MatchersV3.equal(productExample);

// const productExample = {
//   _id: "661fbd9de68642c2ba3fc4f1",
//   name: "Yo China Dishes",
//   description: "The best chinaware in the market",
//   price: 9,
//   stock: 992,
//   __v: 0,
// };
// let EXPECTED_BODY = MatchersV3.eachLike(productExample);

// describe("GET /products", () => {
//   let productService: ProductService;
//   it("returns an HTTP 200 and a list of docs", () => {
//     // Arrange: Setup our expected interactions
//     //
//     // We use Pact to mock out the backend API
//     provider
//       .given("I have a list of product")
//       .uponReceiving("a request for all product with the builder pattern")
//       .withRequest({
//         method: "GET",
//         path: "products",
//         query: { limit: "3", offset: "3" },
//       })
//       .willRespondWith({
//         status: 200,
//         headers: { "Content-Type": "application/json" },
//         body: EXPECTED_BODY,
//       });

//     return provider.executeTest(async (mockserver) => {
//       // Act: test our API client behaves correctly
//       //
//       // Note we configure the ProductService API client dynamically to
//       // point to the mock service Pact created for us, instead of
//       // the real one
//       console.log("------------>", mockserver);

//       productService = new ProductService(mockserver.url);
//       const response = await productService.fetchProducts(3, 0);

//       console.log(response);

//       // Assert: check the result
//       expect(response.data).toEqual(productExample);
//       expect(2 + 2).toEqual(4);
//     });
//   });
// });

describe("GET /product/:id", () => {
  let ps: ProductService;
  it("returns an HTTP 200 and a product", () => {
    // Arrange: Setup our expected interactions
    //
    // We use Pact to mock out the backend API
    provider
      .given("I have a product")
      .uponReceiving("a single product")
      .withRequest({
        method: "GET",
        path: "products",
      })
      .willRespondWith({
        status: 200,
      });

    return provider.executeTest(async () => {
      // Act: test our API client behaves correctly
      //
      // Note we configure the ProductService API client dynamically to
      // point to the mock service Pact created for us, instead of
      // the real one

      ps = new ProductService("http://43.204.25.242:3001");
      let response = await ps.fetchProductsById("661fbd9de68642c2ba3fc4f1");
      console.log(response.data._id, response.status);
      // Assert: check the result
      // console.log(response.data._id == productExample._id);
      // expect(response.data._id).toEqual(productExample._id);

      //   expect(2 + 2).toEqual(4);
    });
  });
});
