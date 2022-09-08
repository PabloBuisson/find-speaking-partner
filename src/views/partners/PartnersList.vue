<template>
  <div>
    <BaseDialog :show="!!error" title="An error occurred!" @close="handleError">
      <p>{{ error }}</p>
    </BaseDialog>
    <section>
      <PartnerFilter @change-filter="setFilters"></PartnerFilter>
    </section>
    <section>
      <BaseCard>
        <div class="controls">
          <BaseButton mode="outline" @click="loadPartners(true)"
            >Refresh</BaseButton
          >
          <BaseButton link to="/auth?redirect=register" v-if="!isLoggedIn"
            >Login to Register as Partner</BaseButton
          >
          <BaseButton
            v-if="isLoggedIn && !isPartner && !isLoading"
            link
            to="/register"
            >Register as Partner</BaseButton
          >
        </div>
        <div v-if="isLoading">
          <BaseSpinner></BaseSpinner>
        </div>
        <ul v-else-if="hasPartners">
          <PartnerItem
            v-for="partner in filteredPartners"
            :key="partner.id"
            :partner="partner"
          ></PartnerItem>
        </ul>
        <h3 v-else>No partners found.</h3>
      </BaseCard>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { usePartnersStore } from "../../stores/partners-store";
import { useAuthStore } from "../../stores/auth-store";

import type { Partner } from "../../models/interfaces/partner";

import PartnerItem from "../../components/partners/PartnerItem.vue";
import PartnerFilter from "../../components/partners/PartnerFilter.vue";

export default defineComponent({
  components: {
    PartnerItem,
    PartnerFilter,
  },
  setup() {
    const partnersStore = usePartnersStore();
    const authStore = useAuthStore();

    return { partnersStore, authStore };
  },
  created() {
    this.loadPartners();
  },
  data() {
    return {
      isLoading: false,
      error: null,
      activeFilters: {
        professional: true,
        intermediate: true,
        beginner: true,
      },
    };
  },
  computed: {
    isLoggedIn(): boolean {
      return this.authStore.isAuthenticated;
    },
    isPartner(): boolean {
      return this.partnersStore.isPartner;
    },
    filteredPartners(): Partner[] {
      const partners: Partner[] = this.partnersStore.partnersList;
      return partners.filter((partners) => {
        if (
          this.activeFilters.professional &&
          partners.level === "professional"
        ) {
          return true;
        }
        if (
          this.activeFilters.intermediate &&
          partners.level === "intermediate"
        ) {
          return true;
        }
        if (this.activeFilters.beginner && partners.level === "beginner") {
          return true;
        }
        return false;
      });
    },
    hasPartners(): boolean {
      return !this.isLoading && this.partnersStore.hasPartners;
    },
  },
  methods: {
    setFilters(updatedFilters: {
      professional: boolean;
      intermediate: boolean;
      beginner: boolean;
    }) {
      this.activeFilters = updatedFilters;
    },
    async loadPartners(refresh = false) {
      this.isLoading = true;
      try {
        await this.partnersStore.loadPartners({
          forceRefresh: refresh,
        });
      } catch (error: any) {
        this.error = error.message || "Something went wrong!";
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    },
  },
});
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.controls {
  display: flex;
  justify-content: space-between;
}
</style>
