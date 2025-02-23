<template>
    <div class="container">
        <div>
            <div class="flex flex-col items-center justify-center min-h-screen text-center">
                <img :src="pikachu" alt="Pikachu" class="mb-15" />
                <h1 class="text-2xl text-gray-800 font-bold">Welcome to Pokédex</h1>
                <p class="text-lg mt-6 max-w-xl typography-paragraph">
                    The digital encyclopedia created by Professor Oak is an invaluable tool to Trainers in the Pokémon
                    world.
                </p>
                <button class="mt-13 px-4 py-2 bg-red-500 text-white text-lg font-semibold rounded-full shadow-md hover:bg-red-600 transition" @click="onGetStarted">
                    Get started
                </button>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
import pikachu from "@/assets/pikachu.svg";

const router = useRouter()
const onGetStarted = () => {
    router.replace({name: 'dashboard'})
}

</script>
<style lang="scss" scoped>
.typography-paragraph {
    line-height: 1.688rem;
    color: #5E5E5E;
    font-weight: 500 !important;
}
</style>