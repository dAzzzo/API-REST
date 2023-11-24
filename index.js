/**
 * Tres formas de almacenar valores en memoria en javascript:
 *      let: se puede modificar
 *      var: se puede modificar
 *      const: es constante y no se puede modificar
 */

// Importamos las bibliotecas necesarias.
// Concretamente el framework express.
const express = require("express");

// Inicializamos la aplicación
const app = express();

// Indicamos que la aplicación puede recibir JSON (API Rest)
app.use(express.json());

// Indicamos el puerto en el que vamos a desplegar la aplicación
const port = process.env.PORT || 8080;

// Arrancamos la aplicación
app.listen(port, () => {
  console.log(`Servidor desplegado en puerto: ${port}`);
});

// Definimos una estructura de datos
// (temporal hasta incorporar una base de datos)
let coches = [
  { marca: "Renault", modelo: "Clio" },
  { marca: "Nissan", modelo: "Skyline R34" },
];

//coches

// Lista todos los coches
app.get("/coches", (request, response) => {
  response.json(coches);
});

// Añadir un nuevo coche
app.post("/coches", (request, response) => {
  coches.push(request.body);
  response.json({ message: "ok" });
});

// Obtener un solo coche
app.get("/coches/:id", (request, response) => {
  const id = request.params.id;
  const result = coches[id];
  response.json({ result });
});

// Actualizar un solo coche
app.put("/coches/:id", (request, response) => {
  const id = request.params.id;
  coches[id] = request.body;
  response.json({ message: "ok" });
});

// Borrar un elemento del array
app.delete("/coches/:id", (request, response) => {
  const id = request.params.id;
  coches = coches.filter((item) => coches.indexOf(item) !== id);

  response.json({ message: "ok" });
});

//Concesionario

// Listamos los concesionarios
app.get("/concesionarios", (request, response) => {
  response.json(concesionarios);
});

// Añadir un nuevo concesionarios
app.post("/concesionarios", (request, response) => {
  coches.push(request.body);
  response.json({ message: "ok" });
});

// Obtener un solo concesionarios
app.get("/concesionarios/:id", (request, response) => {
  const id = request.params.id;
  const result = concesionarios[id];
  response.json({ result });
});
