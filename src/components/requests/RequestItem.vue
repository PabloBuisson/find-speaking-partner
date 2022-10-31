<template>
  <li>
    <div>
      <a :href="emailLink">{{ email }}</a>
    </div>
    <p>{{ message }}</p>
  </li>
</template>

<script lang="ts">
export default {
  props: ['email', 'message'],
  computed: {
    emailLink() {
      return 'mailto:' + this.email;
    }
  }
}
</script>

<style scoped>
li {
  margin: 1rem 0;
  border: 0.1rem solid var(--color-border, #ccc);
  padding: 1rem;
}
a {
  color: var(--color-background, green);
  text-decoration: none;
  font-weight: bold;
}
a:hover,
a:active {
  color: var(--color-background, green);
  text-decoration: underline 0.1rem var(--color-background, green);
}
p {
  margin: 0.5rem 0 0 0;
}
</style>