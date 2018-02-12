// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
  },
  env: {
    browser: true,
  },
  extends: 'airbnb-base',
  // required to lint *.vue files
  plugins: [
    'html',
  ],
  // check if imports actually resolve
  settings: {
    'import/resolver': {
      webpack: {
        config: 'build/webpack.base.conf.js',
      },
    },
  },
  // add your custom rules here
  rules: {
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      js: 'never',
      vue: 'never',
    }],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      optionalDependencies: ['test/unit/index.js'],
    }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // disallow semicolons
    'semi': 0,
    'import/prefer-default-export': 0,
    'max-len': 0,
    'one-var-declaration-per-line': 0,
    'one-var': 0,
    'no-bitwise': 0,
    'no-param-reassign': 0,
    'prefer-template': 0,
    'camelcase': 0,
    'object-shorthand': 0,
    'no-shadow': 0,
    'arrow-parens': 0,
    'no-empty-pattern': 0,
    'new-cap': 0,
    'no-restricted-syntax': 0,
  },
};
