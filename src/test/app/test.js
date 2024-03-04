import { describe, test } from "node:test";
import assert from "node:assert";
import { fakerES as faker } from "@faker-js/faker";

const doc = {
  name: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  price: faker.number.int({ min: 100, max: 1000 }),
  stock: faker.number.int({ min: 0, max: 40 }),
};

const apiURL = "http://localhost:8080/products";

describe("Tests API products", () => {
  test("[GET] /products", async () => {
    await fetch(apiURL, { method: "DELETE" });
    const response = await fetch(apiURL);
    const responseGet = await response.json();
    
    assert.strictEqual(Array.isArray(responseGet), true);
    assert.equal(responseGet.length === 0, true);

    const response2 = await fetch(apiURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(doc),
    });
    const responsePost = await response2.json();
    assert.ok(responsePost, "_id");
    const statusCode = response2.status;
    assert.equal(statusCode, 200);

    const response3 = await fetch(apiURL);
    const responseGet2 = await response3.json();
    assert.equal(responseGet2.length, 1);
  });

  test("[POST] /products", async () => {
    await fetch(apiURL, { method: "DELETE" });
    const response = await fetch(apiURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(doc),
    });
    const responsePost = await response.json();
    assert.ok(responsePost, "_id");
    const statusCode = response.status;
    assert.equal(statusCode, 200);
    const id = responsePost._id;
    assert.equal(typeof id, "string");
  });

  
});