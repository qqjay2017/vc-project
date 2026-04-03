<template>
  <div class="placeholder">
    <div class="placeholder__icon">🚧</div>
    <div class="placeholder__text">页面开发中...</div>
    <div class="placeholder__path">{{ $route.path }}</div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
const $route = useRoute()
</script>

<style lang="scss" scoped>
.placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60vh;
  gap: $spacing-md;

  &__icon {
    font-size: 48px;
  }

  &__text {
    font-size: $font-size-lg;
    color: $color-text-secondary;
    font-weight: 500;
  }

  &__path {
    font-size: $font-size-sm;
    color: $color-text-secondary;
    background-color: $color-bg-white;
    padding: $spacing-xs $spacing-sm;
    border-radius: $border-radius-sm;
    font-family: monospace;
  }
}
</style>
