import app from "../../server.js";
import request from "supertest";
import mongoose from "mongoose";
import { fakerES as faker } from "@faker-js/faker";

const doc = {
  name: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  price: faker.number.int({ min: 100, max: 1000 }),
  stock: faker.number.int({ min: 0, max: 40 }),
};

describe("Tests integrales", () => {
  beforeEach(async () => {
    await mongoose.connection.collections["products"].drop();
  });

  test("[POST] /products", async () => {
    const response = await request(app).post("/products").send(doc);
    
    const id = response.body._id;
    const nameResponse = response.body.name;
    const nameExpected = doc.name;
    const descriptionResponse = response.body.description;
    const descriptionExpected = doc.body;
    const statusCode = response.statusCode;

    expect(id).toBeDefined();
    expect(response.body).toHaveProperty("_id");
    expect(nameResponse).toBe(nameExpected);
    expect(descriptionResponse).toEqual(descriptionExpected);
    expect(statusCode).not.toBe(404);
    expect(statusCode).toBe(200);
  });

  test("[GET] /products", async () => {
    const responseGet1 = await request(app).get("/products");
    expect(responseGet1.body).toHaveLength(0);

    const response = await request(app).post("/products").send(doc);
    const id = response.body._id;
    expect(id).toBeDefined();

    const responseGet2 = await request(app).get("/products");
    const statusCode = responseGet2.statusCode;
    expect(statusCode).toEqual(200);

    expect(responseGet2.body).toBeInstanceOf(Array);
    expect(responseGet2.body).toHaveLength(1);

    const dateResponse = responseGet2.body[0].date;
    const dateExpected = expect.stringContaining("2023");
    expect(dateResponse).toEqual(dateExpected);
  });

  test("[GET] /products/:id", async () => {
    const responsePost = await request(app).post("/products").send(doc);
    const id = responsePost.body._id;
    expect(id).toBeDefined();

    const responseGet = await request(app).get(`/products/${id}`);
    const statusCode = responseGet.status;
    expect(statusCode).toBe(200);

    const responseBodyGetById = responseGet.body.body;
    const responseBodyPost = responsePost.body.body;

    expect(responseBodyGetById).toEqual(responseBodyPost);

    const idFaker = "756f191e810c19729de942ea";
    const getByIdFail = await request(app).get(`/products/${idFaker}`);
    const statusCodeFail = getByIdFail.statusCode;
    const responseFail = getByIdFail.body.msg;
    const expectedMsgError = `No se encontró el id ${idFaker} en la base de datos.`;
    expect(statusCodeFail).toEqual(404);
    expect(responseFail).toEqual(expectedMsgError);
  });

  test("[PUT] /products/:id", async () => {
    const responsePost = await request(app).post("/products").send(doc);
    const id = responsePost.body._id;
    expect(id).toBeDefined();
    const docUpdated = {
      name: "name test updated",
      body: "body test updated",
      author: "Gonzalo Bonadeo Gomez",
      image: "...",
    };

    const responsePut = await request(app)
      .put(`/products/${id}`)
      .send(docUpdated);
    const statusCode = responsePut.status;
    const idPut = responsePut.body._id;
    expect(idPut).toBeDefined();
    expect(statusCode).toBe(200);
    const responsePutBody = responsePut.body.body;
    expect(responsePutBody).toBe(docUpdated.body);
  });

  test("[DELETE] /products/:id", async () => {
    const responsePost = await request(app).post("/products").send(doc);
    const id = responsePost.body._id;
    expect(id).toBeDefined();
    const responseDel = await request(app).delete(`/products/id/${id}`);
    const statusCode = responseDel.statusCode;
    expect(statusCode).toBe(200);
    const responseGetById = await request(app).get(`/products/${id}`);
    expect(responseGetById.statusCode).toBe(404);
    expect(responseGetById.body.msg).toEqual(
      `No se encontró el id ${id} en la base de datos.`
    );
  });
});