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

let timer: any;

export const useAuthStore = defineStore("auth", {
  state: (): State => ({
    _userId: "p3",
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
      localStorage.setItem("userId", `p3`);
      localStorage.setItem("tokenExpiration", `${expirationDate}`);

      timer = setTimeout(() => {
        this.autoLogout();
      }, expiresIn);

      this.setUser({
        token: `${new Date().getTime()}`,
        userId: `p3`,
      });
    },
    tryLogin() {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      const tokenExpiration = localStorage.getItem("tokenExpiration") ?? "0";

      const expiresIn = parseInt(tokenExpiration) - new Date().getTime();

      if (expiresIn < 0) {
        return;
      }

      timer = setTimeout(() => {
        this.autoLogout();
      }, expiresIn);

      if (token && userId) {
        this.setUser({
          token: token,
          userId: userId,
        });
      }
    },
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("tokenExpiration");

      clearTimeout(timer);

      this.setUser({
        token: null,
        userId: null,
      });
    },
    autoLogout() {
      this.logout();
      this.setAutoLogout();
    },
    // mutations can now become actions,
    // instead of `state` as first argument use `this`
    setUser(payload: { token: string | null; userId: string | null }) {
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
