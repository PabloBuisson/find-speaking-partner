import { defineStore } from "pinia";
import { useAuthStore } from "./auth-store";

interface State {
  _requests: Request[];
}

interface Request {
  id: string | number;
  partnerId: string | number;
  userEmail: string;
  message: string;
}

export const useRequestsStore = defineStore("requests", {
  state: (): State => ({
    _requests: [],
  }),
  getters: {
    requests(state: State): Request[] {
      const authStore = useAuthStore();
      const partnerId = authStore.userId;
      return state._requests.filter((req) => req.partnerId === partnerId);
    },
    hasRequests(): boolean {
      return this.requests != null && this.requests.length > 0;
    },
  },
  actions: {
    // no context as first argument, use `this` instead
    async contactPartner(payload: {
      email: string;
      message: string;
      partnerId: string;
    }) {
      const newRequest: Partial<Request> = {
        userEmail: payload.email,
        message: payload.message,
      };

      const response = await fetch(
        `${import.meta.env.VITE_FIREBASE_URL}/requests/${
          payload.partnerId
        }.json`,
        {
          method: "POST",
          body: JSON.stringify(newRequest),
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        const error = new Error(
          responseData.message || "Failed to send request."
        );
        throw error;
      }

      newRequest.id = responseData.name;
      newRequest.partnerId = payload.partnerId;

      this.addRequest(newRequest as Request);
    },
    async fetchRequests() {
      const authStore = useAuthStore();
      const partnerId = authStore._userId;
      const token = authStore._token;
      // TODO
      const response = await fetch(
        `${
          import.meta.env.VITE_FIREBASE_URL
        }/requests/${partnerId}.json?auth=${token}`
      );
      const responseData = await response.json();

      if (!response.ok) {
        const error = new Error(
          responseData.message || "Failed to fetch requests."
        );
        throw error;
      }

      const requests: Request[] = [];

      for (const key in responseData) {
        const request: Request = {
          id: key,
          partnerId: partnerId as string,
          userEmail: responseData[key].userEmail,
          message: responseData[key].message,
        };
        requests.push(request);
      }

      this.setRequests(requests);
    },
    addRequest(payload: Request) {
      this._requests.push(payload);
      console.log(this._requests.length);
    },
    setRequests(payload: Request[]) {
      this._requests = payload;
    },
    // easily reset state using `$reset`
    clearStore() {
      this.$reset();
    },
  },
});
