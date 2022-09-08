<template>
  <li>
    <h3>{{ fullName }}</h3>
    <h4>Level {{ partner.level }}</h4>
    <div>
      <BaseBadge
        v-for="lang in partner.languagesLearnt"
        :key="lang"
        :type="lang"
        :title="lang"
      ></BaseBadge>
      <BaseBadge
        v-for="lang in partner.languagesWanted"
        :key="lang"
        :type="lang"
        :title="lang"
      ></BaseBadge>
    </div>
    <div class="actions">
      <BaseButton mode="outline" link :to="coachContactLink"
        >Contact</BaseButton
      >
      <BaseButton link :to="coachDetailsLink">View Details</BaseButton>
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
    coachContactLink() {
      return this.$route.path + "/" + this.partner.id + "/contact"; // /partners/p1/contact
    },
    coachDetailsLink() {
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