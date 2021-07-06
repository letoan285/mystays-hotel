module.exports = {
  apps: [
    {
      name: 'mystay-hotel',
      exec_mode: 'cluster',
      instances: 'max',
      script: './node_modules/nuxt/bin/nuxt.js',
      watch: true,
      env: {
        HOST: '0.0.0.0',
        PORT: 8081,
        NODE_ENV: 'production'
      },
      args: 'start'
    }
  ]
}
