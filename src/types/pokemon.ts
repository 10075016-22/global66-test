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
    others: {
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
    sprites: Array<Sprites>;
    stats: Array<any>;
    types: Array<Type>;
}