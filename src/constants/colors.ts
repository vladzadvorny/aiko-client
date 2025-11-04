// length 11
interface ColorVariant {
  color: string
  bg: string
  border: string
}

export interface Colors {
  magenta: ColorVariant
  red: ColorVariant
  volcano: ColorVariant
  orange: ColorVariant
  lime: ColorVariant
  gold: ColorVariant
  green: ColorVariant
  cyan: ColorVariant
  blue: ColorVariant
  geekblue: ColorVariant
  purple: ColorVariant
  pink: ColorVariant
}

export const colors: Colors = {
  magenta: {
    color: '#eb2f96',
    bg: '#fff0f6',
    border: '#ffadd2'
  },
  red: {
    color: '#f5222d',
    bg: '#fff1f0',
    border: '#ffa39e'
  },
  volcano: {
    color: '#fa541c',
    bg: '#fff2e8',
    border: '#ffbb96'
  },
  orange: {
    color: '#fa8c16',
    bg: '#fff7e6',
    border: '#ffd591'
  },
  lime: {
    color: '#7cb305',
    bg: '#f0f9c8',
    border: '#bae637'
  },
  gold: {
    color: '#faad14',
    bg: '#fffbe6',
    border: '#ffe58f'
  },
  green: {
    color: '#389e0d',
    bg: '#e6ffdb',
    border: '#95de64'
  },
  cyan: {
    color: '#13c2c2',
    bg: '#e6fffb',
    border: '#87e8de'
  },
  blue: {
    color: '#1890ff',
    bg: '#e6f7ff',
    border: '#91d5ff'
  },
  geekblue: {
    color: '#2f54eb',
    bg: '#f0f5ff',
    border: '#adc6ff'
  },
  purple: {
    color: '#722ed1',
    bg: '#f9f0ff',
    border: '#d3adf7'
  },
  pink: {
    color: '#ff4d9a',
    bg: '#fff0f7',
    border: '#ffb6d9'
  }
}
