module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: [
    'react-refresh',
    '@stylistic/eslint-plugin-js',
  ],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "@typescript-eslint/no-explicit-any": ["off"],
    "@stylistic/js/brace-style": ["error", "stroustrup"],
    "no-trailing-spaces": "error",
    "indent": ["error", "tab"],
    "@stylistic/js/no-multiple-empty-lines": ["error", { "max": 1, "maxEOF": 0 }]
  },
}
