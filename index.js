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
const url = "mongodb://localhost:27017";
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
  db = client.db(concesionarios);
  collection = db.collection("concesionario");
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
const port = process.env.PORT || 8080;

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
app.get("/concesionarios", (request, response) => {
  response.json(concesionarios);
});

// Crear un nuevo concesionario
app.post("/concesionarios", (request, response) => {
  concesionarios.push(request.body);
  response.json({ message: "ok" });
  concesionarios.save();
});

// Obtener un solo concesionario
app.get("/concesionarios/:id", (request, response) => {
  const id = request.params.id;
  const result = concesionarios[id];
  response.json({ result });
});

// Actualizar un concesionario
app.put("/concesionarios/:id", (request, response) => {
  const id = request.params.id;
  concesionarios[id] = request.body;
  response.json({ message: "ok" });
  concesionarios.save();
});

// Borrar un concesionario por su índice
app.delete("/concesionarios/:id", (request, response) => {
  const id = request.params.id;
  concesionarios = concesionarios.filter((item, index) => index != id);
  response.json({ message: "ok" });
  concesionarios.save();
});

// Rutas para operaciones de coches en concesionarios

// Obtener todos los coches de un concesionario por ID
app.get("/concesionarios/:id/coches", (request, response) => {
  const id = request.params.id;
  const result = concesionarios[id].coches;
  response.json({ result });
});

// Añadir un nuevo coche a un concesionario por ID
app.post("/concesionarios/:id/coches", (request, response) => {
  concesionarios[id].coches.push(request.body);
  response.json({ message: "ok" });
  concesionarios.save();
});

// Rutas para operaciones de coches específicos en un concesionario

// Obtener un coche específico de un concesionario por ID de concesionario y coche
app.get("/concesionarios/:id/coches/:cocheId", (request, response) => {
  const id = request.params.id;
  const cocheId = request.params.cocheId;
  const coches = concesionarios[id].coches[cocheId];
  response.json({ coches });
});

// Actualizar un coche específico de un concesionario por ID de concesionario y coche
app.put("/concesionarios/:id/coches/:cocheId", (request, response) => {
  const id = request.params.id;
  const cocheId = request.params.cocheId;
  concesionarios[id].coches[cocheId] = request.body;
  response.json({ message: "ok" });
  concesionarios.save();
});

// Borrar un coche específico de un concesionario por ID de concesionario y coche
app.delete("/concesionarios/:id/coches/:cocheId", (request, response) => {
  const id = request.params.id;
  const cocheId = request.params.cocheId;
  concesionarios[id].coches.splice(cocheId, 1);
  response.json({ message: "ok" });
  concesionarios.save();
});
