const Form = document.getElementById("pokeForm")
const Input = document.getElementById("pokeInput")
const mainContainer = document.getElementById("mainContainer")
const overlay = document.getElementById("overlay")
const controlsDiv = document.getElementById("controls")
    const prevBtn = document.getElementById("prev")
    const pageDiv = document.getElementById("page")
    const nextBtn = document.getElementById("next")

const sidePanel = document.getElementById("sidePanelInfo")
const pokeProfile = document.getElementById("pokeProfile")
    const pokeProfileImg = document.getElementById("pokeProfileImg")
    const pokeProfileName = document.getElementById("pokeProfileName")
    const pokeProfileId = document.getElementById("pokeProfileId")
    const cryBtn = document.getElementById("cryBtn")

const audioPlink = new Audio("plink.mp3")
const pokeCry = new Audio
    pokeCry.volume= 0.4

let loading = false
let allPokes;
fetchPokes()

let searchQuery;

let offset = 0
let limit = 50
async function fetchPokes() {
    loading = true
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=1025`)
    allPokes = await response.json();
    loading = false
}



async function filterPokes(name) {
    loading = true
    let filteredPokes = allPokes.results.filter(poke=>poke.name.includes(name))
    await showPokes(filteredPokes)
    loading = false
    return filteredPokes
}

async function showPokes(filteredPokes) {
    mainContainer.innerHTML=""
    for(const pokemon of filteredPokes.slice(offset,offset + limit)){
        const response = await fetch(pokemon.url)
        const pokeData = await response.json()

        let pokeDiv = document.createElement("div")
        pokeDiv.classList.add("pokeDiv")
        pokeDiv.innerHTML=`
        <img src=${pokeData.sprites.other.dream_world.front_default || 
                    pokeData.sprites.other["official-artwork"].front_default
        } class="pokeImg"></img>
        <div class="pokeName">${capitalize(pokeData.species.name)}<div>
        <div class="pokeId">#${cerearNumero(pokeData.id,4)}</div>
        `
        let pokeTypeDiv = document.createElement("div")
        let pokeType1 = document.createElement("div")
        pokeType1.style.backgroundColor=`var(--${pokeData.types[0].type.name})`

        pokeTypeDiv.classList.add("pokeTypeDiv")
        pokeType1.classList.add("pokeType", pokeData.types[0].type.name)

        pokeType1.textContent= capitalize(pokeData.types[0].type.name)
        pokeTypeDiv.append(pokeType1)
        pokeDiv.style.background=`var(--${pokeData.types[0].type.name})`
        
        if(pokeData.types[1]!==undefined){
            let pokeType2 = document.createElement("div")

            pokeType2.classList.add("pokeType", pokeData.types[1].type.name)
            pokeType2.style.backgroundColor=`var(--${pokeData.types[1].type.name})`
            pokeType2.textContent = capitalize(pokeData.types[1].type.name)
            pokeDiv.style.background=`linear-gradient(to right, var(--${pokeData.types[0].type.name}) 50%, var(--${pokeData.types[1].type.name}) 50%)`
            pokeTypeDiv.append(pokeType2)
        }
        pokeDiv.dataset.id = JSON.stringify(pokeData)
        pokeDiv.append(pokeTypeDiv)
        mainContainer.append(pokeDiv)
    }
    
}
prevBtn.addEventListener("click",(e)=>{
    if(offset !== 0){
        if(loading) return;
    offset-=50
    filterPokes(searchQuery)
    }
})
nextBtn.addEventListener("click",(e)=>{
    if(offset + limit < 1025){
        if(loading) return;
    offset+=50
    filterPokes(searchQuery)
    }
})
function capitalize(string){
    if(string.length === 0){
        return ""
    } else {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }
}
Form.addEventListener("submit", async (event)=>{
    if(loading) return;
    offset = 0
    event.preventDefault();
    searchQuery = Input.value
    filterPokes(searchQuery)
})
mainContainer.addEventListener("click",(e)=>{
    if(e.target.closest(".pokeDiv")){
        overlay.classList.remove("hidden")
        sidePanel.parentElement.classList.add("sidePanelAnimate")
        loadSidePanel(e.target.closest(".pokeDiv").dataset.id)

    }
})

overlay.addEventListener("click",(e)=>{
    if(!e.target.closest(".sidePanel")){
        audioPlink.pause()
        audioPlink.currentTime=0
        pokeCry.pause()
        pokeCry.currentTime=0
        overlay.classList.add("hidden")
    }

})
function cerearNumero(numero, nCaracteres){
    let lenNumero = String(numero).length
    nCeros = nCaracteres - lenNumero
    return numeroCereado = "0".repeat(nCeros) + numero

}
function loadSidePanel(pokeData){
    pokeData = JSON.parse(pokeData)

    audioPlink.play()
    pokeCry.src = pokeData.cries.latest
    pokeCry.play()

    pokeProfileImg.src= pokeData.sprites.other["official-artwork"].front_default
    pokeProfileName.textContent = capitalize(pokeData.species.name)
    pokeProfileId.textContent = "#" + cerearNumero(pokeData.id, 4)
}

cryBtn.addEventListener("click",()=>{
    pokeCry.play()
})