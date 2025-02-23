<template>
  <div class="input-search">
    <SearchIcon />
    <input placeholder="Search" v-model="search" />
  </div>
</template>
<script setup lang="ts">
import SearchIcon from '@/components/icons/Search.vue';
import { ref, watch } from 'vue';
const emit = defineEmits(['onSearch']);
const search = ref<String>('');

watch(() => search.value, () => {
  emit('onSearch', search.value);
})
</script>

<style lang="scss" scoped>
.input-search {
  margin: auto;
  max-width: 570px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.08);
  border-radius: 5px;
  display: grid;
  grid-template-columns: 50px auto;
  align-items: center;
  margin-bottom: 40px;
  padding: 16px;
  input {
    height: 100%;
    display: block;
    box-sizing: border-box;
    border: none;
    outline: none;
    font-weight: 500 !important;
    font-size: 16px;
    color: #353535;
    font-family: 'Monserrat', sans-serif;
    margin-left: -5px;
  }
}
</style>