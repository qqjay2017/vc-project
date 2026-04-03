import type { InjectionKey } from 'vue'

/** 字典树节点字段名映射，用于适配不同后端返回的字段名 */
export interface DictFieldNames {
  /** 根节点编码字段名，默认 'rootCode' */
  rootCode?: string
  /** 子节点编码字段名，默认 'code' */
  code?: string
  /** 标签字段名，默认 'label' */
  label?: string
  /** 子节点数组字段名，默认 'children' */
  children?: string
}

/** 字典树子节点（原始数据，字段名由 DictFieldNames 决定） */
export type DictChildRaw = Record<string, unknown>

/** 字典树根节点（原始数据，字段名由 DictFieldNames 决定） */
export type DictRootRaw = Record<string, unknown>

export interface BizConfig {
  scrollContainer?: string | HTMLElement | null
  /**
   * 获取业务字典树的函数，返回两层树形结构的 Promise。
   * 原始数据字段名通过 customerDictFieldNames 配置映射。
   *
   * 默认字段结构示例：
   * [{ rootCode: 'a', label: '分类', children: [{ code: 'a1', label: '选项' }] }]
   */
  customerDictApi?: () => Promise<DictRootRaw[]>
  /** 自定义字典树字段名映射，未配置的字段使用默认值 */
  customerDictFieldNames?: DictFieldNames
}

export const BIZ_CONFIG_KEY: InjectionKey<BizConfig> = Symbol('bizConfig')
