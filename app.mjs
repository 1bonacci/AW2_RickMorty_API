import express from 'express'

const app = express()

let personajes = []

const ObtenerPersonajes = async () => {
    try {
        const response = await fetch('https://rickandmortyapi.com/api/character')
        const data = await response.json()
        
        personajes = data.results.map(personaje => {
            return {
              id: personaje.id,
              name: personaje.name,
              status: personaje.status,
              species: personaje.species
            };
        });
    } catch (error) {
        console.error('Error al obtener los personajes:', error);
      }
}

ObtenerPersonajes()

app.get('/personajes',(req, res) => {
    res.send(personajes)
})

app.get('/personajes/:species', (req, res) => {
    const species = req.params.species.toLowerCase()
    const personajesFiltrados = personajes.filter(personaje => personaje.species.toLowerCase() === species )
    res.send(personajesFiltrados)
})

app.listen(3000)