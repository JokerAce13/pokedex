import './charts.js'
import { setPokemon, setImagen } from "./pokedex.js";

const $form = document.getElementById('form')
const $searchBar = document.getElementById('search-bar')
const $pokedex = document.getElementById('pokedex')
const $nextPokemon = document.getElementById('next-pokemon')
const $prevPokemon = document.getElementById('prev-pokemon')
const $nextVariant = document.getElementById('next-variant')
const $prevVariant = document.getElementById('prev-variant')
const $randomPokemon = document.getElementById('random-pokemon')

$form.addEventListener('submit', handleSubmit)
$nextPokemon.addEventListener('click', handleNextPokemon)
$prevPokemon.addEventListener('click', handlePrevPokemon)
$nextVariant.addEventListener('click', handleNextVariant)
$prevVariant.addEventListener('click', handlePrevVariant)
$randomPokemon.addEventListener('click', handleRandomPokemon)

let pokemonSelected = null

// handleRandomPokemon();

async function handleSubmit(event){
    event.preventDefault();
    // $pokedex.classList.add('is-open')
    const form = new FormData($form)
    const id = form.get('id')
    console.log(id)
    if(id !== ''){
        pokemonSelected = await setPokemon(id)
    }
}

async function handleNextPokemon(){
    const id = (pokemonSelected === null || pokemonSelected.id === 1008) ? 1 : pokemonSelected.id + 1
    $searchBar.value = id
    pokemonSelected = await setPokemon(id)
}

async function handlePrevPokemon(){
    const id = (pokemonSelected === null || pokemonSelected.id === 1) ? 1008 : pokemonSelected.id - 1
    $searchBar.value = id
    pokemonSelected = await setPokemon(id)
}

let spriteSelected = 0

async function handleNextVariant(){
    if (pokemonSelected === null) return false
    const index = spriteSelected >= pokemonSelected.sprites.length - 1 ? 0 : spriteSelected + 1
    spriteSelected = index
    setImagen(pokemonSelected.sprites[index])
}

async function handlePrevVariant(){
    if (pokemonSelected === null) return false
    const index = spriteSelected === 0 ? pokemonSelected.sprites.length - 1 : spriteSelected - 1
    spriteSelected = index
    setImagen(pokemonSelected.sprites[index])
}

async function handleRandomPokemon(){
    const id = getRandomNumber()
    $searchBar.value = id
    pokemonSelected = await setPokemon(id)
}

function getRandomNumber(){
    const LIMIT_MAX = 1008
    const LIMIT_MIN = 1
    return Math.round(Math.random() * (LIMIT_MAX - LIMIT_MIN) + LIMIT_MIN)
}