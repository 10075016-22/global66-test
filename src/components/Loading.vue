<template>
  <div class="loading-container">
    <div class="loading">
      <Pokeball class="pokeball" />
      <div class="shadow"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Pokeball from '@/components/Pokeball.vue';
</script>

<style lang="scss" scoped>
.loading-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: relative;
}

.loading {
  position: relative;
  text-align: center;
  animation: spinAndJump 4s linear infinite;
}

.pokeball {
  display: inline-block;
  width: 100px; 
  height: 100px;
}

.shadow {
  width: 100px;
  height: 20px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  position: absolute;
  bottom: -25px; 
  animation: shadowScale 4s linear infinite;
}

@keyframes spinAndJump {
  0% { transform: rotate(0deg) translateY(0); }
  50% { transform: rotate(360deg) translateY(0); }
  60% { transform: rotate(360deg) translateY(-20px); }
  70% { transform: rotate(360deg) translateY(0); }
  80% { transform: rotate(360deg) translateY(-20px); }
  90% { transform: rotate(360deg) translateY(0); }
  100% { transform: rotate(360deg) translateY(0); }
}

@keyframes shadowScale {
  0%, 50%, 100% { transform: scale(1); opacity: 0; }
  60%, 80% { transform: scale(0.8); opacity: 1; }
}
</style>
