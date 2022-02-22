const express = require('express')
const fs = require('fs')

const router = express.Router() // se crea el router

async function getKoders () {
    const content = await fs.promises.readFile('./kodemia.json')
    const koders = JSON.parse(content) // convertir de string a un objeto valido
    return koders
}

// query params
// ?country=mexico

// GET /koders?count=3
// GET /koders?gender=f
// GET /koders?generation=10
// GET /koders?gender=f&generation=10
// GET /koders?gender=f&generation=10&count=2
router.get('/', async (request, response) => {
    console.log('query params: ', request.query)
    const count = request.query.count
    console.log('count: ',count)
    const json = await getKoders()
    
    let kodersData = json.koders
    if(count) {
        kodersData = kodersData.slice(0, parseInt(count))
    }
    response.json({
        koders: kodersData
    })
})


// GET /koders/2
// GET /koders/1
router.get('/:id', async (request, response) => {
    const idKoder = request.params.id

    const json = await getKoders()

    // const koderFound = json.koders.filter((koder, index) => koder.id === parseInt(idKoder))
    const koderFound = json.koders.find((koder) => koder.id === parseInt(idKoder))
    console.log(koderFound)

    if(!koderFound) {
        response.status(404)
        response.json({
            success: false,
            message: 'Koder not found'
        })
        return
    }
    response.json({
        success: true,
        koder: koderFound
    })
})

router.delete('/:id', async (request, response) => {
    const idKoder = request.params.id

    const json = await getKoders()
    const kodersFiltered = json.koders.filter((koder) => koder.id !== parseInt(idKoder))
    json.koders = kodersFiltered

    await fs.promises.writeFile('./kodemia.json', JSON.stringify(json, null, 2), 'utf8')

    response.json({
        success: true,
        message: 'Koder deleted successfully'
    })
})

router.post('/', async (request, response) => {
    const newKoder = request.body
    console.log(newKoder)
    const json = await getKoders()
    json.koders.push(newKoder)

    console.log(json)

    await fs.promises.writeFile('./kodemia.json', JSON.stringify(json, null, 2), 'utf8')

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
router.patch('/:id', async (request, response) => {
   console.log('id: ', request.params.id) 
   const idKoder = request.params.id
   const name = request.body.name

   const json = await getKoders()

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

    await fs.promises.writeFile('./kodemia.json', JSON.stringify(json, null, 2), 'utf8')
    response.json({
        success: true,
    })
})

// exportar
module.exports = router