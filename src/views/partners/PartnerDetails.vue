<template>
  <div>
    <section>
      <BaseCard>
        <h2>{{ fullName }}</h2>
        <p class="info-item">Learning level : {{ selectedPartner.level }}</p>
        <p class="info-item">Speaks...</p>
        <BaseBadge
          v-for="lang in langNative"
          :key="lang"
          type="native"
          :title="lang"
        ></BaseBadge>
        <p class="info-item">Is practicing...</p>
        <BaseBadge
          v-for="lang in langPractice"
          :key="lang"
          type="practice"
          :title="lang"
        ></BaseBadge>
        <h3 class="subtitle">Who am I ?</h3>
        <p class="info-item info-quote">{{ description }}</p>
        <h3 class="subtitle">I'm interested in...</h3>
        <p class="info-item info-quote">{{ interests }}</p>
        <h3 class="subtitle">What am I looking for ?</h3>
        <li
          class="list-item"
          v-for="exchange in typeOfExchange"
          :key="exchange"
        >
          {{ exchange }}
        </li>
      </BaseCard>
    </section>
    <section>
      <BaseCard>
        <header>
          <h2 :id="contactAnchor">Interested ? Reach out now !</h2>
          <ContactPartner></ContactPartner>
        </header>
      </BaseCard>
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
        ? this.selectedPartner.interests ?? ""
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

<style scoped>
.subtitle {
  margin-top: 0.75rem;
}
.info-item {
  margin: 0.5rem 0 0.25rem 0;
}
.info-quote {
  border-left: 0.25rem solid var(--color-background-light);
  padding-left: 0.5rem;
}
.list-item {
  list-style: none;
}
.list-item::before {
  font-family: "Material Icons";
  content: "check";
  font-size: 1.5rem;
  color: var(--color-background-soft, green);
  vertical-align: middle;
  line-height: 1px;
  margin-right: 1rem;
}
</style>
