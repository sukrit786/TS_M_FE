import * as jestpact from "jest-pact";
import * as supertest from "supertest";
import * as interaction from "./expectation/json.expectation.ts";
import * as json from "./expectation/json.reqRes";

jestpact.pactWith(
  { consumer: "test-consumer", provider: "json-provider" },
  async (provider) => {
    const client = () => {
      const url = `${provider.mockService.baseUrl}`;
      //   const url = "http://43.204.25.242:3001";
      return supertest(url);
    };
    test("should accept a valid get request to get a pet", async () => {
      await provider.addInteraction(interaction.postValidRequest);

      await client()
        .get("/v2/pet/1845563262948980200")
        .set("api_key", "[]")
        .expect(200, json.getPetValidResponse);
    });
  }
);
