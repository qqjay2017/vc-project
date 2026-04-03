<template>
  <footer class="page-footer" :style="footerStyle">
    <div class="page-footer__inner">
      <slot>
        <span class="page-footer__default">© 2026 Admin System</span>
      </slot>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, inject, watch, onMounted, onBeforeUnmount } from 'vue'
import type { CSSProperties } from 'vue'
import { ANCHOR_LAYOUT_CTX_KEY } from '@/components/AnchorLayout/context'
import type { AnchorLayoutCtx } from '@/components/AnchorLayout/context'

// 不在 AnchorLayout 内时 ctx 为 null，位置不做特殊处理
const ctx = inject<AnchorLayoutCtx>(ANCHOR_LAYOUT_CTX_KEY, null as unknown as AnchorLayoutCtx)

const footerStyle = ref<CSSProperties>({})
let ro: ResizeObserver | null = null

function updatePosition() {
  const el = ctx?.contentEl?.value
  if (!el) {
    footerStyle.value = {}
    return
  }
  const rect = el.getBoundingClientRect()
  footerStyle.value = {
    left: `${rect.left}px`,
    right: `${window.innerWidth - rect.right}px`,
  }
}

// 锚点面板折叠/展开：等待 CSS transition(250ms) 结束后重算
if (ctx) {
  watch(ctx.collapsed, () => {
    setTimeout(updatePosition, 260)
  })
}

onMounted(() => {
  updatePosition()

  const el = ctx?.contentEl?.value
  if (el) {
    ro = new ResizeObserver(updatePosition)
    ro.observe(el)
  }

  window.addEventListener('resize', updatePosition)
})

onBeforeUnmount(() => {
  ro?.disconnect()
  window.removeEventListener('resize', updatePosition)
})
</script>

<style lang="scss" scoped>
.page-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 50;
  background-color: $color-bg-white;
  border-top: 1px solid $border-color;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.06);
  // left/right 由 JS 注入覆盖（在 AnchorLayout 内时生效）
  transition: left 0.25s ease, right 0.25s ease;

  &__inner {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: $spacing-md;
    height: 52px;
    padding: 0 $spacing-lg;
  }

  &__default {
    font-size: $font-size-sm;
    color: $color-text-secondary;
  }
}
</style>
