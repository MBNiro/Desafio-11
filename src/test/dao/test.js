import { test } from "node:test";
import assert from "node:assert";
import DaoMongo from "../../persistence/daos/mongodb/dao/mongo.dao.js";
import { logger } from "../logs/news.logs.js";
import mongoose from "mongoose";
import { fakerES as faker } from "@faker-js/faker";

const doc = {
  name: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  price: faker.number.int({ min: 100, max: 1000 }),
  stock: faker.number.int({ min: 0, max: 40 }),
};

let prodsDao;
prodsDao = new DaoMongo();
DaoMongo.init();
await mongoose.connection.collections["products"].drop();
logger.info("se limpió la base de datos");


test("Debería retornar todos los productos", async () => {
  const response = await prodsDao.getAll();
  assert.strictEqual(Array.isArray(response), true);
  assert.strictEqual(response.length === 0, true);
});

test("Debería agregar un producto", async () => {
  const response = await prodsDao.create(doc);
  const collection = await prodsDao.getAll();
  assert.ok(response, "_id");
  assert.equal(response.name, doc.name);
  assert.equal(typeof doc.body, "string");
  assert.equal(collection.length, 1);
});

test("Debería encontrar un producto en una búsqueda por id", async () => {
  const response = await prodsDao.create(doc);
  const idString = response._id.toString();
  const docProd = await prodsDao.getById(response._id);
  assert.equal(docProd._id.toString(), idString);
});

test("Actualizar doc", async () => {
  const doc = {
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.number.int({ min: 100, max: 1000 }),
    stock: faker.number.int({ min: 0, max: 40 }),
  };
  const doc2 = {
    name: "MODIFICADO",
    description: "Producto modificado",
    price: 100,
    image: 8,
  };
  const response = await prodsDao.create(doc);
  const docProd = await prodsDao.getById(response._id);
  const docUpd = await prodsDao.update(docProd, doc2);
  assert.strictEqual(docUpd.name, doc2.name);
  assert.strictEqual(docUpd.description, doc2.description);
  assert.strictEqual(docUpd.price, doc2.price);
});

test("Eliminar doc", async () => {
  const doc = {
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.number.int({ min: 100, max: 1000 }),
    stock: faker.number.int({ min: 0, max: 40 }),
  };
  const response = await prodsDao.create(doc);
  const docDel = await prodsDao.delete(response._id);
  assert.equal(docDel._id.toString(), response._id.toString());
  assert.equal(docDel.name, doc.name);
});