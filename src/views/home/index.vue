<template>
  <div class="home"><h1>Welcome to Ant-Admin</h1></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.home {
  h1 {
    left: 50%;
    top: 50%;
    transform: translata(-50%, -50%);
    font-size: 30px;
    color: #666;
  }
}
</style>
