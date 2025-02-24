<template>
    <TransitionRoot as="template" :show="open">
        <Dialog class="relative z-10" @close="open = false" :id="`dialog_${selectedPokemon?.name}`">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-gray-500/75 transition-opacity" />
            </TransitionChild>

            <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                        <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 md:w-130 w-11/12">
                            <!-- Close Button -->
                            <button @click="open = false" class="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-700 bg-transparent rounded-full p-1.5 cursor-pointer">
                                <svg data-v-5d5295f8="" width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg"><path data-v-5d5295f8="" d="M13 0C5.81855 0 0 5.81855 0 13C0 20.1815 5.81855 26 13 26C20.1815 26 26 20.1815 26 13C26 5.81855 20.1815 0 13 0ZM19.3742 16.4125C19.6206 16.6589 19.6206 17.0573 19.3742 17.3036L17.2984 19.3742C17.052 19.6206 16.6536 19.6206 16.4073 19.3742L13 15.9355L9.5875 19.3742C9.34113 19.6206 8.94274 19.6206 8.69637 19.3742L6.62581 17.2984C6.37944 17.052 6.37944 16.6536 6.62581 16.4073L10.0645 13L6.62581 9.5875C6.37944 9.34113 6.37944 8.94274 6.62581 8.69637L8.70161 6.62056C8.94798 6.37419 9.34637 6.37419 9.59274 6.62056L13 10.0645L16.4125 6.62581C16.6589 6.37944 17.0573 6.37944 17.3036 6.62581L19.3794 8.70161C19.6258 8.94798 19.6258 9.34637 19.3794 9.59274L15.9355 13L19.3742 16.4125Z" fill="white"></path>
                                </svg>
                            </button>
                            <!-- Cover Section -->
                            <div class="bg-cover bg-center bg-no-repeat bg-cover-image px-4 pt-2 pb-4 sm:p-6 sm:pb-4">
                                <div>
                                    <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <div>
                                            <img :src="selectedPokemon?.sprites.other['official-artwork'].front_default" :alt="selectedPokemon?.name" class="pokemon-image">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- Data Section -->
                            <div class="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div>
                                    <div class="mt-3 text-left">
                                        <div class="mt-2 details-container">
                                            <p class="typography-paragraph"><span class="text-lg font-bold">Name:</span> {{ selectedPokemon?.name }}</p>
                                            <p class="typography-paragraph"><span class="text-lg font-bold">Weight:</span> {{ selectedPokemon?.weight }}</p>
                                            <p class="typography-paragraph"><span class="text-lg font-bold">Height:</span> {{ selectedPokemon?.height }}</p>
                                            <p class="typography-paragraph"><span class="text-lg font-bold">Types:</span> {{ cmpTypesSelected }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- Buttons Section -->
                            <div class="bg-gray-50 px-4 py-3 sm:flex sm:justify-between sm:px-6 flex justify-between items-center">
                                <button class="w-70 py-2 px-5 me-2 mb-2 font-medium text-white text-lg font-semibold rounded-full shadow-md transition cursor-pointer flex justify-center items-center hover-all ml-3 bg-red-500" @click="onCopyClipboard" id="CopyClipboard">
                                    {{ message }}
                                </button>
                                <button class="inline-flex justify-center rounded-md px-3 py-2 font-semibold text-gray-900 cursor-pointer">
                                    <FavoriteIcon :pokemon="props.pokemon" class="mb-3" />
                                </button>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import FavoriteIcon from '@/components/Favorite.vue';
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { usePokemon } from '@/composables/usePokemon'
import { type Pokemon } from '@/types/pokemon.ts'

const { onGetPokemonDetail, selectedPokemon, cmpTypesSelected } = usePokemon()

const emit = defineEmits(['onClose'])
const props = defineProps({
    pokemon: {
        type: Object as () => Pokemon,
        default: () => ({})
    }
})
const open = ref(true)
const message = ref<String>('Share to my friends!')

onMounted(async () => {
   await onGetPokemonDetail(props.pokemon?.name)
//    document.activeElement?.blur();
})

const onCopyClipboard = () => {
    const pokemonDetails = `Name: ${selectedPokemon.value?.name}, Weight: ${selectedPokemon.value?.weight}, Height: ${selectedPokemon.value?.height}, Types: ${cmpTypesSelected.value}`;
    navigator.clipboard.writeText(pokemonDetails).then(() => {
        message.value = 'Copied to clipboard!';
        setTimeout(() => message.value = 'Share to my friends!', 2000);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
}


watch(() => open.value, (value) => {
    if (!value) emit('onClose')
})
</script>

<style lang="scss" scoped>
.bg-cover-image {
    background-image: url('@/assets/cover.png');
    background-size: cover;
    background-position: center;
}
.pokemon-image {
    width: 180px;
    height: 180px;
    margin: auto;
    max-width: 100%;
}
.typography-paragraph {
    color: #5E5E5E;
}
@media (max-width: 640px) {
    .sm\:items-center {
        align-items: center !important;
    }
    .sm\:p-0 {
        padding: 0 !important;
    }
    .sm\:my-8 {
        margin-top: 2rem !important;
        margin-bottom: 2rem !important;
    }
    .sm\:w-full {
        width: 100% !important;
    }
    .sm\:max-w-lg {
        max-width: 100% !important;
    }
}
.icon-button {
    width: 22px;
    height: 22px;
}
.details-container {
    width: 90%;
    margin: auto;
    .typography-paragraph {
        border-bottom: 1px solid #E5E5E5;
        padding: 8px 0;
    }
}
</style>
