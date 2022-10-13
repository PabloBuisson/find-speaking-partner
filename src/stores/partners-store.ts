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
    async registerPartner(data: PartnerRegistration) {
      const authStore = useAuthStore();
      const partnerId = authStore.userId;
      const token = authStore.token;
      const partnerData = data;

      const response = await fetch(
        `${import.meta.env.VITE_FIREBASE_URL}/partners/${partnerId}.json`,
        // ?auth=` + token
        {
          method: "PUT",
          body: JSON.stringify(partnerData),
        }
      );

      this.registerPartnerMutation({
        ...partnerData,
        id: partnerId ?? 0,
      });
    },
    async loadPartners(payload: { forceRefresh: boolean }) {
      if (!payload.forceRefresh && !this.shouldUpdate) {
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_FIREBASE_URL}/partners.json`
      );
      const responseData = await response.json();

      if (!response.ok) {
        const error = new Error(responseData.message || "Failed to fetch!");
        throw error;
      }

      const partners: Partner[] = [];
      for (const key in responseData) {
        const partner: Partner = {
          id: key,
          firstName: responseData[key].firstName,
          lastName: responseData[key].lastName,
          description: responseData[key].description,
          pseudo: responseData[key].pseudo,
          email: responseData[key].email,
          langNative: responseData[key].langNative,
          langPractice: responseData[key].langPractice,
          level: responseData[key].level,
          interests: responseData[key].interests,
          exchange: responseData[key].exchange,
        };
        partners.push(partner);
      }

      this.setPartners(partners);
      this.setFetchTimestamp();
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
