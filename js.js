const Form = document.getElementById("pokeForm")
const Input = document.getElementById("pokeInput")
const mainContainer = document.getElementById("mainContainer")
const overlay = document.getElementById("overlay")
const controlsDiv = document.getElementById("controls")
    const prevBtn = document.getElementById("prev")
    const pageDiv = document.getElementById("page")
    const nextBtn = document.getElementById("next")
const sidePanel = document.getElementById("sidePanel")
const sidePanelInfo = document.getElementById("sidePanelInfo")
const pokeProfile = document.getElementById("pokeProfile")
    const pokeProfileImg = document.getElementById("pokeProfileImg")
        const shinyVfx = document.getElementById("shinyVfx")
        const spinner = document.getElementById("loadingSpinner")
            let spinnerTimeOut; 
    const pokeProfileName = document.getElementById("pokeProfileName")
    const pokeProfileId = document.getElementById("pokeProfileId")
    const pokeProfileTypeDiv = document.getElementById("pokeProfileTypeDiv")
    const abilitiesDiv = document.getElementById("abilitiesDiv")
    const typeEfectivenessContainer = document.getElementById("typeEfectivenessContainer")
        const typeEffectivenessDivs = typeEfectivenessContainer.children
        const quadrupleDiv = document.getElementById("quadruple")
        const doubleDiv = document.getElementById("double")
        const singleDiv = document.getElementById("single")
        const halfDiv = document.getElementById("half")
        const quarterDiv = document.getElementById("quarter")
        const inmuneDiv = document.getElementById("inmune")

        

    const hp = document.getElementById("hp")
    const atk = document.getElementById("atk")
    const def = document.getElementById("def")
    const spa = document.getElementById("spa")
    const spd = document.getElementById("spd")
    const spe = document.getElementById("spe")

    const cryBtn = document.getElementById("cryBtn")
    const shinyBtn = document.getElementById("shinyBtn")

const audioPlink = new Audio("plink.mp3")
const pokeCry = new Audio()
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

async function colorPokemon(name) {
    name = name.toLowerCase()
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`)
    let data = await response.json()
    return data.color.name
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
        <div class="pokeImgDiv">
            <img src=${pokeData.sprites.other.dream_world.front_default || 
                        pokeData.sprites.other["official-artwork"].front_default
            } class="pokeImg"></img>
        </div>
        <div class="pokeName">${capitalize(pokeData.species.name)}</div>
        <div class="pokeId">#${cerearNumero(pokeData.id,4)}</div>
        `
        let pokeTypeDiv = document.createElement("div")
        pokeTypeDiv.classList.add("pokeTypeDiv")
        createTypes(getTypes(pokeData),pokeTypeDiv)

        pokeDiv.style.background=`var(--${pokeData.types[0].type.name})`
        if(pokeData.types[1]){
            pokeDiv.style.background=`linear-gradient(to right, var(--${pokeData.types[0].type.name}) 50%, var(--${pokeData.types[1].type.name}) 50%)`
        }
        pokeDiv.dataset.id = pokeData.id
        pokeDiv.append(pokeTypeDiv)
        mainContainer.append(pokeDiv)
    }
    
}
function createTypes(types,div){

    types.forEach(type => {
        let pokeType = document.createElement("div")
        pokeType.classList.add("pokeType")
        pokeType.style.backgroundColor=`var(--${type})`
        pokeType.textContent = capitalize(type)
        div.append(pokeType)
    });
}

function getTypes(data){
    let types=[]
    types.push(data.types[0].type.name)
    if(data.types[1]){
    types.push(data.types[1].type.name)
    }
    return types

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
    pageDiv.textContent="Page " + 1
    event.preventDefault();
    searchQuery = Input.value.toLowerCase().trim().replace(/\s+/g,"-")
    filterPokes(searchQuery)
})
mainContainer.addEventListener("click",(e)=>{
    if(e.target.closest(".pokeDiv")){
        overlay.classList.remove("hidden")
        sidePanelInfo.parentElement.classList.add("sidePanelAnimate")
        loadingImg(pokeProfileImg,false)
        loadSidePanel(e.target.closest(".pokeDiv").dataset.id)

    }
})

