<template>
  <div class="dashboard">
    <h1 class="dashboard__title">仪表盘</h1>
    <div class="dashboard__cards">
      <div v-for="card in stats" :key="card.label" class="stat-card">
        <div class="stat-card__icon">{{ card.icon }}</div>
        <div class="stat-card__info">
          <div class="stat-card__value">{{ card.value }}</div>
          <div class="stat-card__label">{{ card.label }}</div>
        </div>
      </div>
    </div>

    <!-- AnchorLayout 演示区块 -->
    <div class="dashboard__section-title">AnchorLayout 组件演示</div>
    <AnchorLayout :anchors="demoAnchors" :scroll-container="mainContainerEl">
      <section id="section-overview" class="demo-section">
        <h2 class="demo-section__title">概览介绍</h2>
        <p class="demo-section__text">
          这是概览介绍部分的内容。AnchorLayout 是一个通用的锚点布局容器组件，适用于文档类、长内容类页面。
          左侧为主内容区，右侧为可折叠的锚点导航列表，支持滚动联动高亮当前所在区域。
        </p>
        <p class="demo-section__text">
          组件通过 <code>anchors</code> prop 接收锚点配置，每项包含 <code>id</code> 和 <code>label</code>。
          内容区中对应元素的 <code>id</code> 属性需与锚点配置中的 <code>id</code> 一致。
        </p>
      </section>

      <section id="section-props" class="demo-section">
        <h2 class="demo-section__title">Props 说明</h2>
        <div class="demo-table">
          <div class="demo-table__row demo-table__row--header">
            <span>属性名</span><span>类型</span><span>默认值</span><span>说明</span>
          </div>
          <div class="demo-table__row">
            <code>anchors</code><span>AnchorItem[]</span><span>—</span><span>锚点配置列表</span>
          </div>
          <div class="demo-table__row">
            <code>scrollContainer</code><span>string</span><span>'window'</span><span>滚动容器选择器，'window' 或 CSS 选择器</span>
          </div>
        </div>
      </section>

      <section id="section-usage" class="demo-section">
        <h2 class="demo-section__title">使用方式</h2>
        <p class="demo-section__text">
          将需要导航的内容用 <code>&lt;AnchorLayout&gt;</code> 包裹，每个区块设置对应的 <code>id</code>。
          锚点面板支持折叠/展开，折叠时以图标形式收起，不占用内容区空间。
        </p>
        <pre class="demo-code">{{ usageCode }}</pre>
      </section>

      <section id="section-behavior" class="demo-section">
        <h2 class="demo-section__title">滚动行为</h2>
        <p class="demo-section__text">
          组件使用 <code>IntersectionObserver</code> 监听各锚点目标元素的可见性。当某个 section 进入视口中部区域时，
          右侧对应锚点高亮显示。点击锚点会平滑滚动到对应区域。
        </p>
        <p class="demo-section__text">
          滚动容器可通过 <code>scrollContainer</code> prop 配置：传入 <code>'window'</code> 时监听整个页面滚动；
          传入 CSS 选择器时监听指定容器内部的滚动。
        </p>
      </section>

      <section id="section-style" class="demo-section">
        <h2 class="demo-section__title">样式定制</h2>
        <p class="demo-section__text">
          锚点面板宽度为 180px，折叠后缩为 36px，通过 CSS transition 平滑过渡。
          所有颜色、间距均使用项目 SCSS 变量，与整体设计风格保持一致。
        </p>
        <p class="demo-section__text">
          当前激活的锚点项以主色高亮，并带有圆点指示器缩放效果。
          组件支持最大高度限制并带有 overflow 滚动，适合锚点数量较多的场景。
        </p>
      </section>

      <!-- PageFooter 在 AnchorLayout 内使用，左右与内容区对齐 -->
      <PageFooter>
        <span>上次保存：2026-04-03 20:00</span>
        <button class="footer-btn footer-btn--secondary">取消</button>
        <button class="footer-btn footer-btn--primary">保存</button>
      </PageFooter>
    </AnchorLayout>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import AnchorLayout from '@/components/AnchorLayout/index.ts'
import PageFooter from '@/components/PageFooter/index.ts'
import type { AnchorItem } from '@/components/AnchorLayout/index.ts'

const stats = [
  { icon: '👤', value: '1,280', label: '用户总数' },
  { icon: '📄', value: '326', label: '内容总数' },
  { icon: '📈', value: '8,942', label: '今日访问' },
  { icon: '⚡', value: '99.9%', label: '系统正常率' },
]

// 直接获取滚动容器元素，而非 CSS 选择器字符串
// 在 qiankun Shadow DOM 环境下，document.querySelector 无法跨 shadow root 查询
const mainContainerEl = ref<HTMLElement | null>(null)
onMounted(() => {
  mainContainerEl.value = document.querySelector('.admin-layout__main')
})

