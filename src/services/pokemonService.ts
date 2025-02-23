import axios from "axios";

const baseUrl = "https://pokeapi.co/api/v2/pokemon";

const getPokemonList = async (limit?: number, offset?: number) => {
    let url = baseUrl;
    if (limit && offset) {
        url = `${baseUrl}?limit=${limit}&offset=${offset}`;
    }
    const { data } = await axios.get(`${url}`);
    return data;
}

const getPokemon = async (name: string) => {
    const { data } = await axios.get(`${baseUrl}/${name}`);
    return data;
}

export {
    getPokemonList,
    getPokemon
};