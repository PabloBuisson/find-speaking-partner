<template>
  <button v-if="!link" :class="mode" class="button-action">
    <slot></slot>
  </button>
  <RouterLink v-else :to="to" :class="mode" class="button-action">
    <slot></slot>
  </RouterLink>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    mode: {
      type: String,
      required: false,
      default: null,
    },
    link: {
      type: Boolean,
      required: false,
      default: false,
    },
    to: {
      type: String,
      required: false,
      default: "/",
    },
  },
});
</script>

<style scoped>
button,
a {
  font: inherit;
}

.button-action {
  background-color: var(--color-action);
  color: white;
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  border-radius: 1.25rem;
  display: inline-block;
  cursor: pointer;
  border: none;
}

a:hover,
a:active,
button:hover,
button:active {
  background-color: var(--color-action-dark);
}

.flat {
  background-color: transparent;
  color: var(--color-action-dark);
  border: none;
}

.outline {
  background-color: transparent;
  border: 0.1rem solid var(--color-action-soft);
  color: var(--color-action-dark);
}

.flat:hover,
.flat:active,
.outline:hover,
.outline:active {
  background-color: var(--color-action-soft);
}
</style>
