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
        const shinyVfx = document.getElementById("shinyVfx")
    const pokeProfileName = document.getElementById("pokeProfileName")
    const pokeProfileId = document.getElementById("pokeProfileId")
    const cryBtn = document.getElementById("cryBtn")
    const shinyBtn = document.getElementById("shinyBtn")

const audioPlink = new Audio("plink.mp3")
const pokeCry = new Audio
    pokeCry.volume= 0.4
const pokeShiny = new Audio("shinySfx.mp3")
const pokeDeShiny = new Audio("deShinySfx.mp3")

let squishTimeout;
let shinyTimeout;

let loading = false
let allPokes;
fetchPokes()
let tempPokeData
let searchQuery = ""
let shinyActive = false

let offset = 0
let limit = 50
async function fetchPokes() {
    loading = true
    if(localStorage.getItem("pokesData") === null){
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=1025`)
        allPokes = (await response.json()).results;
    localStorage.setItem("pokesData",JSON.stringify(allPokes))
    } else {
        allPokes = JSON.parse(localStorage.getItem("pokesData"))
    }
    loading = false
}



async function filterPokes(name) {
    loading = true
    let filteredPokes = allPokes.filter(poke=>poke.name.includes(name))
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
        pokeDiv.dataset.id = pokeData.id
        pokeDiv.append(pokeTypeDiv)
        mainContainer.append(pokeDiv)
    }
    
}
prevBtn.addEventListener("click",(e)=>{
    if(offset !== 0){
        if(loading) return;
    offset-=50
    pageDiv.textContent= "Page " + (1 + (offset/50 || 0))
    filterPokes(searchQuery)
    }
})
nextBtn.addEventListener("click",(e)=>{
    if(offset + limit < 1025){
        if(loading) return;
    offset+=50
    pageDiv.textContent= "Page "  + (1 + (offset/50 || 0))
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
        stopAudio(audioPlink)
        stopAudio(pokeCry)
        stopAudio(pokeShiny)
        stopAudio(pokeDeShiny)
        overlay.classList.add("hidden")
    }

})
function cerearNumero(numero, nCaracteres){
    let lenNumero = String(numero).length
    let nCeros = nCaracteres - lenNumero
    return "0".repeat(nCeros) + numero

}
async function loadSidePanel(id){
    shinyActive = false
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    const pokeData = await response.json()
    tempPokeData = pokeData
    audioPlink.play()
    pokeCry.src = pokeData.cries.latest || "fallbackCry.mp3"
    pokeCry.onerror = () => {
        pokeCry.src = "fallbackCry.mp3"}
    
    pokeProfileImg.src= pokeData.sprites.other["official-artwork"].front_default
    pokeProfileName.textContent = capitalize(pokeData.species.name)
    pokeProfileId.textContent = "#" + cerearNumero(pokeData.id, 4)
    pokeCry.play()
}

cryBtn.addEventListener("click",()=>{
    pokeCry.play()
})
shinyBtn.addEventListener("click",()=>{
    if(!tempPokeData) return;
    shinyActive = !shinyActive

    pokeProfileImg.src = shinyActive
        ? showShiny()
        : showDefault()
})
function stopAudio(audio){
    audio.pause()
    audio.currentTime = 0
}
function showShiny(){
    shinyVfx.classList.remove("hidden")
    shinyVfx.src="shinySparkleVfx.gif?" + Date.now()
    if(shinyTimeout){
        clearTimeout(shinyTimeout)
    }
    shinyTimeout = setTimeout(() => {
        shinyVfx.classList.add("hidden")
    }, 900);
    pokeShiny.play()
    stopAudio(pokeDeShiny)
    return tempPokeData.sprites.other["official-artwork"].front_shiny
}
function showDefault(){
    shinyVfx.classList.add("hidden")
    pokeProfileImg.classList.add("squish")
    if(squishTimeout){
        clearTimeout(squishTimeout)
    }
    squishTimeout = setTimeout(() => {
        pokeProfileImg.classList.remove("squish")
    }, 500);
    pokeDeShiny.play()
    stopAudio(pokeShiny)
    return tempPokeData.sprites.other["official-artwork"].front_default
}
filterPokes("")