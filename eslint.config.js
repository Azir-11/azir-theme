import antfu from '@antfu/eslint-config'

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
})
