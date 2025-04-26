let team = {}

let pokeAPI = {"count":1302,"next":"https://pokeapi.co/api/v2/pokemon?offset=10&limit=10","previous":null,"results":[{"name":"bulbasaur","url":"https://pokeapi.co/api/v2/pokemon/1/"},{"name":"ivysaur","url":"https://pokeapi.co/api/v2/pokemon/2/"},{"name":"venusaur","url":"https://pokeapi.co/api/v2/pokemon/3/"},{"name":"charmander","url":"https://pokeapi.co/api/v2/pokemon/4/"},{"name":"charmeleon","url":"https://pokeapi.co/api/v2/pokemon/5/"},{"name":"charizard","url":"https://pokeapi.co/api/v2/pokemon/6/"},{"name":"squirtle","url":"https://pokeapi.co/api/v2/pokemon/7/"},{"name":"wartortle","url":"https://pokeapi.co/api/v2/pokemon/8/"},{"name":"blastoise","url":"https://pokeapi.co/api/v2/pokemon/9/"},{"name":"caterpie","url":"https://pokeapi.co/api/v2/pokemon/10/"}]}

let pokemon = fetch('https://pokeapi.co/api/v2/pokemon?limit=10')
.then(response =>{
    if(!response.ok){
        throw new Error('Network response was bad: ' + response.statusText)
    }
    return response.json()
})

.then(data => {
    console.log('Pokemon Data: ', data)
    data.results.forEach(pokemon =>{
        console.log("Name:", pokemon.name)
        console.log("URL:", pokemon.url)

        fetch(pokemon.url)
        .then(response =>{
            if(!response.ok){
                throw new Error('Network response was bad: ' + response.statusText)
            }
            return response.json()
        })
        .then(info =>{
            console.log(info.base_experience)
            console.log(info.sprites.front_default)
            console.log(info.types[0].type.name)
            console.log(info.abilities[0].ability.name)
        })
    })
    return data
})
.catch(error =>{
    console.error("There was a problem: ", error)
})
