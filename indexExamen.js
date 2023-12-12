/**
 * Tres formas de almacenar valores en memoria en javascript:
 *      let: se puede modificar
 *      var: se puede modificar
 *      const: es constante y no se puede modificar
 */

//EXAMEN con las entidades greidsla y puckets

const { MongoClient, ObjectId } = require("mongodb");
// or as an es module:
// import { MongoClient, ObjectId} from 'mongodb'

//Implementamos helmet para agregar seguridad
// Importamos las bibliotecas necesarias.
// Concretamente el framework express.
const express = require("express");
const helmet = require("helmet");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swaggerExamen.json");
const url = "mongodb://localhost:27017/greidsla";
const client = new MongoClient(url);

// Database Name
const dbName = "greidsla";

let db = null;
let collection = null;
let findResult = null;

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log("Arriba Perú csmr!!!");

  db = client.db(greidsla);
  collection = db.collection("greidsla");

  db = client.db();
  collection = db.collection("greidsla");

  findResult = await collection.find({}).toArray();

  return "done.";
}

main().then(console.log).catch(console.error);

// Inicializamos la aplicación
const app = express();

// Use Helmet como middleware para seguridad
app.use(helmet());

// Indicamos que la aplicación puede recibir JSON (API Rest)
app.use(express.json());

//configuramos el swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Indicamos el puerto en el que vamos a desplegar la aplicación
const port = process.env.PORT || 8080;

// Arrancamos la aplicación
app.listen(port, () => {
  console.log(`Servidor desplegado en puerto: ${port}`);
});

// Array de concesionario
let greidsla = [
  {
    nombre: "nombreGreidsla1",
    fecha: "10 enero",
    ciudad: "Rota",
    pucket: [
      {
        descripcion: "Descripcion1",
        precio: 3,
        cantidad: 4,
      },
      {
        descripcion: "Descripcion2",
        precio: 5,
        cantidad: 2,
      },
    ],
  },
  {
    nombre: "nombreGreidsla2",
    fecha: "15 febrero",
    ciudad: "Granada",
    pucket: [
      {
        descripcion: "Descripcion1",
        precio: 8,
        cantidad: 6,
      },
      {
        descripcion: "Descripcion2",
        precio: 1,
        cantidad: 9,
      },
    ],
  },
];

// Rutas para operaciones de greidsla

// Obtener todos los greidsla
app.get("/greidsla", async (request, response) => {
  try {
    const collection = db.collection("greidsla");
    const result = await collection.find({}).toArray();
    response.json(result);
  } catch (err) {
    console.error(err);
    response.status(500).json({ error: err.message });
  }
});

// Crear un nuevo greidsla
app.post("/greidsla", async (request, response) => {
  try {
    const nuevoGreidsla = request.body;
    const collection = db.collection("greidsla");
    const result = await collection.insertOne(nuevoGreidsla);
    response.json({ message: "greidsla creado", id: result.insertedId });
  } catch (err) {
    console.error(err);
    response.status(500).json({ error: err.message });
  }
});

// Obtener un solo greidsla
app.get("/greidsla/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const collection = db.collection("greidsla");
    const result = await collection.findOne({ _id: new ObjectId(id) });
    response.json({ result });
  } catch (err) {
    console.error(err);
    response.status(500).json({ error: err.message });
  }
});

// Actualizar un greidsla
app.put("/greidsla/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const updatedGreidsla = request.body;
    const collection = db.collection("greidsla");
    await collection.updateOne({ _id: new ObjectId(id) }, { $set: updatedGreidsla });
    response.json({ message: "greidsla actualizado" });
  } catch (err) {
    console.error(err);
    response.status(500).json({ error: err.message });
  }
});

// Borrar un greidsla por su índice
app.delete("/greidsla/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const collection = db.collection("greidsla");
    await collection.deleteOne({ _id: new ObjectId(id) });
    response.json({ message: "greidsla eliminado" });
  } catch (err) {
    console.error(err);
    response.status(500).json({ error: err.message });
  }
});

// Rutas para operaciones de pucket en greidsla

// Obtener todos los pucket de un greidsla por ID
app.get("/greidsla/:id/pucket", async (request, response) => {
  try {
    const id = request.params.id;
    const collection = db.collection("greidsla");
    const result = await collection.findOne({ _id: new ObjectId(id) }, { pucket: 1 });
    response.json({ result: result.pucket });
  } catch (err) {
    console.error(err);
    response.status(500).json({ error: err.message });
  }
});

// Añadir un nuevo pucket a un greidsla por ID
app.post("/greidsla/:id/pucket", async (request, response) => {
  try {
    const id = request.params.id;
    const nuevoPucket = request.body;
    const collection = db.collection("greidsla");
    await collection.updateOne({ _id: new ObjectId(id) }, { $push: { pucket: nuevoPucket } });
    response.json({ message: "Pucket añadido al greidsla" });
  } catch (err) {
    console.error(err);
    response.status(500).json({ error: err.message });
  }
});

// Rutas para operaciones de pucket específicos en un greidsla

// Obtener un pucket específico de un greidsla por ID de greidsla y pucket
app.get("/greidsla/:id/pucket/:pucketId", async (request, response) => {
  try {
    const id = request.params.id;
    const pucketId = request.params.pucketId;
    const collection = db.collection("greidsla");
    const result = await collection.findOne({ _id: new ObjectId(id) }, { pucket: 1 });
    const pucket = result.pucket[pucketId];
    response.json({ pucket });
  } catch (err) {
    console.error(err);
    response.status(500).json({ error: err.message });
  }
});

// Actualizar un pucket específico de un greidsla por ID de greidsla y pucket
app.put("/greidsla/:id/pucket/:pucketId", async (request, response) => {
  try {
    const id = request.params.id;
    const pucketId = request.params.pucketId;
    const updatedPucket = request.body;
    const collection = db.collection("greidsla");
    await collection.updateOne(
      { _id: new ObjectId(id), "pucket._id": new ObjectId(pucketId) },
      { $set: { "pucket.$": updatedPucket } }
    );
    response.json({ message: "Pucket actualizado" });
  } catch (err) {
    console.error(err);
    response.status(500).json({ error: err.message });
  }
});

// Borrar un pucket específico de un greidsla por ID de greidsla y pucket
app.delete("/greidsla/:id/pucket/:pucketId", async (request, response) => {
  try {
    const id = request.params.id;
    const pucketId = request.params.pucketId;
    const collection = db.collection("greidsla");
    await collection.updateOne(
      { _id: new ObjectId(id) },
      { $pull: { pucket: { _id: new ObjectId(pucketId) } } }
    );
    response.json({ message: "Pucket eliminado del greidsla" });
  } catch (err) {
    console.error(err);
    response.status(500).json({ error: err.message });
  }
});
