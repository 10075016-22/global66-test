import { computed, ref } from "vue";
import { getPokemonList, getPokemon } from '@/services/pokemonService.ts'
import { type Pokemon, type PokemonDetail } from '@/types/pokemon.ts'

export const cmpPokemon = () => {
    const pokemonList = ref<Pokemon[]>([]);
    const selectedPokemon = ref<PokemonDetail | null>(null);
    const loading = ref<boolean>(false);
    const selectedButton = ref<String>('ALL')
    const search = ref<String>('')

    const onLoadPokemonList = async () => {
        loading.value = true;
        try {
            const { results } = await getPokemonList();
            pokemonList.value = results.map((pokemon: Pokemon) => {
                return {
                    ...pokemon,
                    isFavorite: false
                }
            });

        } catch (error) {
            console.log(error);            
        } finally {
            setTimeout(() => loading.value = false, 2000);
        }
    }
    
    const onGetPokemonDetail = async (name: string) => {
        loading.value = true;
        try {
            const pokemon = await getPokemon(name);
            selectedPokemon.value = pokemon;
        } catch (error) {
            console.log(error);
        } finally {
            loading.value = false;
        }
    }

    const cmpTypesSelected = computed(() => {
        if (!selectedPokemon.value) return '';
        else {
            return selectedPokemon.value.types.map((type) => type.type.name).join(', ');
        }
    })


    const cmpListFiltered = computed(() => {
        let filteredList = pokemonList.value;

        if (selectedButton.value !== 'ALL') {
            filteredList = filteredList.filter((pokemon) => pokemon.isFavorite);
        }

        if (search.value) {
            filteredList = filteredList.filter((pokemon) =>
                pokemon.name.toLowerCase().includes(search.value.toLowerCase())
            );
        }

        return filteredList;
    });


    return {
        pokemonList,
        selectedPokemon,
        loading,
        selectedButton,
        search,

        cmpTypesSelected,

        onLoadPokemonList,
        onGetPokemonDetail,
        cmpListFiltered
    }

};