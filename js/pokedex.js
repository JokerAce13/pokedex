import { getPokemon, getSpecies } from "./api.js";
import { createRadarChart } from "./charts.js";

const $pokemonImg = document.getElementById('pokemon-img')
const $pokemonName = document.getElementById('pokemon-name')
const $pokemonDescription = document.getElementById('pokemon-description')
const $speechLight = document.getElementById('speech-light')

export function setImagen(imageUrl){
    $pokemonImg.src = imageUrl
}

function setDescription(name, description){
    $pokemonName.textContent = name
    $pokemonDescription.textContent = description
}

const $screenSafeArea = document.getElementById('screen-safeArea')

function loader(isLoading = false){
    const loaderImg = isLoading ? 'url(./images/loading.gif)' : ''
    $screenSafeArea.style.backgroundImage = loaderImg
}

export async function findPokemon(id) {
    const pokemon = await getPokemon(id)
    if(pokemon === null) {
        return {
            id: id,
            name: null,
            sprites: ['./images/pokeball.png'],
            description: 'El pokémon seleccionado no existe'
        }
    }
    const species = await getSpecies(id)
    const description = species.flavor_text_entries.find((flavor) => flavor.language.name === 'es')

    const sprites = [pokemon.sprites.front_default]
    for(const item in pokemon.sprites){
        if(pokemon.sprites[item] && item !== 'other' && item !== 'versions' && item !== 'front_default'){
            sprites.push(pokemon.sprites[item])
        }
    }

    const stats = pokemon.stats.map(item => item.base_stat)

    return {
        id: pokemon.id,
        name: pokemon.name,
        sprites: sprites,
        description: description?.flavor_text === undefined ? 'No existe descripción para el pokémon seleccionado' : description?.flavor_text,
        stats: stats
    }
}

let currentChart = null

export async function setPokemon(id) {
    loader(true)
    const pokemon = await findPokemon(id)
    loader(false)
    setImagen(pokemon.sprites[0])
    setDescription(pokemon.name, pokemon.description)
    speech(`${pokemon.name}. ${pokemon.description}`)
    if (currentChart instanceof Chart) {
        currentChart.destroy()
    }
    currentChart = createRadarChart(pokemon.stats)
    return pokemon
}

function speech(text){
    const utterance = new SpeechSynthesisUtterance(text)
    speechSynthesis.cancel(utterance)
    utterance.lang = 'es'
    $speechLight.classList.add('is-animated')
    speechSynthesis.speak(utterance)

    utterance.addEventListener('end', () => {
        $speechLight.classList.remove('is-animated')
    })
}