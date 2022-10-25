<template>
  <li>
    <p>{{ fullName }}</p>
    <p>Learning level : {{ partner.level }}</p>
    <p>Speaks</p>
    <BaseBadge
      v-for="lang in partner.langNative"
      :key="lang"
      type="native"
      :title="lang"
    ></BaseBadge>
    <p>Practicing</p>
    <BaseBadge
      v-for="lang in partner.langPractice"
      :key="lang"
      type="practice"
      :title="lang"
    ></BaseBadge>
    <div class="actions">
      <BaseButton mode="outline" link :to="partnerContactLink"
        >Contact</BaseButton
      >
      <BaseButton link :to="partnerDetailsLink">View Details</BaseButton>
    </div>
  </li>
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
      return this.$route.path + "/" + this.partner.id + "#contact-" + this.partner.id; 
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
li {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
}
h3 {
  font-size: 1.5rem;
}
h3,
h4 {
  margin: 0.5rem 0;
}
div {
  margin: 0.5rem 0;
}
.actions {
  display: flex;
  justify-content: flex-end;
}
</style>
