<template>
  <BaseCard style="margin-top: 1rem">
    <div class="columns-profile">
      <div class="column-infos">
        <h3>{{ fullName }}</h3>
        <p class="info-item">Learning level : {{ partner.level }}</p>
        <p class="info-item">Speaks...</p>
        <BaseBadge
          v-for="lang in partner.langNative"
          :key="lang"
          type="native"
          :title="lang"
        ></BaseBadge>
        <p class="info-item">Is practicing...</p>
        <BaseBadge
          v-for="lang in partner.langPractice"
          :key="lang"
          type="practice"
          :title="lang"
        ></BaseBadge>
      </div>
      <div class="column-image">
        <div class="image-placeholder"></div>
      </div>
    </div>

    <div class="actions">
      <BaseButton mode="outline" link :to="partnerContactLink"
        >Contact</BaseButton
      >
      <BaseButton link :to="partnerDetailsLink">View Details</BaseButton>
    </div>
  </BaseCard>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: ["partner"],
  computed: {
    fullName() {
      return this.partner.firstName + " " + this.partner.lastName;
    },
    partnerContactLink() {
      return (
        this.$route.path + "/" + this.partner.id + "#contact-" + this.partner.id
      );
      // const link = {
      //   path: `${this.$route.path}/${this.partner.id}`,
      //   hash: `#contact-${this.partner.id}`,
      // };
      // return link;
      // { name: 'partners', params: { id: 'p1' }, hash: '#contact-p1' }
    },
    partnerDetailsLink() {
      return this.$route.path + "/" + this.partner.id; // /partners/p1
    },
  },
});
</script>

<style scoped>
h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}
.columns-profile {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
}
.image-placeholder {
  width: 10rem;
  height: 10rem;
  background-color: var(--color-background-light, lightgreen);
  border-radius: 0.25rem;
}
.info-item {
  margin: 0.5rem 0 0.25rem 0;
}
.actions {
  display: flex;
  justify-content: flex-end;
  gap: 1.5rem;
}
</style>
