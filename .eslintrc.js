module.exports = {
    parser: '@typescript-eslint/parser', // 指定 TypeScript 解析器
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      ecmaFeatures: { jsx: true },
    },
    settings: {
      react: { version: 'detect' },
    },
    env: {
      browser: true,
      es2021: true,
      node: true,
    },
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:@typescript-eslint/recommended',
  
      // 下面两个确保 prettier 优先，避免冲突
      'plugin:prettier/recommended',
      'prettier',
    ],
    plugins: ['react', '@typescript-eslint'],
    rules: {
      // 你关心的规则
      'quotes': ['error', 'single'], // 单引号
      'semi': ['error', 'always'],   // 结尾有分号
      // 你可以继续补充规则...
    },
  };