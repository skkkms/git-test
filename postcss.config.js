module.exports = {
  parser: 'postcss-scss',
  plugins: [
    require('postcss-import'),
    require('postcss-url'),
    require('precss'),
    require('autoprefixer')()    
  ]
};
