module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb-base',
    'airbnb-typescript'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: "module",
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json"],
    ecmaVersion: 'latest',
    ecmaFeatures: {
      jsx: true,
      modules: true
    }
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    'import/prefer-default-export': 'off',
    '@typescript-eslint/no-use-before-define': ['error', {functions: true, variables: false, classes: true}],
    'react/react-in-jsx-scope': 'off',
    'import/no-named-as-default': 0,
    'react/jsx-filename-extension': [2, {extensions: ['.js', '.jsx', '.ts', '.tsx']}],
  },
};
