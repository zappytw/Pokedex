const Form = document.getElementById("pokeForm")
const Input = document.getElementById("pokeInput")
const Container = document.getElementById("mainContainer")

async function fetchAllPokes() {
    let response = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=1025")
    let allPokes = await response.json();
    return allPokes
}

async function filterPokes(name) {
    let allPokes = await fetchAllPokes()
    let filteredPokes = allPokes.results.filter(poke=>poke.name.includes(name))
    showPokes(filteredPokes)
    return filteredPokes
}

async function showPokes(filteredPokes) {
    Container.innerHTML=""
    for(const pokemon of filteredPokes){
        response = await fetch(pokemon.url)
        pokeData = await response.json()

        let pokeDiv = document.createElement("div")
        let pokeImg = document.createElement("img")
        let pokeName = document.createElement("p")
        let pokeId = document.createElement("p")
        let pokeType1 = document.createElement("p")

        pokeDiv.classList.add("pokeDiv")
        pokeImg.classList.add("pokeImg")
        pokeName.classList.add("pokeName")
        pokeId.classList.add("pokeId")
        pokeType1.classList.add("pokeType")

        pokeImg.src=pokeData.sprites.front_default
        pokeName.textContent= pokeData.name
        pokeId.textContent="#" + pokeData.id
        pokeType1.textContent= pokeData.types[0].type.name
        pokeDiv.append(pokeImg, pokeName, pokeId, pokeType1)

        if(pokeData.types[1]!==undefined){
            let pokeType2 = document.createElement("p")
            pokeType2.textContent = pokeData.types[1].type.name
            pokeType2.classList.add("pokeType")
            pokeDiv.append(pokeType2)
        }

        Container.append(pokeDiv)
    }
    
}

Form.addEventListener("submit", async (event)=>{
    event.preventDefault();
    let searchQuery = Input.value
    filterPokes(searchQuery)
})