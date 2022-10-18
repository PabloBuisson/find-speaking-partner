<script setup lang="ts">
import { RouterView } from "vue-router";
import TheHeader from "./components/layout/TheHeader.vue";
import { useAuthStore } from "./stores/auth-store";

// Because setup is run around the beforeCreate and created lifecycle hooks, 
// you do not need to explicitly define them. 
// In other words, any code that would be written inside those hooks 
// should be written directly in the setup function.
const authStore = useAuthStore();
authStore.tryLogin();


</script>

<template>
  <TheHeader />
  <RouterView v-slot="slotProps">
    <Transition name="route" mode="out-in">
      <component :is="slotProps.Component"></component>
    </Transition>
  </RouterView>
</template>

<style>
.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}
.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.route-enter-active {
  transition: all 0.3s ease-out;
}
.route-leave-active {
  transition: all 0.3s ease-in;
}
.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