function loadingImg(img,delay=true){
    if(delay){
    spinnerTimeOut = setTimeout(() => {
        img.classList.add("hidden")
        spinner.classList.remove("hidden")
    }, 100);
    } else {
        img.classList.add("hidden")
        spinner.classList.remove("hidden")
    }
}
function exitSidePanel(){
    stopAudio(audioPlink)
    stopAudio(pokeCry)
    stopAudio(pokeShiny)
    stopAudio(pokeDeShiny)
    overlay.classList.add("hidden")
}
overlay.addEventListener("click",(e)=>{
    if(e.target !== sidePanel && !e.target.closest("#sidePanelInfo")){
        exitSidePanel()
    }

})

function cerearNumero(numero, nCaracteres){
    let lenNumero = String(numero).length
    let nCeros = nCaracteres - lenNumero
    return "0".repeat(nCeros) + numero

}
async function loadSidePanel(id){
    audioPlink.play()
    shinyActive = false
    pokeProfileTypeDiv.innerHTML=""
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    const pokeData = await response.json()
    tempPokeData = pokeData

    sidePanel.style.backgroundColor = `color-mix(in srgb, ${await colorPokemon(pokeData.name)} 50%, white)`

    pokeCry.src = pokeData.cries.latest || "fallbackCry.mp3"
    pokeCry.onerror = () => {
        pokeCry.src = "fallbackCry.mp3"}
    
    pokeProfileImg.src= pokeData.sprites.other["official-artwork"].front_default|| pokeData.sprites.front_default
    pokeProfileName.textContent = capitalize(pokeData.species.name)
    pokeProfileId.textContent = "#" + cerearNumero(pokeData.id, 4)

    createTypes(getTypes(pokeData),pokeProfileTypeDiv)

    assignStats(getStats(pokeData))
    pokeCry.play()
    createTypeEffectiveness(getTypes(pokeData))
}

cryBtn.addEventListener("click",()=>{
    pokeCry.play()
})
shinyBtn.addEventListener("click",()=>{
    if(!tempPokeData) return;
    shinyActive = !shinyActive

    loadingImg(pokeProfileImg);
    pokeProfileImg.src = shinyActive
        ? tempPokeData.sprites.other["official-artwork"].front_shiny
        : showDefault()
})
function stopAudio(audio){
    audio.pause()
    audio.currentTime = 0
}


function shinyFx(){
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
    return tempPokeData.sprites.other["official-artwork"].front_default|| tempPokeData.sprites.front_default
}
function assignStats(stats){
    hp.textContent=stats[0]
    atk.textContent=stats[1]
    def.textContent=stats[2]
    spa.textContent=stats[3]
    spd.textContent=stats[4]
    spe.textContent=stats[5]

    document.querySelectorAll(".statBarDiv").forEach((e, i) => {
        const bar = e.children[0]
        let progress = (stats[i] / 255) * 100
        bar.style.width=progress + "%"
        barColor(bar,progress)
    });
}

function barColor(bar, progress){

    let statProgress;
    if(progress < 33){
        statProgress = (progress / 33) * 100
        bar.style.backgroundColor=`color-mix(in srgb, var(--stat-low), var(--stat-33) ${statProgress}%)`
    } else if(progress < 66){
        statProgress = ((progress - 33)/33) * 100
        bar.style.backgroundColor=`color-mix(in srgb, var(--stat-33), var(--stat-66) ${statProgress}%)`

    } else if(progress < 99){
        statProgress = ((progress - 66) / 33) * 100
        bar.style.backgroundColor=`color-mix(in srgb, var(--stat-66), var(--stat-max) ${statProgress}%)`
    
    } else {
        bar.style.backgroundColor="var(--stat-max)"
    }
}
function getStats(data){
    let stats = [];
    data.stats.forEach(stat => {
        stats.push(stat.base_stat)
    });
    return stats
}
pokeProfileImg.addEventListener("load", () => {
    spinner.classList.add("hidden")
    pokeProfileImg.classList.remove("hidden")
    clearTimeout(spinnerTimeOut) 
    if (pokeProfileImg.src===tempPokeData.sprites.other["official-artwork"].front_shiny){
        shinyFx()
    }
})

