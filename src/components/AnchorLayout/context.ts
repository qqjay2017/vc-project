import type { Ref } from 'vue'

export const ANCHOR_LAYOUT_CTX_KEY = Symbol('anchorLayout')

export interface AnchorLayoutCtx {
  contentEl: Ref<HTMLElement | null>
  collapsed: Ref<boolean>
}
