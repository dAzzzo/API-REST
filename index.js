/**
 * Tres formas de almacenar valores en memoria en javascript:
 *      let: se puede modificar
 *      var: se puede modificar
 *      const: es constante y no se puede modificar
 */

const { MongoClient } = require("mongodb");
// or as an es module:
// import { MongoClient } from 'mongodb'

//Implementamos helmet para agregar seguridad
// Importamos las bibliotecas necesarias.
// Concretamente el framework express.
const express = require("express");
const helmet = require("helmet");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const url = "mongodb://localhost:27017/concesionarios";
const client = new MongoClient(url);

// Database Name
const dbName = "concesionarios";

let db = null;
let collection = null;
let findResult = null;

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to server");
<<<<<<< HEAD
  db = client.db(concesionarios);
  collection = db.collection("concesionario");
=======
  db = client.db();
  collection = db.collection("concesionarios");
>>>>>>> 8074eb33af8c340aac2d894d3b10f380f6d467b3
  findResult = await collection.find({}).toArray();

  // the following code examples can be pasted here...

  return "done.";
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());

// Inicializamos la aplicación
const app = express();

// Use Helmet como middleware para seguridad
app.use(helmet());

// Indicamos que la aplicación puede recibir JSON (API Rest)
app.use(express.json());

//configuramos el swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Indicamos el puerto en el que vamos a desplegar la aplicación
const port = process.env.PORT || 8082;

// Arrancamos la aplicación
app.listen(port, () => {
  console.log(`Servidor desplegado en puerto: ${port}`);
});

// Array de concesionario
let concesionarios = [
  {
    nombre: "nombreConcesionario1",
    direccion: "calle-alvarez",
    listado: "6",
    coches: [
      { marca: "Renault", modelo: "Clio" },
      { marca: "Nissan", modelo: "Skyline R34" },
    ],
  },
  {
    nombre: "nombreConcesionario2",
    direccion: "calle-rodrigez",
    listado: "4",
    coches: [
      { marca: "Opel", modelo: "Corsa" },
      { marca: "Volvo", modelo: "xC40" },
    ],
  },
];

// // Rutas para operaciones de coches

// Lista todos los coches
// app.get("/coches", (request, response) => {
//  response.json(concesionarios);
// });

// // Añadir un nuevo coche
// app.post("/coches", (request, response) => {
//   coches.push(request.body);
//   response.json({ message: "ok" });
// });

// // Obtener un solo coche
// app.get("/coches/:id", (request, response) => {
//   const id = request.params.id;
//   const result = coches[id];
//   response.json({ result });
// });

// // Actualizar un solo coche
// app.put("/coches/:id", (request, response) => {
//   const id = request.params.id;
//   coches[id] = request.body;
//   response.json({ message: "ok" });
// });

// // Borrar un coche por su indice
// app.delete("/coches/:id", (request, response) => {
//   const id = request.params.id;
//   coches = coches.filter((item, index) => index != id);
//   response.json({ message: "ok" });
// });

// Rutas para operaciones de concesionarios

// Obtener todos los concesionarios
app.get("/concesionarios", async (request, response) => {
  try {
    const collection = db.collection("concesionarios");
    const result = await collection.find({}).toArray();
    response.json(result);
  } catch (err) {
    console.error(err);
    response.status(500).json({ error: err.message });
  }
});

// Crear un nuevo concesionario
app.post("/concesionarios", async (request, response) => {
  try {
    const nuevoConcesionario = request.body;
    const collection = db.collection("concesionarios");
    const result = await collection.insertOne(nuevoConcesionario);
    response.json({ message: "Concesionario creado", id: result.insertedId });
  } catch (err) {
    console.error(err);
    response.status(500).json({ error: err.message });
  }
});

// Obtener un solo concesionario
app.get("/concesionarios/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const collection = db.collection("concesionarios");
    const result = await collection.findOne({ _id: ObjectId(id) });
    response.json({ result });
  } catch (err) {
    console.error(err);
    response.status(500).json({ error: err.message });
  }
});

// Actualizar un concesionario
app.put("/concesionarios/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const updatedConcesionario = request.body;
    const collection = db.collection("concesionarios");
    await collection.updateOne({ _id: ObjectId(id) }, { $set: updatedConcesionario });
    response.json({ message: "Concesionario actualizado" });
  } catch (err) {
    console.error(err);
    response.status(500).json({ error: err.message });
  }
});

// Borrar un concesionario por su índice
app.delete("/concesionarios/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const collection = db.collection("concesionarios");
    await collection.deleteOne({ _id: ObjectId(id) });
    response.json({ message: "Concesionario eliminado" });
  } catch (err) {
    console.error(err);
    response.status(500).json({ error: err.message });
  }
});

// Rutas para operaciones de coches en concesionarios

// Obtener todos los coches de un concesionario por ID
app.get("/concesionarios/:id/coches", async (request, response) => {
  try {
    const id = request.params.id;
    const collection = db.collection("concesionarios");
    const result = await collection.findOne({ _id: ObjectId(id) }, { coches: 1 });
    response.json({ result: result.coches });
  } catch (err) {
    console.error(err);
    response.status(500).json({ error: err.message });
  }
});

// Añadir un nuevo coche a un concesionario por ID
app.post("/concesionarios/:id/coches", async (request, response) => {
  try {
    const id = request.params.id;
    const nuevoCoche = request.body;
    const collection = db.collection("concesionarios");
    await collection.updateOne({ _id: ObjectId(id) }, { $push: { coches: nuevoCoche } });
    response.json({ message: "Coche añadido al concesionario" });
  } catch (err) {
    console.error(err);
    response.status(500).json({ error: err.message });
  }
});

// Rutas para operaciones de coches específicos en un concesionario

// Obtener un coche específico de un concesionario por ID de concesionario y coche
app.get("/concesionarios/:id/coches/:cocheId", async (request, response) => {
  try {
    const id = request.params.id;
    const cocheId = request.params.cocheId;
    const collection = db.collection("concesionarios");
    const result = await collection.findOne({ _id: ObjectId(id) }, { coches: 1 });
    const coche = result.coches[cocheId];
    response.json({ coche });
  } catch (err) {
    console.error(err);
    response.status(500).json({ error: err.message });
  }
});

// Actualizar un coche específico de un concesionario por ID de concesionario y coche
app.put("/concesionarios/:id/coches/:cocheId", async (request, response) => {
  try {
    const id = request.params.id;
    const cocheId = request.params.cocheId;
    const updatedCoche = request.body;
    const collection = db.collection("concesionarios");
    await collection.updateOne(
      { _id: ObjectId(id), "coches._id": ObjectId(cocheId) },
      { $set: { "coches.$": updatedCoche } }
    );
    response.json({ message: "Coche actualizado" });
  } catch (err) {
    console.error(err);
    response.status(500).json({ error: err.message });
  }
});

// Borrar un coche específico de un concesionario por ID de concesionario y coche
app.delete("/concesionarios/:id/coches/:cocheId", async (request, response) => {
  try {
    const id = request.params.id;
    const cocheId = request.params.cocheId;
    const collection = db.collection("concesionarios");
    await collection.updateOne(
      { _id: ObjectId(id) },
      { $pull: { coches: { _id: ObjectId(cocheId) } } }
    );
    response.json({ message: "Coche eliminado del concesionario" });
  } catch (err) {
    console.error(err);
    response.status(500).json({ error: err.message });
  }
});
