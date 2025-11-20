module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
    ecmaVersion: 2022,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: [
  'plugin:vue/recommended',
    'eslint:recommended',
    'prettier'
  ],
  plugins: ['vue'],
  rules: {
    'no-console': 'off',
    'no-debugger': 'warn',
    // relax unused vars to warnings for incremental cleanup
    'no-unused-vars': 'warn',
    // project uses single-word component names in some places; allow for now
    'vue/multi-word-component-names': 'off',
    // allow v-html usages but keep as warnings
    'vue/no-v-html': 'warn'
  },
}
