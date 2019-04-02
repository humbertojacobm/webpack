const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = (env) => {

   const plugins = [
    new ExtractTextPlugin("css/[name].[hash].css")
  ]

  if(env.NODE_ENV === 'production'){
    plugins.push(
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: ['dist']
      })
      //(['dist'],{root: __dirname})
    )
  }

  return {
    entry: {
      invie: path.resolve(__dirname,'src/index.js'),
    },
    output: {
      path: path.resolve(__dirname,'dist'),
      filename: 'js/[name].[hash].js',
      publicPath: path.resolve(__dirname,'dist')+"/",
      chunkFilename: 'js/[id].[chunkhash].js'
    },
    devServer: {
      port: 9000,
    },
    module: {
      rules: [
        {
          //test: que tipo de archivo quiero reconocer.
          //use: que loader se va a encargar del archivo.
          test: /\.(js|jsx)$/,
          exclude: /(node_modules)/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',          
            options: {
              presets: ['@babel/preset-env','@babel/preset-react'],
              plugins: ['syntax-dynamic-import']
            }
          },
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            use: [
              {
                loader: 'css-loader',               
              }
            ]
          })        
        },
        {
          test:/\.(jpg|png|gif|svg)$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 200000,
              fallback: 'file-loader',
              name: 'images/[name].[hash].[ext]'
            }
          }
        }
      ]
    },
    plugins
  }

}