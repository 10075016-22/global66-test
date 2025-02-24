export interface Pokemon {
    name: string;
    url: string;
    isFavorite: boolean;
}

interface Type {
    slot: number
    type: {
        name: string
        url: string
    }
}

interface Sprites {
    back_default ?: string,
    other: {
        dream_world: {
            front_default: string
        },
        'official-artwork': {
            front_default: string
        }
    }
}

export interface PokemonDetail {
    id: number;
    abilities: { ability: { name: string } }[];
    name: string;
    weight: number;
    height: number;
    sprites: Sprites;
    stats: Array<any>;
    types: Array<Type>;
}