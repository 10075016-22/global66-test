<template>
    <div class="footer-content">
        <div class="actions">
            <button :class="['w-70 py-2 px-5 me-2 mb-2 font-medium text-white text-lg font-semibold rounded-full shadow-md transition cursor-pointer flex justify-center items-center hover-all', selectedButton === 'all' ? 'bg-red-500' : 'bg-[#BFBFBF]']" @click="selectButton('ALL')">
                <img :src="ListIcon" class="mr-3 icon-button"/> All
            </button>
            <button :class="['w-70 py-2 px-5 me-2 mb-2 font-medium text-white text-lg font-semibold rounded-full shadow-md transition cursor-pointer flex justify-center items-center ', selectedButton === 'favorites' ? 'bg-red-500' : 'bg-[#BFBFBF]']" @click="selectButton('FAVORITES')">
                <img :src="FavoriteIcon" class="mr-3 icon-button"/> Favorites
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import ListIcon from '@/assets/list.svg';
import FavoriteIcon from '@/assets/favorite.svg';

const props = defineProps({
    selectedButton: {
        type: String,
        default: 'all'
    }
});

const emit = defineEmits(['onSelectedButton']);

const selectButton = (button: string) => {
    emit('onSelectedButton', button);
};
</script>

<style lang="scss" scoped>
.footer-content {
    display: block;
    padding: 18px;
    box-shadow: 0px -5px 4px rgba(0, 0, 0, 0.05);
    text-align: center;

    .actions {
        display: grid;
        max-width: 570px !important;
        margin: auto;
        grid-template-columns: 1fr 1fr;
    }
}

.icon-button {
    width: 22px;
    height: 22px;
}

@media (max-width: 768px) {
    .footer-content {
        padding: 12px;
        .actions {
            grid-template-columns: 1fr 1fr;
            gap: 10px;
        }
        button {
            width: 100%;
            padding: 10px;
        }
    }
}
.hover-all:hover {
    background-color: #C00E20 !important;
    transition: background-color 0.5s ease;
}
</style>
