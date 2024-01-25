import { describe, expect, it } from "bun:test";
import { app } from ".";

describe("Elysia", () => {
  it("returns a greeting", async () => {
    const response = await app
      .handle(new Request("http://localhost:8080"))
      .then((res) => res.text());

    expect(response).toBe("hi");
  });

  it("returns  an array of cats", async () => {
    const response = await app
      .handle(new Request("http://localhost:8080/cats"))
      .then((res) => res.json());

    expect(response).toBeArray();
  });
});
