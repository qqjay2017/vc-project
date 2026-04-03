<template>
  <slot />
</template>

<script setup lang="ts">
import { provide } from 'vue'
import { BIZ_CONFIG_KEY } from './context'
import type { BizConfig } from './context'

const props = defineProps<BizConfig>()

provide(BIZ_CONFIG_KEY, props)
</script>
