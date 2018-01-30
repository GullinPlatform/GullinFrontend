'use strict'
// postcss 配置项
module.exports = {
  plugins: [
    require('postcss-smart-import')({/* ...options */}),
    require('precss')({/* ...options */}),
    require('autoprefixer')({
      browsers: ['last 20 versions']
    })
  ]
}
