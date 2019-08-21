// module.exports = {
//   webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
//     // Note: we provide webpack above so you should not `require` it
//     // Perform customizations to webpack config
//     // Important: return the modified config

//     // Example using webpack option
//     config.plugins.push(new webpack.IgnorePlugin(/\/__tests__\//));
//     return config;
//   },
//   webpackDevMiddleware: config => {
//     // Perform customizations to webpack dev middleware config
//     // Important: return the modified config
//     return config;
//   }
// };
const withPlugins = require('next-compose-plugins')
const nextEnv = require('next-env')
const dotEnvLoad = require('dotenv-load')
const transpileModules = require('next-transpile-modules')
const sass = require('@zeit/next-sass')
const styledJsx = require('styled-jsx/webpack')

dotEnvLoad()
const nextConfig = {
  webpack(config, { defaultLoaders }) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        // ...defaultLoaders.sass,
        defaultLoaders.babel,
        {
          loader: styledJsx.loader,
          options: {
            type: 'scoped',
          },
        },
        'sass-loader',
      ],
    })
    return config
  },
}

module.exports = withPlugins(
  [
    nextEnv(),
    [
      transpileModules,
      {
        transpileModules: ['lodash-es', 'react-dnd', 'react-dnd-html5-backend', 'dnd-core'],
      },
    ],
    [sass],
  ],
  nextConfig
)
