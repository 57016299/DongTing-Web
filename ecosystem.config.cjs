module.exports = {
  apps: [
    {
      name: "dongting-site",
      script: "./server.js",
      cwd: __dirname,
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: "production",
        HOST: "0.0.0.0",
        PORT: 8080,
      },
    },
  ],
};
