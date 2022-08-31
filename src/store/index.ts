import { defineStore } from "pinia";

export const useStore = defineStore({
  id: "counter",
  state: () => ({
    counter: 0,
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
    isAuthenticated(state): boolean {
      return false;
    },
  },
  actions: {
    increment() {
      this.counter++;
    },
  },
});