const demoAnchors: AnchorItem[] = [
  { id: 'section-overview', label: '概览介绍' },
  { id: 'section-props', label: 'Props 说明' },
  { id: 'section-usage', label: '使用方式' },
  { id: 'section-behavior', label: '滚动行为' },
  { id: 'section-style', label: '样式定制' },
]

const usageCode = `<AnchorLayout
  :anchors="[
    { id: 'intro', label: '简介' },
    { id: 'detail', label: '详情' },
  ]"
  :scroll-container="scrollContainerEl"
>
  <section id="intro">...</section>
  <section id="detail">...</section>
</AnchorLayout>

<!-- qiankun 子应用：直接传入 HTMLElement，避免 document 全局查询 -->
<!-- const scrollContainerEl = ref<HTMLElement>() -->
<!-- <div ref="scrollContainerEl" style="overflow-y:auto"> -->
<!--   <AnchorLayout :scroll-container="scrollContainerEl" .../> -->
<!-- </div> -->`
</script>

<style lang="scss" scoped>
.dashboard {
  &__title {
    font-size: 20px;
    font-weight: 600;
    color: $color-text-primary;
    margin-bottom: $spacing-lg;
  }

  &__cards {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: $spacing-md;
    margin-bottom: $spacing-lg;
  }

  &__section-title {
    font-size: $font-size-lg;
    font-weight: 600;
    color: $color-text-primary;
    margin-bottom: $spacing-md;
    padding-bottom: $spacing-sm;
    border-bottom: 2px solid $color-primary;
    display: inline-block;
  }
}

.stat-card {
  background-color: $color-bg-white;
  border-radius: $border-radius-md;
  padding: $spacing-lg;
  display: flex;
  align-items: center;
  gap: $spacing-md;
  box-shadow: $shadow-sm;

  &__icon {
    font-size: 32px;
    width: 52px;
    height: 52px;
    background-color: $color-bg-base;
    border-radius: $border-radius-md;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  &__value {
    font-size: 24px;
    font-weight: 700;
    color: $color-text-primary;
    line-height: 1.2;
  }

  &__label {
    font-size: $font-size-sm;
    color: $color-text-secondary;
    margin-top: $spacing-xs;
  }
}

.demo-section {
  background-color: $color-bg-white;
  border-radius: $border-radius-md;
  padding: $spacing-lg;
  margin-bottom: $spacing-md;
  box-shadow: $shadow-sm;
  scroll-margin-top: $spacing-lg;

  &__title {
    font-size: $font-size-lg;
    font-weight: 600;
    color: $color-text-primary;
    margin-bottom: $spacing-md;
    padding-bottom: $spacing-sm;
    border-bottom: 1px solid $border-color;
  }

  &__text {
    color: $color-text-secondary;
    line-height: 1.8;
    margin-bottom: $spacing-sm;

    code {
      background-color: $color-bg-base;
      padding: 2px 6px;
      border-radius: $border-radius-sm;
      font-family: 'Menlo', 'Monaco', monospace;
      font-size: 13px;
      color: $color-primary;
    }
  }
}

.demo-table {
  border: 1px solid $border-color;
  border-radius: $border-radius-sm;
  overflow: hidden;

  &__row {
    display: grid;
    grid-template-columns: 160px 120px 100px 1fr;
    gap: $spacing-md;
    padding: $spacing-sm $spacing-md;
    font-size: $font-size-sm;
    color: $color-text-secondary;
    border-bottom: 1px solid $border-color;

    &:last-child {
      border-bottom: none;
    }

    &--header {
      background-color: $color-bg-base;
      font-weight: 600;
      color: $color-text-primary;
    }

    code {
      color: $color-primary;
      font-family: 'Menlo', 'Monaco', monospace;
    }
  }
}

.demo-code {
  background-color: #1e2535;
  color: #b0b8cc;
  border-radius: $border-radius-md;
  padding: $spacing-md;
  font-family: 'Menlo', 'Monaco', monospace;
  font-size: $font-size-sm;
  line-height: 1.7;
  overflow-x: auto;
  white-space: pre;
}

.footer-btn {
  height: 32px;
  padding: 0 $spacing-md;
  border-radius: $border-radius-sm;
  font-size: $font-size-sm;
  font-weight: 500;
  cursor: pointer;
  border: 1px solid transparent;
  transition: opacity 0.2s;

  &:hover { opacity: 0.85; }

  &--primary {
    background-color: $color-primary;
    color: #fff;
  }

  &--secondary {
    background-color: transparent;
    color: $color-text-secondary;
    border-color: $border-color;
  }
}
</style>
