const Form = document.getElementById("pokeForm")
const Input = document.getElementById("pokeInput")
const Container = document.getElementById("mainContainer")

async function fetchAllPokes() {
    let response = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=1025")
    let allPokes = await response.json();
    return allPokes
}

async function filterPokes() {
    let filteredPokes = await fetchAllPokes
    return filteredPokes
}

async function showPokes() {
    
}

console.log(filterPokes())