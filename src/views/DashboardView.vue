<template>
    <div v-if="loading">
        <Loading />
    </div>
    <div class="h-screen" v-else>
        <div class="container">
            <Search @onSearch="onSearch"/>
        </div>
        <List :data="cmpListFiltered" @onFavorite="onFavorite" :key="nKeyRef"/>
        <Footer 
            v-if="cmpListFiltered.length > 0"
            :selectedButton="selectedButton"
            @onSelectedButton="onSelectedButton" 
        />
    </div>
</template>
<script setup lang="ts">
import Search from '@/components/dashboard/Search.vue'
import List from '@/components/dashboard/List.vue'
import Footer from '@/components/dashboard/Footer.vue'
import Loading from '@/components/Loading.vue'

import type { Pokemon } from '@/types/pokemon'

import { usePokemon } from '@/composables/usePokemon'
import { onMounted, ref} from 'vue'

const { 
    onLoadPokemonList, 
    cmpListFiltered, 
    loading, 
    pokemonList, 
    selectedButton, 
    search 
} = usePokemon()

onMounted(() => onLoadPokemonList())
const nKeyRef = ref(0)

const onSelectedButton = (button: string) => {
    selectedButton.value = button;
    nKeyRef.value++    
}

const onSearch = (letters: String) => {
    search.value = letters.toLowerCase()
    nKeyRef.value++    
}

const onFavorite = (pokemon: Pokemon) => {
    const index = pokemonList.value.findIndex((item: Pokemon) => item.name === pokemon.name)
    pokemonList.value[index] = pokemon

}

</script>
<style lang="scss" scoped>
.h-screen {
    min-height: calc(100vh - 35px);
    margin: auto;
    top: 35px;
    position: relative;
}
</style>