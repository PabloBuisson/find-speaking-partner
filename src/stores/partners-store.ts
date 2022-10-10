import { defineStore } from "pinia";
import { useAuthStore } from "./auth-store";
import type { Partner } from "../models/interfaces/partner";
import type { PartnerRegistration } from "@/models/interfaces/partner-registration";

interface State {
  _lastFetch: number | null;
  _partners: Partner[];
}

export const usePartnersStore = defineStore("partners", {
  state: (): State => ({
    _lastFetch: null,
    _partners: [
      {
        id: "p1",
        firstName: "Terry",
        lastName: "Pratchett",
        langNative: ["English"],
        langPractice: ["French"],
        description: "I like carnivorous plants.",
        level: "professional",
        interests:
          "Writing, science, nature and conversations with flat-earthers.",
        exchange: ["correspondence"],
      },
      {
        id: "p2",
        firstName: "Pablo",
        lastName: "Buisson",
        langNative: ["French"],
        langPractice: ["English"],
        description: "I'm Pablo and I would like to improve my english !",
        level: "intermediate",
        interests:
          "Writing, Programming, Reading, and in general every word which ends with 'ing'.",
        exchange: ["conversation"],
      },
    ],
  }),
  getters: {
    // ⚠ A getter cannot have the same name as another state property.
    partners(state): Partner[] {
      return state._partners;
    },
    hasPartners(state): boolean {
      return state._partners && state._partners.length > 0;
    },
    isPartner(): boolean {
      // other getters now on `this`
      const partners = this.partners;
      // const userId = rootGetters.userId; TODO
      return partners.some((partner: Partner) => partner.id === "userId");
    },
    shouldUpdate(state): boolean {
      const lastFetch = state._lastFetch;
      if (!lastFetch) {
        return true;
      }
      const currentTimeStamp = new Date().getTime();
      return (currentTimeStamp - lastFetch) / 1000 > 60;
    },
  },
  actions: {
    // no context as first argument, use `this` instead
    registerPartner(data: PartnerRegistration) {
      const authStore = useAuthStore();
      const partnerId = authStore._userId;
      const partnerData = data;

      this.registerPartnerMutation({
        ...partnerData,
        id: partnerId ?? 0,
      });
    },
    loadPartners(payload: { forceRefresh: boolean }) {
      if (!payload.forceRefresh && this.shouldUpdate) {
        return;
      }
      //TODO
      const partners: Partner[] = this.partners;
      this.setPartners(partners);
    },
    // mutations can now become actions,
    // instead of `state` as first argument use `this`
    registerPartnerMutation(payload: Partner) {
      this._partners.push(payload);
    },
    setPartners(payload: Partner[]) {
      this._partners = payload;
    },
    setFetchTimestamp() {
      this._lastFetch = new Date().getTime();
    },
    // easily reset state using `$reset`
    clearStore() {
      this.$reset();
    },
  },
});
