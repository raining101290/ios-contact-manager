module.exports = {
  root: true,
  extends: ['universe/native'],
  //parser: 'babel-eslint',
  extends: [
    '@react-native-community',
    'airbnb',
    'airbnb/hooks',
    'plugin:react-native/all',
  ],
  rules: {
    //"camelcase": "error",
    'no-console': 'warn',
    'no-unused-vars': 'warn',
    indent: [
      'error',
      2,
      {
        SwitchCase: 1,
        ignoredNodes: ['TemplateLiteral'],
      },
    ],
    'linebreak-style': 0,
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
  },
}
