module.exports = {
  apps: [
    {
      name: "ULTRAGEAR-REACT",
      cwd: "./",
      script: "./index.tsx",
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
