import { Pact } from "@pact-foundation/pact";

const baseUrl = "http://43.204.25.242:3001";
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
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

// Define Pact configuration
const provider = new Pact({
  consumer: "YourConsumerName",
  provider: "YourProviderName",
  port: 3001, // This should be the port your provider API is running on
  log: "./logs/pact.log", // Logs directory
  dir: "./pacts", // Pacts directory
  logLevel: "info", // Logging level
});

// Define the test
describe("API Pact Test", () => {
  // Start the mock server
  beforeAll(() => provider.setup());

  // Define the contract
  afterEach(() => provider.verify());

  // Write the test case
  it("should fetch user data with limit and skip parameters", async () => {
    // Define expected response
    const expectedResponse = {
      products: [
        {
          _id: "661e4b73434ee10310ed251a",
          name: "Handcrafted Plastic Shoes",
          description:
            "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
          price: 8675,
          stock: 962,
          __v: 0,
        },
        {
          _id: "661e4ba3434ee10310ed251c",
          name: "Alienware Tenkeyless Gaming Keyboard - AW420K",
          description:
            "Compact Tenkeyless (TKL) form factor eliminates the 10-key numeric pad to reduce clutter and improve portability. Integrated cable routing allows for easy adaptability, and Cherry MX Red switches provide consistent high-performance gaming.",
          price: 9412,
          stock: 7,
          __v: 0,
        },
        {
          _id: "661e4e3e134bb9b0b36424f2",
          name: "Logitech G453 Gaming Mouse",
          description:
            "The Logitech G453 is an affordable wireless mouse with reliable connectivity,12 months battery life and modern design",
          price: 269,
          stock: 593,
          __v: 0,
        },
      ],
      productCount: 9,
    };

    // Define the interaction
    await provider.addInteraction({
      state: "user data exists",
      uponReceiving: "a request for user data with limit and skip parameters",
      withRequest: {
        method: "GET",
        path: "/products",
        query: {
          limit: "3",
          offset: "3",
        },
      },
      willRespondWith: {
        status: 200,
        headers: { "Content-Type": "application/json" },
        body: expectedResponse,
      },
    });

    // Make the API call
    const userData = fetchProducts(3, 3);

    // Assert the response
    expect(userData).toEqual(expectedResponse);
  });

  // Write other test cases for different scenarios if needed

  // Stop the mock server
  afterAll(() => provider.finalize());
});
