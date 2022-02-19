const express = require('express')
const fs = require('fs')

const server = express() // nos regresara un servidor

// middleware
server.use(express.json()) // recibir json en nuestros request

server.get('/hola', (request, response) => {
    response.write('GET /hola')
    response.end()
})

server.post('/hola', (request, response) => {
    response.write('POST /hola')
    response.end()
})


/*
1.- Leer mi archivo ()
2.- 

*/
server.get('/koders', async (request, response) => {
    // fs.readFileSync() //sincrona
    // fs.promises.readFile() // promesa
    // const content = fs.readFileSync('./koders.json', 'utf8')
    const content = await fs.promises.readFile('./koders.json')
    const json = JSON.parse(content) // convertir de string a un objeto valido
    response.json(json)
})

server.post('/koders', async (request, response) => {
    const newKoder = request.body
    console.log(newKoder)
    const content = await fs.promises.readFile('./koders.json')
    const jsonKoders = JSON.parse(content)
    jsonKoders.koders.push(newKoder)

    console.log(jsonKoders)

    await fs.promises.writeFile('./koders.json', JSON.stringify(jsonKoders, null, 2), 'utf8')

    response.json({
        success: true,
        message: 'Se creo el koder'
    })
})

// update
// path parameters
// Sintanxis Universal

// PATCH /koders/1
// PATCH /koders/10
// PATCH /koders/100
// PATCH /recursos/identificador
// PATCH /koders/:id
// PATCH /koders/100
// PATCH /koders/1
// PATCH /koders/10
server.patch('/koders/:id', async (request, response) => {
   console.log('id: ', request.params.id) 
   const idKoder = request.params.id
   const name = request.body.name
   const content = await fs.promises.readFile('./koders.json')
   const json = JSON.parse(content)
   console.log('json: ', json)
    // forEach
    // map
    // filter
    // reduce 
    const newKoders = json.koders.map((koder, index) => {
        if (koder.id === parseInt(idKoder)) {
            koder.name = name
        }
        return koder
    })
    console.log('newKoders')
    console.log(newKoders)

    json.koders = newKoders

    await fs.promises.writeFile('./koders.json', JSON.stringify(json, null, 2), 'utf8')
    response.json({
        success: true,
    })
})

// 



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

