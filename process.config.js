module.exports = {
  apps: [
    {
      name: "ULTRAGEAR-REACT",
      cwd: "./",
      script: "./server.js",
      watch: "false",
      env_production: {
        NODE_ENV: "production",
      },
      env_development: {
        NODE_ENV: "development",
      },
      instances: 2,
      exec_mode: "cluster",
    },
  ],
};
