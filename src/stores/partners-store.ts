import { defineStore } from "pinia";

import type { Partner } from "../models/interfaces/partner";

interface State {
  lastFetch: number | null;
  partners: Partner[];
}

export const usePartnersStore = defineStore("partners", {
  state: (): State => ({
    lastFetch: null,
    partners: [
      {
        id: "p1",
        firstName: "Terry",
        lastName: "Pratchett",
        languagesLearnt: ["English"],
        languagesWanted: ["French"],
        description: "I like carnivorous plants.",
        level: "professional",
      },
      {
        id: "p2",
        firstName: "Pablo",
        lastName: "Buisson",
        languagesLearnt: ["French"],
        languagesWanted: ["English"],
        description: "I'm Pablo and I would like to improve my english !",
        level: "intermediate"
      },
    ],
  }),
  getters: {
    // ⚠ A getter cannot have the same name as another state property.
    partnersList(state): Partner[] {
      return state.partners;
    },
    hasPartners(state): boolean {
      return state.partners && state.partners.length > 0;
    },
    isPartner(_): boolean {
      // other getters now on `this`
      const partners = this.partnersList;
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
    loadPartners(payload: { forceRefresh: boolean }) {
      if (!payload.forceRefresh && this.shouldUpdate) {
        return;
      }
      //TODO
      const partners: Partner[] = this.partnersList;
      this.setPartners(partners);
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
