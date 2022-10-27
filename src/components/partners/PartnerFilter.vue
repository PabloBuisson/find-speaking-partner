<template>
  <BaseCard>
    <h2>Find Your Partner</h2>
    <p>Learning level</p>
    <form>
      <span class="filter-option">
        <input type="checkbox" id="professional" checked @change="setFilter" />
        <label for="professional">Professional</label>
      </span>
      <span class="filter-option">
        <input type="checkbox" id="intermediate" checked @change="setFilter" />
        <label for="intermediate">Intermediate</label>
      </span>
      <span class="filter-option">
        <input type="checkbox" id="beginner" checked @change="setFilter" />
        <label for="beginner">Beginner</label>
      </span>
    </form>
  </BaseCard>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  emits: ["change-filter"],
  data() {
    return {
      filters: {
        professional: true,
        intermediate: true,
        beginner: true,
      },
    };
  },
  methods: {
    setFilter(event: any) {
      const inputId = event.target.id;
      const isActive = event.target.checked;
      const updatedFilters = {
        ...this.filters,
        [inputId]: isActive,
      };
      this.filters = updatedFilters;
      this.$emit("change-filter", updatedFilters);
    },
  },
});
</script>

<style scoped>
h2 {
  margin: 0.5rem 0;
}
.filter-option {
  margin-right: 1rem;
}
.filter-option label,
.filter-option input {
  vertical-align: middle;
}
.filter-option label {
  margin-left: 0.25rem;
}
.filter-option.active label {
  font-weight: bold;
}
</style>
