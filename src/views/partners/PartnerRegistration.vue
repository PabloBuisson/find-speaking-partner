<template>
  <section>
    <BaseCard>
      <h2>Register as a partner now !</h2>
      <PartnerForm @save-data="saveData"></PartnerForm>
    </BaseCard>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { usePartnersStore } from "@/stores/partners-store";
import PartnerForm from "../../components/partners/PartnerForm.vue";
import type { PartnerRegistration } from "@/models/interfaces/partner-registration";

export default defineComponent({
  components: {
    PartnerForm,
  },
  setup() {
    const partnersStore = usePartnersStore();
    return { partnersStore };
  },
  methods: {
    saveData(data: PartnerRegistration) {
      this.partnersStore.registerPartner(data);
      this.$router.replace("/partners");
    },
  },
});
</script>