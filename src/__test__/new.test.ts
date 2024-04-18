import * as jestpact from "jest-pact";
import * as supertest from "supertest";
import * as interaction from "./expectation/json.expectation.ts";
import * as json from "./expectation/json.reqRes";

jestpact.pactWith(
  { consumer: "test-consumer", provider: "json-provider" },
  async (provider) => {
    const client = () => {
      const url = `${provider.mockService.baseUrl}`;
      return supertest(url);
    };
    test("should accept a valid get request to get a product", async () => {
      await provider.addInteraction(interaction.getProductById);

      await client()
        .get("/products/661fbd9de68642c2ba3fc4f1")
        .set("api_key", "[]")
        .expect(200, json.productById);
    });

    test("should return a list of products with product count", async () => {
      await provider.addInteraction(interaction.getAllProducts);
      await client()
        .get("/products")
        .set("api_key", "[]")
        .expect(200, json.allProducts);
    });
  }
);
