<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{ invalid: !firstName.isValid }">
      <label for="firstname">Your firstname</label>
      <input
        type="text"
        id="firstname"
        v-model.trim="firstName.val"
        @blur="clearValidity('firstName')"
      />
      <p class="error-message" v-if="!firstName.isValid">
        Your firstname must not be empty.
      </p>
    </div>
    <div class="form-control" :class="{ invalid: !lastName.isValid }">
      <label for="lastname">Your lastname</label>
      <input
        type="text"
        id="lastname"
        v-model.trim="lastName.val"
        @blur="clearValidity('lastName')"
      />
      <p class="error-message" v-if="!lastName.isValid">
        Your lastname must not be empty.
      </p>
    </div>
    <div class="form-control" :class="{ invalid: !langNative.isValid }">
      <label for="langnative">You are speaking...</label>
      <select id="langnative" v-model="langNative.val" multiple>
        <option @blur="clearValidity('langNative')"
          v-for="option in langNativeOptions"
          :key="option.value"
          :value="option.value"
        >
          {{ option.text }}
        </option>
      </select>
      <p class="error-message" v-if="!langNative.isValid">
        You must select at least one language.
      </p>
    </div>
    <div class="form-control" :class="{ invalid: !langPractice.isValid }">
      <label for="langpractice">You are learning...</label>
      <select id="langpractice" v-model="langPractice.val" multiple>
        <option @blur="clearValidity('langPractice')"
          v-for="option in langPracticeOptions"
          :key="option.value"
          :value="option.value"
        >
          {{ option.text }}
        </option>
      </select>
      <p class="error-message" v-if="!langPractice.isValid">
        You must select at least one language.
      </p>
    </div>
    <div class="form-control" :class="{ invalid: !description.isValid }">
      <label for="description">How would you describe yourself ?</label>
      <textarea
        id="description"
        rows="5"
        v-model.trim="description.val"
        @blur="clearValidity('description')"
      ></textarea>
      <p class="error-message" v-if="!description.isValid">
        Your description of yourself must not be empty.
      </p>
    </div>
    <div class="form-control">
      <label for="description">What are your fields of interest ?</label>
      <textarea
        id="interests"
        rows="5"
        v-model.trim="interests.val"
        @blur="clearValidity('interests')"
      ></textarea>
    </div>
    <div class="form-control" :class="{ invalid: !level.isValid }">
      <label>Your level with the practicing language</label>
      <div>
        <input
          type="radio"
          id="beginner"
          value="beginner"
          v-model="level.val"
          @blur="clearValidity('level')"
        />
        <label for="beginner">beginner</label>
      </div>
      <div>
        <input
          type="radio"
          id="intermediate"
          value="intermediate"
          v-model="level.val"
          @blur="clearValidity('level')"
        />
        <label for="intermediate">intermediate</label>
      </div>
      <div>
        <input
          type="radio"
          id="professional"
          value="professional"
          v-model="level.val"
          @blur="clearValidity('level')"
        />
        <label for="professional">professional</label>
      </div>
      <p class="error-message" v-if="!level.isValid">
        At least one level must be selected.
      </p>
    </div>
    <div class="form-control" :class="{ invalid: !exchange.isValid }">
      <label>Type(s) of exchange wanted</label>
      <div>
        <input
          type="checkbox"
          id="conversation"
          value="conversation"
          v-model="exchange.val"
          @blur="clearValidity('exchange')"
        />
        <label for="conversation">Conversation</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="chat"
          value="chat"
          v-model="exchange.val"
          @blur="clearValidity('exchange')"
        />
        <label for="chat">Chat</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="correspondence"
          value="correspondence"
          v-model="exchange.val"
          @blur="clearValidity('exchange')"
        />
        <label for="correspondence">Correspondence</label>
      </div>
      <p class="error-message" v-if="!exchange.isValid">
        At least one type of exchange must be selected.
      </p>
    </div>
    <p class="error-message" v-if="!formIsValid">
      Please fix the above errors and submit again.
    </p>
    <div class="action-button">
      <BaseButton>Register</BaseButton>
    </div>
  </form>
</template>

<script lang="ts">
import type { PartnerRegistration } from "@/models/interfaces/partner-registration";
import { defineComponent } from "vue";

interface FormControl {
  val: string;
  isValid: boolean;
}

interface FormData {
  firstName: FormControl;
  lastName: FormControl;
  langPractice: FormControl;
  langNative: FormControl;
  description: FormControl;
  interests: FormControl;
  exchange: FormControl;
  level: FormControl;
}

export default defineComponent({
  emits: ["save-data"],
  data() {
    return {
      firstName: {
        val: "",
        isValid: true,
      },
      lastName: {
        val: "",
        isValid: true,
      },
      langNative: {
        val: [],
        isValid: true,
      },
      langPractice: {
        val: [],
        isValid: true,
      },
      description: {
        val: "",
        isValid: true,
      },
      interests: {
        val: "",
        isValid: true,
      },
      level: {
        val: "",
        isValid: true,
      },
      exchange: {
        val: [],
        isValid: true,
      },
      formIsValid: true,
      langNativeOptions: [
        { text: "English", value: "english" },
        { text: "French", value: "french" },
        { text: "Spanish", value: "spanish" },
        { text: "German", value: "german" },
      ],
      langPracticeOptions: [
        { text: "English", value: "english" },
        { text: "French", value: "french" },
        { text: "Spanish", value: "spanish" },
        { text: "German", value: "german" },
      ],
    };
  },
  methods: {
    clearValidity(inputName: keyof FormData) {
      this[inputName].isValid = true;
    },
    validateForm() {
      this.formIsValid = true;
      if (this.firstName.val === "") {
        this.firstName.isValid = false;
        this.formIsValid = false;
      }
      if (this.lastName.val === "") {
        this.lastName.isValid = false;
        this.formIsValid = false;
      }
      if (this.langNative.val.length == 0) {
        this.langNative.isValid = false;
        this.formIsValid = false;
      }
      if (this.langPractice.val.length == 0) {
        this.langPractice.isValid = false;
        this.formIsValid = false;
      }
      if (this.description.val === "") {
        this.description.isValid = false;
        this.formIsValid = false;
      }
      if (this.level.val === "") {
        this.level.isValid = false;
        this.formIsValid = false;
      }
      if (this.exchange.val.length === 0) {
        this.exchange.isValid = false;
        this.formIsValid = false;
      }
    },
    submitForm() {
      this.validateForm();
      if (!this.formIsValid) {
        return;
      }
      const formData: PartnerRegistration = {
        firstName: this.firstName.val,
        lastName: this.lastName.val,
        langNative: this.langNative.val,
        langPractice: this.langPractice.val,
        description: this.description.val,
        exchange: this.exchange.val,
        interests: this.interests.val,
        level: this.level.val as "professional" | "intermediate" | "beginner",
      };
      this.$emit("save-data", formData);
    },
  },
});
</script>

<style scoped>
.form-control {
  margin: 1rem 0;
}
input[type="checkbox"] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}
input[type="radio"] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}
input[type="checkbox"] {
  display: inline-block;
  width: auto;
  border: none;
}
input[type="radio"] {
  display: inline-block;
  width: auto;
  border: none;
}
.action-button {
  margin: 2rem;
  display: flex;
  justify-content: center;
}
</style>
