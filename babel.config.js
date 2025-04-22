module.exports = {
  presets: [
    '@babel/preset-env',
    [
      '@vue/app',
      {
        "useBuiltIns": "entry"
      }
    ]
  ],
  env: {
    test: {
      presets: [[
        '@babel/preset-env', {
          debug: true
        }
      ]]
    }
  }  
};