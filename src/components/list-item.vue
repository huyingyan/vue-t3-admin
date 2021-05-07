<template>
  <li>{{ item }}</li>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'list-item',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  setup() {
    return {};
  },
});
</script>
