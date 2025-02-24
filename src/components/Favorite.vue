<template>
  <span class="pokemon-item__is-fav" :id="`favorite_${pokemon.name}`" :class="{ active: pokemon.isFavorite }" @click="markFavorite(pokemon)">
    <svg
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.6052 0.904438L8.43178 7.62704L1.33161 8.70855C0.0583408 8.9015 -0.451939 10.5415 0.471424 11.4809L5.60824 16.7107L4.39329 24.0984C4.1746 25.4338 5.52076 26.4341 6.64824 25.8096L13 22.3213L19.3518 25.8096C20.4792 26.429 21.8254 25.4338 21.6067 24.0984L20.3918 16.7107L25.5286 11.4809C26.4519 10.5415 25.9417 8.9015 24.6684 8.70855L17.5682 7.62704L14.3948 0.904438C13.8262 -0.293851 12.1787 -0.309084 11.6052 0.904438Z"
        fill="currentColor"
      />
    </svg>
  </span>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { type Pokemon } from '@/types/pokemon.ts'

const emit = defineEmits(['onFavorite']);
const props = defineProps({
  pokemon: {
    type: Object as () => Pokemon,
    required: true,
  },
});

const pokemon = ref<Pokemon>(props.pokemon);

const markFavorite = (pokemon: Pokemon) => {
  pokemon.isFavorite = !pokemon.isFavorite;
  emit('onFavorite', pokemon);
};
</script>
<style lang="scss" scoped>
.pokemon {
  &-list {
    display: flex;
    flex-direction: column;
    grid-gap: 10px;
    max-width: 570px;
    margin: auto;
    overflow: auto;
    margin-bottom: 15px;
    height: calc(100vh - 220px);
    padding: 0 20px;
  }
  &-layout {
    &__filter {
      display: block;
      padding: 18px;
      box-shadow: 0px -5px 4px rgba(0, 0, 0, 0.05);
    }
    &__contentBtn {
      display: grid;
      max-width: 570px;
      margin: auto;
      grid-template-columns: 1fr 1fr;
      grid-gap: 20px;
    }
  }
  &-item {
    background: #fff;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 20px;
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover {
      box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.04);
    }
    &__name {
      font-weight: 500;
      font-size: 22px;
      text-transform: capitalize;
    }
    &__is-fav {
      background-color: #f5f5f5;
      width: 44px;
      height: 44px;
      color: #BFBFBF;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      transition: all 0.3s ease;
      &:hover {
        transform: scale(1.1);
      }
    }
    &:hover {
      transform: scale(1.1);
    }
  }
}
.active {
  color: #ECA539 !important;
}
</style>