<template>
  <div>
    <base-dialog :show="!!error" title="Oops, an error occurred" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <base-dialog :show="isLoading" title="Authenticating..." fixed>
      <base-spinner></base-spinner>
    </base-dialog>
    <base-card>
      <h2 class="form-title">Login or signup</h2>
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <label for="email">Your e-mail</label>
          <input type="email" id="email" v-model.trim="email" />
        </div>
        <div class="form-control">
          <label for="password">Your password</label>
          <input type="password" id="password" v-model.trim="password" />
        </div>
        <p class="error-message" v-if="!formIsValid">
          Please enter a valid email and password (must be at least 6 characters
          long).
        </p>
        <div class="action-buttons">
          <base-button>{{ submitButtonCaption }}</base-button>
          <base-button type="button" mode="flat" @click="switchAuthMode">{{
            switchModeButtonCaption
          }}</base-button>
        </div>
      </form>
    </base-card>
  </div>
</template>

<script lang="ts">
import { useAuthStore } from "@/stores/auth-store";
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      email: "",
      password: "",
      formIsValid: true,
      mode: "login",
      isLoading: false,
      error: null,
    };
  },
  setup() {
    const authStore = useAuthStore();
    return { authStore };
  },
  computed: {
    submitButtonCaption() {
      if (this.mode === "login") {
        return "Login";
      } else {
        return "Signup";
      }
    },
    switchModeButtonCaption() {
      if (this.mode === "login") {
        return "Signup instead";
      } else {
        return "Login instead";
      }
    },
  },
  methods: {
    async submitForm() {
      this.formIsValid = true;
      if (
        this.email === "" ||
        !this.email.includes("@") ||
        this.password.length < 6
      ) {
        this.formIsValid = false;
        return;
      }
      this.isLoading = true;
      const actionPayload = {
        email: this.email,
        password: this.password,
      };
      try {
        if (this.mode === "login") {
          await this.authStore.login(actionPayload);
        } else {
          await this.authStore.signup(actionPayload);
        }
        const redirectUrl = "/" + (this.$route.query.redirect || "partners");
        this.$router.replace(redirectUrl);
      } catch (err: any) {
        this.error = err.message || "Failed to authenticate, try later.";
      }
      this.isLoading = false;
    },
    switchAuthMode() {
      if (this.mode === "login") {
        this.mode = "signup";
      } else {
        this.mode = "login";
      }
    },
    handleError() {
      this.error = null;
    },
  },
});
</script>

<style scoped>
.form-title {
  text-align: center;
}
form {
  padding: 2rem 4rem;
}
.form-control {
  margin: 1rem 0;
}
.action-buttons {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  gap: 1.5rem;
}
</style>
