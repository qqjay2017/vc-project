<template>
  <header class="app-header">
    <div class="app-header__logo">
      <span class="app-header__logo-icon">⬡</span>
      <span class="app-header__logo-text">Admin System</span>
    </div>
    <div class="app-header__actions">
      <button class="app-header__icon-btn" title="通知">
        <span class="icon">🔔</span>
      </button>
      <div class="app-header__user">
        <div class="app-header__avatar">A</div>
        <span class="app-header__username">Admin</span>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: $header-height;
  padding: 0 $spacing-lg;
  background-color: $color-bg-white;
  border-bottom: 1px solid $color-header-border;
  box-shadow: $shadow-sm;
  z-index: 100;

  &__logo {
    display: flex;
    align-items: center;
    gap: $spacing-sm;
  }

  &__logo-icon {
    font-size: 22px;
    color: $color-primary;
    line-height: 1;
  }

  &__logo-text {
    font-size: $font-size-lg;
    font-weight: 600;
    color: $color-text-primary;
    letter-spacing: 0.5px;
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: $spacing-md;
  }

  &__icon-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: $border-radius-sm;
    transition: background-color 0.2s;

    &:hover {
      background-color: $color-bg-base;
    }

    .icon {
      font-size: 18px;
    }
  }

  &__user {
    display: flex;
    align-items: center;
    gap: $spacing-sm;
    cursor: pointer;
    padding: $spacing-xs $spacing-sm;
    border-radius: $border-radius-sm;
    transition: background-color 0.2s;

    &:hover {
      background-color: $color-bg-base;
    }
  }

  &__avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: $color-primary;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: $font-size-sm;
    font-weight: 600;
  }

  &__username {
    font-size: $font-size-base;
    color: $color-text-primary;
    font-weight: 500;
  }
}
</style>
