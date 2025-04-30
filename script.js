let favoritePokemon = ['pikachu', 'charmander', 'charizard', 'greninja', 'lopunny', 'bulbasaur', 'gardevoir', 'squirtle', 'blastoise', 'vaporeon']
const cards = document.getElementById("pokemonCards")
const isIndex = document.getElementById("pokemonCards") // Used for toggling between functions
const isPokedex = document.getElementById("searchBtn") // Toggle

// Index Page Logic
if(isIndex){ // If the element pokemon Cards exists (only exists in the index page)
    favoritePokemon.forEach(name =>{ // For each pokemon
        fetch(`https://pokeapi.co/api/v2/pokemon/${name}`) // Fetch their stats
        .then(response =>{
            if(!response.ok){throw new Error('Network response was bad: ' + response.statusText)}
            return response.json()
        })
        .then(info =>{ // Then create a card for each pokemon
            let card = document.createElement("div") // Create a div to store card
            // Add stuff to div
            card.innerHTML = `
            <h3>${info.name}</h3>
            <img src=${info.sprites.front_default} alt ="${info.name}"></img>
            <p>Pokemon Type: ${info.types[0].type.name}</p>
            <p>First Ability: ${info.abilities[0].ability.name}</p>
            <p>Base EXP: ${info.base_experience}</p>
            <p>Height: ${info.height/10} meters</p>
            <p>Weight: ${info.weight/10} kilograms</p>
            `
            cards.appendChild(card)
            // Adds div to the container
        })
        .catch(error =>{
            cards.innerHTML = '<p>Could not find Pokemon. Please check the name/ID and try again.</p>' // Error message
            console.error("There was a problem: ", error)
        })
    })
}

// Pokedex page logic
if(isPokedex){
    function lookUp(){
        const pokeDex = document.getElementById('pokemonInfo')
        const search = document.getElementById('pokemonInput').value.toLowerCase() // Lowercase for the url
        pokeDex.innerHTML = ''; // Clears other pokemon cards and error message 

        fetch(`https://pokeapi.co/api/v2/pokemon/${search}`) // Fetches pokemon from the search bar
        .then(response =>{
            if(!response.ok){throw new Error('Network response was bad: ' + response.statusText)}
            return response.json()
        })
        .then(info =>{ 
            let card = document.createElement("div") // Creates a card for the chosen pokemon
            // Adds info to card
            card.innerHTML = `
            <h3>${info.name}</h3>
            <img src=${info.sprites.front_default} alt ="${info.name}"></img>
            <p>Pokemon Type: ${info.types[0].type.name}</p>
            <p>First Ability: ${info.abilities[0].ability.name}</p>
            <p>Base EXP: ${info.base_experience}</p>
            <p>Height: ${info.height/10} meters</p>
            <p>Weight: ${info.weight/10} kilograms</p>
            `
            pokeDex.appendChild(card) // Adds card to div
        })
        .catch(error =>{
            pokeDex.innerHTML = '<p>Could not find Pokemon. Please check the name/ID and try again.</p>'
            console.error("There was a problem: ", error)
        })
    }
}