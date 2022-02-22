const express = require('express')
const kodersRouter = require('./routers/koders')
const server = express() // nos regresara un servidor

// middleware
server.use(express.json()) // recibir json en nuestros request


// montar el router de koders
server.use('/koders', kodersRouter)

// GET /koders/koders x mal u.u

// GET /koders/ bien :3
// GET /koders/:id ^^

server.listen(8080, () => {
    console.log(`Server running on port :8080`)
})


// Ejercicio 1:
/*

GET /koders -> Aqui estan todos lo koders
POST /koders -> aqui puedes crear koders
PUT /koders -> Aqui puedes sustituir a koders

*/

// Endpoint
/*
Es el conjunto de un METODO y una RUTA
GET /koders
GET /koders/:id
POST /koders
PATCH /koders
*/

/*
Práctica: fs + express

GET /koders -> Regresar un json con una lista de koders
 -> la lista de koders vendrá de un archivo .json
 leer al archivo koders.json con fs.

POST /koders -> agregar un koder al archivo

*/

/*

Un endpoint para borrar a un koder

DELETE /koders/:id
GET /koders/:id

*/

