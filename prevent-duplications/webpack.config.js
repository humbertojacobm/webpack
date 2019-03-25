const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: {
    home: ['babel-polyfill', path.resolve(__dirname,'src/js/index.js')],
    contact: ['babel-polyfill',path.resolve(__dirname,'src/js/contact.js')]
  },
  output: {
    path: path.resolve(__dirname,'dist'),
    filename: '[name].js'
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
            presets: ['@babel/preset-env','@babel/preset-react']
          }
        },
      },
      {
        test:/\.json$/,
        use: 'json-loader'
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
        //test: que tipo de archivo quiero reconocer.
        //use: que loader se va a encargar del archivo.
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          //["style-loader","css-loader"]
          //fallback:style-loader
          use: [
            {
              loader:"css-loader",
              options: {
                modules: true,
                importLoaders: 1
              }
            },
            'postcss-loader'
          ]
        }),
      },
      {
        //test: que tipo de archivo quiero reconocer.
        //use: que loader se va a encargar del archivo.
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          //["style-loader","css-loader"]
          //fallback:style-loader
          use: ["css-loader","sass-loader"]
        }),
      },
      {
        //test: que tipo de archivo quiero reconocer.
        //use: que loader se va a encargar del archivo.
        test: /\.styl$/,
        use: ExtractTextPlugin.extract({
          //["style-loader","css-loader"]
          //fallback:style-loader
          use: ["css-loader",
                {
                  loader: 'stylus-loader',
                  options: {
                    use: [
                      require('nib'),
                      require('rupture')
                    ],
                    import: [
                      '~nib/lib/nib/index.styl',
                      '~rupture/rupture/index.styl'
                    ]
                  }
                }]
        }),
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          use: ["css-loader",{
              loader: "less-loader",
              options: {
                noIeCompat: true,
              }
            }
          ]
        }),
      }
    ]
  },
  plugins:[
    //aqui van los plugins.
    new ExtractTextPlugin("css/[name].css"),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common'
    })
  ]
}