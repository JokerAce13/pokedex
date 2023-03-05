const BASE_API = 'https://pokeapi.co/api/v2/'

export async function getPokemon(id){
    const response = await fetch(`${BASE_API}pokemon/${id}/`)
    if (!response.ok) return null
    const data = await response.json()
    return data
}

export async function getSpecies(id){
    const response = await fetch(`${BASE_API}pokemon-species/${id}/`)
    if (!response.ok) return null
    const data = await response.json()
    return data
}