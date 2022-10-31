<template>
  <form @submit.prevent="submitForm">
    <div class="form-control">
      <label for="email">Your e-mail</label>
      <input type="email" id="email" v-model.trim="email" />
    </div>
    <div class="form-control">
      <label for="message">Your message</label>
      <textarea rows="5" id="message" v-model.trim="message"></textarea>
    </div>
    <p class="error-message" v-if="!formIsValid">
      Please enter a valid email and non-empty message.
    </p>
    <div class="actions">
      <base-button>Send Message</base-button>
    </div>
  </form>
</template>

<script lang="ts">
import { useRequestsStore } from "@/stores/requests-store";
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const requestsStore = useRequestsStore();

    return { requestsStore };
  },
  data() {
    return {
      email: "",
      message: "",
      formIsValid: true,
    };
  },
  methods: {
    submitForm() {
      this.formIsValid = true;
      if (
        this.email === "" ||
        !this.email.includes("@") ||
        this.message === ""
      ) {
        this.formIsValid = false;
        return;
      }
      this.requestsStore.contactPartner({
        email: this.email,
        message: this.message,
        partnerId: this.$route.params.id as string,
      });
      this.$router.replace("/partners");
    },
  },
});
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}
.actions {
  text-align: center;
  margin-top: 1.5rem;
}
</style>
