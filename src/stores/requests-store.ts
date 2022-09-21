import { defineStore } from "pinia";
import { useAuthStore } from "./auth-store";

interface State {
  requests: Request[];
}

interface Request {
  id: string | number;
  coachId: string | number;
  userEmail: string;
  message: string;
}

export const useRequestsStore = defineStore("requests", {
  state: (): State => ({
    requests: [],
  }),
  getters: {
    savedRequests(state: State): Request[] {
      const authStore = useAuthStore();
      const coachId = authStore.userId;
      return state.requests.filter((req) => req.coachId === coachId);
    },
    hasRequests(): boolean {
      return this.savedRequests != null && this.savedRequests.length > 0;
    },
  },
  actions: {
    // no context as first argument, use `this` instead
    async contactPartner(payload: {
      email: string;
      message: string;
      partnerId?: string;
    }) {
      const newRequest = {
        userEmail: payload.email,
        message: payload.message,
        partnerId: payload.partnerId
      };
      // TODO
    },
    async fetchRequests() {
      const authStore = useAuthStore();
      const coachId = authStore.userId;
      const token = authStore.token;
      // TODO
      // const response = await fetch(
      //   `https://vue-find-coach-18842-default-rtdb.europe-west1.firebasedatabase.app/requests/${coachId}.json?auth=` +
      //     token
      // );
      // const responseData = await response.json();

      // if (!response.ok) {
      //   const error = new Error(
      //     responseData.message || "Failed to fetch requests."
      //   );
      //   throw error;
      // }

      const requests: Request[] = [];

      // for (const key in responseData) {
      //   const request = {
      //     id: key,
      //     coachId: coachId,
      //     userEmail: responseData[key].userEmail,
      //     message: responseData[key].message,
      //   };
      //   requests.push(request);
      // }

      this.setRequests(requests);
    },
    addRequest(payload: Request) {
      this.requests.push(payload);
    },
    setRequests(payload: Request[]) {
      this.requests = payload;
    },
    // easily reset state using `$reset`
    clearStore() {
      this.$reset();
    },
  },
});
