const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
  entry: ['babel-polyfill',path.resolve(__dirname,'src/js/index.js')],
  output: {
    path: path.resolve(__dirname,'dist'),
    filename: 'bundle.js',
    publicPath: './dist/'
  },
  module:{
    rules:[
      //aqui van los loaders
      {
        //test: que tipo de archivo quiero reconocer.
        //use: que loader se va a encargar del archivo.
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        },
      },
      {
        test:/\.(jpg|png|gif|woff|eot|ttf|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
             limit: 200000
          }
        }
      },
      {
        test:/\.(mp4|webm)$/,
        use: {
          loader: 'url-loader',
          options: {
             limit: 1000000,
             name: 'videos/[name].[hash].[ext]'
          }
        }
      },
      {
        //test: que tipo de archivo quiero reconocer.
        //use: que loader se va a encargar del archivo.
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          //["style-loader","css-loader"]
          //fallback:style-loader
          use: "css-loader"
        }),
      }
    ]
  },
  plugins:[
    //aqui van los plugins.
    new ExtractTextPlugin("css/[name].css")
  ]
}