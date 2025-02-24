<template>
  <div>
    <ul class="list" v-if="props.data.length > 0">
      <li v-for="(item, index) in props.data" :key="index" class="flex justify-between items-center bg-white rounded-lg list-item" @click="selectedPokemon = item">
        <span class="text-gray-800 font-medium text-item">{{ item.name }}</span>
        <Favorite :pokemon="item" @onFavorite="onFavorite(item)"/>
      </li>
    </ul>
    <div v-else class="flex flex-col items-center justify-center h-full">
      <h1 class="text-center text-4xl font-bold">Uh-oh!</h1>
      <p class="text-center mt-3 text-[#5E5E5E] text-lg">You look lost on your journey!</p>
      <button class="w-40 py-2 mt-5 px-5 me-2 mb-2 font-medium text-white text-lg font-semibold rounded-full shadow-md transition cursor-pointer flex justify-center items-center hover-all  bg-red-500" @click="onGoHome">
        Go back home
      </button>

    </div>
    <ModalPokemon 
      v-if="selectedPokemon !== null" 
      :pokemon="selectedPokemon" 
      @onClose="onClose"
    />
  </div>
</template>
<script setup lang="ts">
import { ref, type PropType } from 'vue';
import { useRouter } from 'vue-router';
import { type Pokemon } from '@/types/pokemon.ts'

// components 
import Favorite from '@/components/Favorite.vue';
import ModalPokemon from '@/components/pokemon/PokemonDetail.vue'

const emit = defineEmits(['onFavorite'])
const router = useRouter()
const props = defineProps({
  data: {
    type: Array as PropType<Pokemon[]>,
    required: true,
  },
})

const onGoHome = () => {
  router.push({ name: 'home' })
}
const selectedPokemon = ref<Pokemon | null>(null)

const onFavorite = (item: Pokemon) => {
  emit('onFavorite', item)
}

const onClose = () => {
  selectedPokemon.value = null
}

</script>
<style lang="scss" scoped>
.list-item {
  border-radius: 5px;
  display: grid;
  grid-template-columns: 1fr 50px;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.05);
  }
  padding: 8px 25px 8px 15px;
}
.text-item {
  font-size: 1.375rem;
  font-weight: 500;
  color: #353535;
  text-transform: capitalize;
}
.list {
  display: flex;
  flex-direction: column;
  grid-gap: 10px;
  max-width: 570px;
  margin: auto;
  overflow: auto;
  margin-bottom: 15px;
  height: calc(100vh - 220px);
  padding: 0px 5px;
  @media (max-width: 768px) {
    padding: 0px 25px;
  }
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #c4c4c4;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #a0a0a0;
  }

  &::-webkit-scrollbar-track {
    background-color: #f1f1f1;
    border-radius: 10px;
  }
}
</style>