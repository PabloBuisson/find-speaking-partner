import { defineStore } from "pinia";

interface State {
  lastFetch: number | null;
  partners: Partner[];
}

interface Partner {
  id: any;
  firstName: string;
  lastName: string;
  pseudo?: string;
  email?: string;
  description: string;
  languagesLearnt: string[];
  languagesWanted: string[];
}

export const usePartnersStore = defineStore("partners", {
  state: (): State => ({
    lastFetch: null,
    partners: [
      {
        id: "p1",
        firstName: "Elon",
        lastName: "Musk",
        languagesLearnt: ["English"],
        languagesWanted: ["French"],
        description: "I'm Elon Musk. What else ?",
      },
      {
        id: "p2",
        firstName: "Pablo",
        lastName: "Buisson",
        languagesLearnt: ["French"],
        languagesWanted: ["English"],
        description: "I'm Pablo and I would like to improve my english !",
      },
    ],
  }),
  getters: {
    partners(state): Partner[] {
      return state.partners;
    },
    hasPartners(state): boolean {
      return state.partners && state.partners.length > 0;
    },
    isPartner(_): boolean {
      // other getters now on `this`
      const partners = this.partners;
      // const userId = rootGetters.userId; TODO
      return partners.some((partner: Partner) => partner.id === "userId");
    },
    shouldUpdate(state): boolean {
      const lastFetch = state.lastFetch;
      if (!lastFetch) {
        return true;
      }
      const currentTimeStamp = new Date().getTime();
      return (currentTimeStamp - lastFetch) / 1000 > 60;
    },
  },
  actions: {
    // no context as first argument, use `this` instead
    registerPartner() {
      //TODO
    },
    loadPartners() {
      //TODO
    },
    // mutations can now become actions,
    // instead of `state` as first argument use `this`
    registerPartnerMutation(payload: Partner) {
      this.partners.push(payload);
    },
    setPartners(payload: Partner[]) {
      this.partners = payload;
    },
    setFetchTimestamp() {
      this.lastFetch = new Date().getTime();
    },
    // easily reset state using `$reset`
    clearStore() {
      this.$reset();
    },
  },
});
