<template>
  <span class="badge" :class="type">
    {{ text }}
  </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: ["type", "title"],
  computed: {
    text(): string {
      return this.title.toUpperCase();
    },
  },
});
</script>

<style scoped>
.badge {
  border: 0.125rem solid grey;
  border-radius: 0.25rem;
  padding: 0.5rem 1.5rem;
  display: inline-block;
  margin-right: 0.5rem;
}
.native {
  border-color: white;
  color: var(--color-background, green);
  background-color: var(--color-background-light, lightgreen);
}
.practice {
  border-color: white;
  color: var(--color-action, red);
  background-color: var(--color-action-light, lightpink);
}
</style>