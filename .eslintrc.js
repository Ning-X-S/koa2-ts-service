module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true
  },
  parser:  '@typescript-eslint/parser', //定义ESLint的解析器
  extends: ['plugin:@typescript-eslint/recommended'],//定义文件继承的子规范
  plugins: ['@typescript-eslint'],//定义了该eslint文件所依赖的插件
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018
  },
  rules: {
    camelcase:0,
    // "class-name": true, //首字母大写
    '@typescript-eslint/camelcase': ['off', {properties: 'always'}],
  }
}
