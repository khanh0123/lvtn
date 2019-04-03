require('@babel/register')({
    presets: [ '@babel/preset-env', ]
})
require("@babel/core").transform("code", {
    plugins: ["@babel/plugin-syntax-dynamic-import"],
  });
require( "./server" );
