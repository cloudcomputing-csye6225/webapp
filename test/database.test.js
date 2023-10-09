import { checkConnection } from "../api/services/connection-service.js";

describe("Database Connectivity", () => {
  test("connect to the database", async () => {
    const response = await checkConnection();
    expect(response.statusCode).toBe(200);
  });
});
