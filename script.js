let cards = document.getElementById("pokemonCards")

let pokeAPI = {
    "count": 1302,
    "next": "https://pokeapi.co/api/v2/pokemon?offset=10&limit=10",
    "previous": null,
    "results":[
        {"name":"bulbasaur","url":"https://pokeapi.co/api/v2/pokemon/1/"},{"name":"ivysaur","url":"https://pokeapi.co/api/v2/pokemon/2/"},{"name":"venusaur","url":"https://pokeapi.co/api/v2/pokemon/3/"},{"name":"charmander","url":"https://pokeapi.co/api/v2/pokemon/4/"},{"name":"charmeleon","url":"https://pokeapi.co/api/v2/pokemon/5/"},{"name":"charizard","url":"https://pokeapi.co/api/v2/pokemon/6/"},{"name":"squirtle","url":"https://pokeapi.co/api/v2/pokemon/7/"},{"name":"wartortle","url":"https://pokeapi.co/api/v2/pokemon/8/"},{"name":"blastoise","url":"https://pokeapi.co/api/v2/pokemon/9/"},{"name":"caterpie","url":"https://pokeapi.co/api/v2/pokemon/10/"}
    ]
}

let pokemon = fetch('https://pokeapi.co/api/v2/pokemon?limit=10')
.then(response =>{
    if(!response.ok){
        throw new Error('Network response was bad: ' + response.statusText)
    }
    return response.json()
})

.then(data => {
    console.log('Pokemon Data: ', data)
    data.results.forEach(pokemon =>{ // For each pokemon
        console.log("Name:", pokemon.name)
        console.log("URL:", pokemon.url)

        fetch(pokemon.url) // Get pokemon stats
        .then(response =>{
            if(!response.ok){
                throw new Error('Network response was bad: ' + response.statusText)
            }
            return response.json()
        })
        .then(info =>{ // Then create a card for each pokemon
            let card = document.createElement("div")
            card.innerHTML = `
            <h3>${pokemon.name}</h3>
            <img src=${info.sprites.front_default}></img>
            <p>Pokemon Type: ${info.types[0].type.name}</p>
            <p>First Ability: ${info.abilities[0].ability.name}</p>
            <p>Base EXP: ${info.base_experience}</p>
            `
            cards.appendChild(card)
            // Adds card to the container
        })
    })
    return data
})
.catch(error =>{
    console.error("There was a problem: ", error)
})
