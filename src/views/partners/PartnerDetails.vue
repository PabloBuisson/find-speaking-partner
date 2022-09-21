<template>
  <div>
    <section>
      <base-card>
        <h1>{{ fullName }}</h1>
        <p>Learning level : {{ selectedPartner.level }}</p>
        <p>Speaks</p>
        <base-badge
          v-for="lang in langNative"
          :key="lang"
          type="native"
          :title="lang"
        ></base-badge>
        <p>Practicing</p>
        <base-badge
          v-for="lang in langPractice"
          :key="lang"
          type="practice"
          :title="lang"
        ></base-badge>
        <h2>Who am I ?</h2>
        <p>{{ description }}</p>
        <h2>I'm interested in...</h2>
        <p>{{ interests }}</p>
        <h2>What am I looking for ?</h2>
        <li v-for="exchange in typeOfExchange" :key="exchange">
          {{ exchange }}
        </li>
      </base-card>
    </section>
    <section>
      <base-card>
        <header>
          <h2 :id="contactAnchor">Interested? Reach out now!</h2>
          <ContactPartner></ContactPartner>
        </header>
      </base-card>
    </section>
  </div>
</template>

<script lang="ts">
import { usePartnersStore } from "@/stores/partners-store";
import { defineComponent } from "vue";
import type { Partner } from "../../models/interfaces/partner";
import ContactPartner from "../requests/ContactPartner.vue";

export default defineComponent({
  props: ["id"],
  data() {
    return {
      selectedPartner: undefined as unknown as Partner,
    };
  },
  computed: {
    contactAnchor(): string {
      return `contact-${this.id}`;
    },
    fullName(): string {
      return this.selectedPartner != null
        ? this.selectedPartner.firstName + " " + this.selectedPartner.lastName
        : "";
    },
    langNative() {
      return this.selectedPartner != null
        ? this.selectedPartner.langNative
        : [];
    },
    langPractice() {
      return this.selectedPartner != null
        ? this.selectedPartner.langPractice
        : [];
    },
    description(): string {
      return this.selectedPartner != null
        ? this.selectedPartner.description
        : "";
    },
    interests(): string {
      return this.selectedPartner != null
        ? this.selectedPartner.interest ?? ""
        : "";
    },
    typeOfExchange(): Array<"conversation" | "chat" | "correspondence"> {
      return this.selectedPartner != null ? this.selectedPartner.exchange : [];
    },
    contactLink() {
      return this.$route.path + "/" + this.id + "/contact";
    },
  },
  setup() {
    const partnersStore = usePartnersStore();
    return { partnersStore };
  },
  created(): void {
    this.selectedPartner = this.partnersStore.partners.find(
      (partner) => partner.id === this.id
    ) as Partner;
  },
  components: { ContactPartner },
});
</script>
