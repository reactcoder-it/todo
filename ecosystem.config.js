module.exports = {
  apps: [
    {
      name: "todo.pxstudio.pw",
      script: "./server.js",
      cwd: "./",
      env: {
        NODE_ENV: "production",
        PORT: 8086
      }
    }
  ]
}