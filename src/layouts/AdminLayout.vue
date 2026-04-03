<template>
  <div class="admin-layout">
    <AppHeader class="admin-layout__header" />
    <AppSidebar class="admin-layout__sidebar" />
    <main class="admin-layout__main">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import AppHeader from "./AppHeader.vue";
import AppSidebar from "./AppSidebar.vue";
</script>

<style lang="scss" scoped>
.admin-layout {
  display: grid;
  grid-template-rows: $header-height 1fr;
  grid-template-columns: $sidebar-width 1fr;
  height: 100vh;
  overflow: hidden;
  padding-right: 50px;
  &__header {
    grid-column: 1 / -1;
    grid-row: 1;
  }

  &__sidebar {
    grid-column: 1;
    grid-row: 2;
    overflow-y: auto;
    overflow-x: hidden;
  }

  &__main {
    grid-column: 2;
    grid-row: 2;
    overflow-y: auto;
    padding: $spacing-lg;
    background-color: $color-bg-base;
  }
}
</style>
