import antfu from '@antfu/eslint-config'
import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat()

export default antfu({
  stylistic: {
    indent: 2,
    quotes: 'single',
    semi: false,
  },
  jsonc: {
    sortKeys: true,
  },
  yaml: {
    sortKeys: true,
  },
  rules: {
    'no-dupe-keys': 'off',
  },
  ...compat.config({
    globals: {
      process: 'readonly',
    },
  }),
})
