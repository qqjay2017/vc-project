<template>
  <div ref="rootEl" class="anchor-layout">
    <!-- 左侧内容区 -->
    <div ref="contentEl" class="anchor-layout__content">
      <slot />
    </div>

    <!-- 右侧锚点面板 -->
    <aside
      class="anchor-layout__panel"
      :class="{ 'anchor-layout__panel--collapsed': collapsed }"
    >
      <button
        class="anchor-layout__toggle"
        @click="collapsed = !collapsed"
        :title="collapsed ? '展开' : '收起'"
      >
        <span class="anchor-layout__toggle-icon">{{
          collapsed ? "◀" : "☰"
        }}</span>
        <span v-if="!collapsed" class="anchor-layout__toggle-label">目录</span>
      </button>

      <Transition name="anchor-panel">
        <nav v-show="!collapsed" class="anchor-layout__nav">
          <a
            v-for="item in anchors"
            :key="item.id"
            class="anchor-layout__item"
            :class="{ 'anchor-layout__item--active': activeId === item.id }"
            href="javascript:void(0)"
            @click="scrollToAnchor(item.id)"
          >
            <span class="anchor-layout__item-dot" />
            <span class="anchor-layout__item-label">{{ item.label }}</span>
          </a>
        </nav>
      </Transition>
    </aside>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  provide,
  useTemplateRef,
  onMounted,
  onBeforeUnmount,
  watch,
} from "vue";
import { ANCHOR_LAYOUT_CTX_KEY } from "./context";

export interface AnchorItem {
  id: string;
  label: string;
}

interface Props {
  anchors: AnchorItem[];
  /**
   * 滚动容器。三种形式：
   * - 不传（默认）：以视口为 root，适合 window 滚动场景
   * - CSS 选择器字符串（如 '.admin-layout__main'）：在组件根节点向上查找匹配的容器
   * - HTMLElement：直接传入容器元素引用，兼容 qiankun Shadow DOM 环境
   */
  scrollContainer?: string | HTMLElement | null;
}

const props = withDefaults(defineProps<Props>(), {
  scrollContainer: null,
});

const rootEl = useTemplateRef<HTMLElement>("rootEl");
const contentEl = useTemplateRef<HTMLElement>("contentEl");
const collapsed = ref(false);
const activeId = ref("");
let observer: IntersectionObserver | null = null;

provide(ANCHOR_LAYOUT_CTX_KEY, { contentEl, collapsed });

function resolveContainer(): Element | null {
  if (!props.scrollContainer) return null;
  if (props.scrollContainer instanceof HTMLElement)
    return props.scrollContainer;
  // 从组件根节点向上查找，避免 document 全局查询跨越 shadow root
  return rootEl.value?.closest(props.scrollContainer) ?? null;
}

function scrollToAnchor(id: string) {
  // 在组件根节点内查找，兼容 Shadow DOM 环境
  const el = rootEl.value?.querySelector<HTMLElement>(`#${id}`);
  if (!el) return;
  const container = resolveContainer();
  if (container) {
    const containerTop = container.getBoundingClientRect().top;
    const elTop = el.getBoundingClientRect().top;
    container.scrollBy({ top: elTop - containerTop - 24, behavior: "smooth" });
  } else {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function setupObserver() {
  if (observer) observer.disconnect();

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          activeId.value = entry.target.id;
          break;
        }
      }
    },
    {
      root: resolveContainer(),
      rootMargin: "-10% 0px -80% 0px",
      threshold: 0,
    },
  );

  for (const anchor of props.anchors) {
    const el = rootEl.value?.querySelector<HTMLElement>(`#${anchor.id}`);
    if (el) observer.observe(el);
  }
}

onMounted(() => {
  setupObserver();
});

onBeforeUnmount(() => {
  observer?.disconnect();
});

watch(
  () => props.anchors,
  () => {
    setupObserver();
  },
  { deep: true },
);
</script>

<style lang="scss" scoped>
$anchor-panel-width: 180px;
$anchor-panel-collapsed-width: 36px;

.anchor-layout {
  display: flex;
  align-items: flex-start;
  gap: $spacing-lg;
  position: relative;
  margin-bottom: 60px;

  &__content {
    flex: 1;
    min-width: 0;
  }

  &__panel {
    width: $anchor-panel-width;
    flex-shrink: 0;
    position: sticky;
    top: $spacing-lg;
    align-self: flex-start;
    max-height: calc(100vh - $header-height - $spacing-lg * 2);
    overflow-y: auto;
    background-color: $color-bg-white;
    border-radius: $border-radius-md;
    box-shadow: $shadow-sm;
    border: 1px solid $border-color;
    transition: width 0.25s ease;
    overflow: hidden;

    &--collapsed {
      width: $anchor-panel-collapsed-width;
    }
  }

  &__toggle {
    display: flex;
    align-items: center;
    gap: $spacing-xs;
    width: 100%;
    padding: $spacing-sm $spacing-md;
    border-bottom: 1px solid $border-color;
    color: $color-text-primary;
    font-size: $font-size-base;
    font-weight: 500;
    transition: background-color 0.2s;
    white-space: nowrap;

    &:hover {
      background-color: $color-bg-base;
    }
  }

  &__toggle-icon {
    font-size: 14px;
    line-height: 1;
    flex-shrink: 0;
  }

  &__toggle-label {
    font-size: $font-size-sm;
    color: $color-text-secondary;
  }

  &__nav {
    padding: $spacing-sm 0;
  }

  &__item {
    display: flex;
    align-items: center;
    gap: $spacing-sm;
    padding: 7px $spacing-md;
    color: $color-text-secondary;
    font-size: $font-size-sm;
    text-decoration: none;
    transition:
      color 0.2s,
      background-color 0.2s;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;

    &:hover {
      color: $color-primary;
      background-color: rgba($color-primary, 0.05);
    }

    &--active {
      color: $color-primary;
      font-weight: 500;

      .anchor-layout__item-dot {
        background-color: $color-primary;
        transform: scale(1.4);
      }
    }
  }

  &__item-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: $border-color;
    flex-shrink: 0;
    transition:
      background-color 0.2s,
      transform 0.2s;
  }

  &__item-label {
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

// 展开/收起过渡动画
.anchor-panel-enter-active,
.anchor-panel-leave-active {
  transition: opacity 0.2s ease;
}

.anchor-panel-enter-from,
.anchor-panel-leave-to {
  opacity: 0;
}
</style>
