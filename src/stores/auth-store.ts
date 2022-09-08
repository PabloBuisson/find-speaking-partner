import { defineStore } from "pinia";

interface State {
  userId: string | null;
  token: string | null;
  didAutoLogout: boolean;
}

export const useAuthStore = defineStore("partners", {
  state: (): State => ({
    userId: null,
    token: null,
    didAutoLogout: false,
  }),
  getters: {
    userId(state): string | null {
      return state.userId;
    },
    token(state): string | null {
      return state.token;
    },
    isAuthenticated(state): boolean {
      return !!state.token;
    },
    didAutoLogout(state): boolean {
      return state.didAutoLogout;
    },
  },
  actions: {
    // no context as first argument, use `this` instead
    async login(payload: any) {
      //TODO
    },
    async signup(payload: any) {
      //TODO
    },
    async auth(payload: any) {
      //TODO
    },
    tryLogin() {
      //TODO
    },
    logout() {
      //TODO
    },
    autoLogout() {
      //TODO
    },
    // mutations can now become actions,
    // instead of `state` as first argument use `this`
    setUser(payload: { token: string; userId: string }) {
      this.token = payload.token;
      this.userId = payload.userId;
      this.didAutoLogout = false;
    },
    setAutoLogout() {
      this.didAutoLogout = true;
    },
    // easily reset state using `$reset`
    clearStore() {
      this.$reset();
    },
  },
});
