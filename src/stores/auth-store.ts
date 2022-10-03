import { defineStore } from "pinia";

interface State {
  _userId: string | null;
  _token: string | null;
  _didAutoLogout: boolean;
}

enum AuthMode {
  Login = "login",
  SignUp = "signup",
}

let timer;

export const useAuthStore = defineStore("auth", {
  state: (): State => ({
    _userId: null,
    _token: null,
    _didAutoLogout: false,
  }),
  getters: {
    userId(state): string | null {
      return state._userId;
    },
    token(state): string | null {
      return state._token;
    },
    isAuthenticated(state): boolean {
      return !!state._token;
    },
    didAutoLogout(state): boolean {
      return state._didAutoLogout;
    },
  },
  actions: {
    // no context as first argument, use `this` instead
    async login(payload: any) {
      return this.auth({
        ...payload,
        mode: AuthMode.Login,
      });
    },
    async signup(payload: any) {
      return this.auth({
        ...payload,
        mode: AuthMode.SignUp,
      });
    },
    async auth(payload: any) {
      const mode = payload.mode;

      //TODO

      const expiresIn = new Date().getMilliseconds() * 999999999999999;
      const expirationDate = new Date().getTime() + expiresIn;

      localStorage.setItem("token", `${new Date().getTime()}`);
      localStorage.setItem("userId", `${new Date().getTime()}`);
      localStorage.setItem("tokenExpiration", `${expirationDate}`);

      timer = setTimeout(() => {
        this.autoLogout();
      }, expiresIn);

      this.setUser({
        token: `${new Date().getTime()}`,
        userId: `${new Date().getTime()}`,
      });
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
      this._token = payload.token;
      this._userId = payload.userId;
      this._didAutoLogout = false;
    },
    setAutoLogout() {
      this._didAutoLogout = true;
    },
    // easily reset state using `$reset`
    clearStore() {
      this.$reset();
    },
  },
});
