<template>
  <header>
    <nav>
      <h1>
        <RouterLink to="/">Find a Speaking Partner</RouterLink>
      </h1>
      <ul>
        <li>
          <RouterLink to="/partners">Partners</RouterLink>
        </li>
        <li v-if="isLoggedIn">
          <RouterLink to="/requests">Requests</RouterLink>
        </li>
        <li v-else>
          <RouterLink to="/auth">Login</RouterLink>
        </li>
        <li v-if="isLoggedIn">
          <BaseButton
            style="background-color: var(--color-background, black)"
            @click="logout"
            >Logout</BaseButton
          >
        </li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts">
import { useAuthStore } from "@/stores/auth-store";
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const authStore = useAuthStore();

    return { authStore };
  },
  computed: {
    isLoggedIn(): boolean {
      return this.authStore.isAuthenticated;
    },
  },
  methods: {
    logout() {
      this.authStore.logout();
      this.$router.replace("/partners");
    },
  },
});
</script>

<style scoped>
header {
  width: 100%;
  height: 5rem;
  background-color: var(--color-background, black);
  display: flex;
  justify-content: center;
  align-items: center;
}
header a {
  text-decoration: none;
  color: var(--color-background-mute, white);
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border: 0.1rem solid transparent;
}
a:active,
a:hover,
a.router-link-active {
  border: 0.1rem solid var(--color-background-soft, white);
}
h1 {
  margin: 0;
}
h1 a {
  color: white;
  margin: 0;
}
h1 a:hover,
h1 a:active,
h1 a.router-link-active {
  border-color: transparent;
}
header nav {
  width: 90%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
header ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
li {
  margin: 0 0.5rem;
}
</style>
