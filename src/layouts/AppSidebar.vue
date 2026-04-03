<template>
  <aside class="app-sidebar">
    <nav class="app-sidebar__nav">
      <div
        v-for="item in menuItems"
        :key="item.path"
        class="app-sidebar__group"
      >
        <div v-if="item.children" class="app-sidebar__group-title">
          {{ item.label }}
        </div>
        <RouterLink
          v-else
          :to="item.path"
          class="app-sidebar__item"
          active-class="app-sidebar__item--active"
        >
          <span class="app-sidebar__item-icon">{{ item.icon }}</span>
          <span class="app-sidebar__item-label">{{ item.label }}</span>
        </RouterLink>
        <template v-if="item.children">
          <RouterLink
            v-for="child in item.children"
            :key="child.path"
            :to="child.path"
            class="app-sidebar__item app-sidebar__item--child"
            active-class="app-sidebar__item--active"
          >
            <span class="app-sidebar__item-icon">{{ child.icon }}</span>
            <span class="app-sidebar__item-label">{{ child.label }}</span>
          </RouterLink>
        </template>
      </div>
    </nav>
  </aside>
</template>

<script setup lang="ts">
interface MenuItem {
  label: string
  icon: string
  path: string
  children?: Omit<MenuItem, 'children'>[]
}

const menuItems: MenuItem[] = [
  { label: '仪表盘', icon: '📊', path: '/' },
  {
    label: '系统管理',
    icon: '⚙️',
    path: '/system',
    children: [
      { label: '用户管理', icon: '👤', path: '/system/users' },
      { label: '角色管理', icon: '🛡️', path: '/system/roles' },
      { label: '菜单管理', icon: '📋', path: '/system/menus' },
    ],
  },
  {
    label: '内容管理',
    icon: '📝',
    path: '/content',
    children: [
      { label: '文章列表', icon: '📄', path: '/content/articles' },
      { label: '分类管理', icon: '🏷️', path: '/content/categories' },
    ],
  },
  { label: '数据统计', icon: '📈', path: '/statistics' },
  { label: '系统设置', icon: '🔧', path: '/settings' },
]
</script>

<style lang="scss" scoped>
.app-sidebar {
  background-color: $color-bg-sidebar;
  height: 100%;

  &__nav {
    padding: $spacing-sm 0;
  }

  &__group {
    margin-bottom: $spacing-xs;
  }

  &__group-title {
    padding: $spacing-md $spacing-md $spacing-xs;
    font-size: $font-size-sm;
    color: rgba($color-sidebar-text, 0.5);
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  &__item {
    display: flex;
    align-items: center;
    gap: $spacing-sm;
    padding: 10px $spacing-md;
    color: $color-sidebar-text;
    font-size: $font-size-base;
    transition: background-color 0.2s, color 0.2s;
    cursor: pointer;
    border-left: 3px solid transparent;

    &:hover {
      background-color: $color-sidebar-item-hover;
      color: $color-sidebar-text-active;
    }

    &--active {
      background-color: rgba($color-sidebar-item-active, 0.15);
      color: $color-sidebar-text-active;
      border-left-color: $color-sidebar-item-active;
    }

    &--child {
      padding-left: $spacing-xl + $spacing-sm;
    }
  }

  &__item-icon {
    font-size: 16px;
    width: 20px;
    text-align: center;
    flex-shrink: 0;
  }

  &__item-label {
    font-size: $font-size-base;
    white-space: nowrap;
  }
}
</style>