async function getAllTypes() {
    let response = await fetch(`https://pokeapi.co/api/v2/type?limit=18`)
    let typesData = await response.json() 

    let types = []
    typesData.results.forEach(type => {
        types.push(type.name)
    });

    return types
}
async function createTypeEffectiveness(types){
    let type1Effectivenesses = await getTypeEffectiveness(types[0])
    let weaknesses1 = type1Effectivenesses[0]
    let resistances1 = type1Effectivenesses[1]
    let inmunities1 = type1Effectivenesses[2]

    let type2Effectivenesses = []
    if(types[1]){
        type2Effectivenesses = await getTypeEffectiveness(types[1])
    }

    let weaknesses2 = type2Effectivenesses[0] || []
    let resistances2 = type2Effectivenesses[1] || []
    let inmunities2 = type2Effectivenesses[2] || []

    let quadrupleDmg = [] // x4
    let doubleDmg =    [] // x2
    let singleDmg =    [] // x1
    let halfDmg =      [] // x0.5
    let quarterDmg =   [] // x0.25
    let noDmg =        [] // x0 (Inmune)

    let allTypes = await getAllTypes()

    allTypes.forEach(type => {
        let effectiveness = 1
        if(weaknesses1.includes(type)){
            effectiveness *= 2
        }
        if (weaknesses2.includes(type)){
            effectiveness *= 2
        }
        if(resistances1.includes(type)){
            effectiveness *= 0.5
        }
        if(resistances2.includes(type)){
            effectiveness *= 0.5
        }
        if(inmunities1.includes(type) || inmunities2.includes(type)){
            effectiveness *= 0
        }

        switch (effectiveness){
            case 4:
                quadrupleDmg.push(type)
                break
            case 2:
                doubleDmg.push(type)
                break
            case 1:
                singleDmg.push(type)
                break
            case 0.5:
                halfDmg.push(type)
                break
            case 0.25:
                quarterDmg.push(type)
                break
            case 0:
                noDmg.push(type)
                break
        }
    });
    Array.from(typeEffectivenessDivs).forEach(div => {
        div.classList.remove("hidden")
        div.querySelector(".typeEffectiveness").textContent=""
    });

    createTypes(quadrupleDmg,quadrupleDiv)
    createTypes(doubleDmg,doubleDiv)
    createTypes(singleDmg,singleDiv)
    createTypes(halfDmg,halfDiv)
    createTypes(quarterDmg,quarterDiv)
    createTypes(noDmg,inmuneDiv)

    Array.from(typeEffectivenessDivs).forEach(div => {
        if(div.querySelector(".typeEffectiveness").textContent===""){
            div.classList.add("hidden")
        }
    });

}

async function getTypeEffectiveness(type) {
    let response = await fetch(`https://pokeapi.co/api/v2/type/${type}`)
    let typeData = await response.json()
    let typeEffectiveness = []

    let inmunities = []

    typeData.damage_relations.no_damage_from.forEach(type => {
        inmunities.push(type.name)
    });

    let resistances = []

    typeData.damage_relations.half_damage_from.forEach(type => {
        resistances.push(type.name)
    });

    let weaknesses = []

    typeData.damage_relations.double_damage_from.forEach(type => {
        weaknesses.push(type.name)
    });

    typeEffectiveness.push(weaknesses, resistances, inmunities)
    return typeEffectiveness
}

filterPokes("")



